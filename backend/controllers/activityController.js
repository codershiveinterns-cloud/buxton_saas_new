const Activity = require('../models/Activity');

exports.getRecentActivities = async (req, res) => {
    try {
        const workspaceId = req.user.role === 'manager' ? req.user.id : req.user.managerId;
        
        const activities = await Activity.find({ managerId: workspaceId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'name email')
            .populate('projectId', 'name');
            
        res.json(activities);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
