const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const workspaceId = req.user.role === 'manager' ? req.user.id : req.user.managerId;
        const users = await User.find({ managerId: workspaceId, role: 'member' }).select('-password -verificationToken').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createUser = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can add team members' });
        }

        const { name, email, password, role, phone } = req.body;
        
        if(!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Assign managerId to the req.user.id who is creating this member
        user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role: role || 'member', 
            phone,
            managerId: req.user.id
        });
        await user.save();
        
        user.password = undefined; // Do not return password
        res.status(201).json({ 
            success: true, 
            message: 'Team member added successfully', 
            user 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.deleteOne();
        res.json({ message: 'User removed' });
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
