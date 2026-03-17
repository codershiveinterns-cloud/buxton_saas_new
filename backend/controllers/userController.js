const User = require('../models/User');
const TeamMember = require('../models/TeamMember');

exports.getUsers = async (req, res) => {
    try {
        if (!req.user.workspaceId) {
            return res.json([]);
        }

        const users = await User.find({ workspaceId: req.user.workspaceId })
            .select('name email role phone createdAt')
            .sort({ createdAt: -1 });

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

const crypto = require('crypto');

exports.createUser = async (req, res) => {
    try {
        const { name, email, role, phone } = req.body;
        
        if(!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        // 1. Maintain global identity so they can log in
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ 
                name, 
                email, 
                role: 'member', 
                phone,
                managerId: req.user.id, // Primary context
                workspaceId: req.user.workspaceId,
                status: 'invited'
            });
            await user.save();
        } else if (user.status === 'invited') {
             // Just resend or acknowledge it's still pending
        } else {
             return res.status(400).json({ message: 'User already exists and is active' });
        }

        // 2. Map relation to this specific manager/team
        let teamMember = await TeamMember.findOne({ email, managerId: req.user.id });
        if (!teamMember) {
            teamMember = new TeamMember({
                name, 
                email, 
                role: role || 'member', 
                phone,
                managerId: req.user.id,
                workspaceId: req.user.workspaceId,
                status: 'invited'
            });
            await teamMember.save();
        }

        // Could add an emailer code here like `sendEmail(email, "You have been invited!")`
        console.log(`\n\n[System] Invitation silently processed for ${email}\n\n`);

        const Activity = require('../models/Activity');
        await new Activity({
            userId: req.user.id,
            managerId: req.user.id,
            workspaceId: req.user.workspaceId,
            action: 'Team member added',
            message: `Invited team member: ${name} (${role || 'member'})`
        }).save();

        res.status(201).json({ 
            success: true, 
            message: 'Team member invited successfully', 
            user: teamMember 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const teamMember = await TeamMember.findById(req.params.id);
        if (!teamMember) return res.status(404).json({ message: 'Member not found in team' });
        if (teamMember.workspaceId?.toString() !== req.user.workspaceId?.toString()) {
            return res.status(403).json({ message: 'Not authorized to remove this member' });
        }
        await teamMember.deleteOne();
        res.json({ message: 'Member removed from team' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.name = name || user.name;
        user.phone = phone || user.phone;
        
        await user.save();
        
        user.password = undefined;
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const bcrypt = require('bcrypt');

        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid current password' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
