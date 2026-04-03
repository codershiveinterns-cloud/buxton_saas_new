const User = require('../models/User');
const TeamMember = require('../models/TeamMember');
const TeamInvite = require('../models/TeamInvite');
const Workspace = require('../models/Workspace');
const { validateTeamMemberLimit } = require('../services/planValidationService');
const { createOrRefreshInvite, buildInviteEmail, buildInviteUrl, normalizeEmail } = require('../services/inviteService');
const { sendMail } = require('../utils/sendMail');

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

exports.getTeamMembers = async (req, res) => {
    try {
        if (!req.user.workspaceId) {
            return res.json([]);
        }

        const teamMembers = await TeamMember.find({ workspaceId: req.user.workspaceId })
            .select('name email role phone createdAt status')
            .sort({ createdAt: -1 });

        res.json(teamMembers);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        
        if(!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        const normalizedEmail = normalizeEmail(email);

        let teamMember = await TeamMember.findOne({ email: normalizedEmail, managerId: req.user.id });
        if (!teamMember) {
            await validateTeamMemberLimit(req.user.id, 1);
        }

        // 1. Maintain global identity so they can log in
        let user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            user = new User({ 
                name, 
                email: normalizedEmail, 
                role: 'member', 
                phone,
                managerId: req.user.id, // Primary context
                workspaceId: req.user.workspaceId,
                teamId: req.user.teamId || req.user.workspaceId,
                status: 'invited'
            });
            await user.save();
        } else if (user.status === 'invited') {
            user.name = name;
            user.phone = phone;
            user.managerId = req.user.id;
            user.workspaceId = req.user.workspaceId;
            user.teamId = req.user.teamId || req.user.workspaceId;
            await user.save();
        } else if (user.teamId && user.teamId.toString() !== (req.user.teamId || req.user.workspaceId)?.toString()) {
            return res.status(409).json({ message: 'User already belongs to another team' });
        } else {
            user.managerId = req.user.id;
            user.workspaceId = req.user.workspaceId;
            user.teamId = req.user.teamId || req.user.workspaceId;
            user.role = 'member';
            await user.save();
        }

        // 2. Map relation to this specific manager/team
        if (!teamMember) {
            teamMember = new TeamMember({
                name, 
                email: normalizedEmail, 
                role: 'member', 
                phone,
                managerId: req.user.id,
                workspaceId: req.user.workspaceId,
                teamId: req.user.teamId || req.user.workspaceId,
                status: 'invited'
            });
            await teamMember.save();
        } else {
            teamMember.name = name;
            teamMember.phone = phone;
            teamMember.role = 'member';
            teamMember.workspaceId = req.user.workspaceId;
            teamMember.teamId = req.user.teamId || req.user.workspaceId;
            teamMember.status = 'invited';
            await teamMember.save();
        }

        const invite = await createOrRefreshInvite({
            email: normalizedEmail,
            managerId: req.user.id,
            teamId: req.user.teamId || req.user.workspaceId
        });

        const inviteUrl = buildInviteUrl(invite.token);
        const inviteEmail = buildInviteEmail({
            managerName: req.user.name || 'Your manager',
            teamName: `${req.user.name || 'Manager'}'s Team`,
            inviteUrl
        });

        await sendMail({
            to: normalizedEmail,
            subject: inviteEmail.subject,
            text: inviteEmail.text,
            html: inviteEmail.html
        });

        const Activity = require('../models/Activity');
        await new Activity({
            userId: req.user.id,
            managerId: req.user.id,
            workspaceId: req.user.workspaceId,
            action: 'Team member added',
            message: `Invited team member: ${name} (member)`
        }).save();

        res.status(201).json({ 
            success: true, 
            message: 'Team member invited successfully', 
            user: teamMember,
            inviteUrl
        });
    } catch (err) {
        console.error(err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const teamMember = await TeamMember.findById(req.params.id);
        if (!teamMember) return res.status(404).json({ message: 'Member not found in team' });
        if (teamMember.workspaceId?.toString() !== req.user.workspaceId?.toString()) {
            return res.status(403).json({ message: 'Not authorized to remove this member' });
        }

        const teamId = teamMember.teamId || teamMember.workspaceId;
        const linkedUser = await User.findOne({ email: teamMember.email });

        if (linkedUser) {
            if (linkedUser.status === 'invited' && !linkedUser.firebaseUid) {
                await linkedUser.deleteOne();
            } else {
                linkedUser.role = 'manager';
                linkedUser.managerId = undefined;
                linkedUser.workspaceId = undefined;
                linkedUser.teamId = undefined;
                await linkedUser.save();
            }
        }

        if (teamId) {
            await Workspace.findByIdAndUpdate(teamId, {
                $pull: { members: linkedUser?._id }
            });

            await TeamInvite.updateMany(
                { email: teamMember.email, teamId, status: 'pending' },
                { $set: { status: 'revoked' } }
            );
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
