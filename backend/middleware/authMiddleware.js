const jwt = require('jsonwebtoken');
const { ensureWorkspaceForUser } = require('../utils/workspace');

module.exports = async function (req, res, next) {
    // Get token from header
    const token = req.header('Authorization')?.split(' ')[1] || req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const User = require('../models/User');
        let user = await User.findById(decoded.user.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        user = await ensureWorkspaceForUser(user);
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
