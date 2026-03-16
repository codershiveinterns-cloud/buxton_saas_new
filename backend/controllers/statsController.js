const Task = require('../models/Task');
const Document = require('../models/Document');
const User = require('../models/User');
const Project = require('../models/Project');
const Activity = require('../models/Activity');

exports.getStats = async (req, res) => {
    try {
        const workspaceId = req.user.role === 'manager' ? req.user.id : req.user.managerId;

        // Active Projects
        const activeProjects = await Project.countDocuments({ managerId: workspaceId, status: { $in: ['Planning', 'In Progress'] } });

        // Tasks Completed
        const tasksCompleted = await Task.countDocuments({ managerId: workspaceId, status: 'completed' });

        // Team Members
        const teamMembers = await User.countDocuments({ managerId: workspaceId, role: 'member' });

        // Hours Logged (Placeholder logic, 5 hours per completed task)
        const hoursLogged = tasksCompleted * 5;

        res.json({
            teamMembers,
            tasksCompleted,
            activeProjects,
            hoursLogged
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getDashboard = async (req, res) => {
    try {
        const workspaceId = req.user.role === 'manager' || req.user.role === 'Manager' ? req.user.id : (req.user.managerId || req.user.id);

        const activeProjects = await Project.countDocuments({ managerId: workspaceId, status: { $in: ['Planning', 'In Progress'] } });
        const tasksCompleted = await Task.countDocuments({ managerId: workspaceId, status: 'completed' });
        const teamMembers = await User.countDocuments({ managerId: workspaceId });
        const hoursLogged = tasksCompleted * 5;

        const activities = await Activity.find({ managerId: workspaceId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'name email')
            .populate('projectId', 'name');

        const recentDocuments = await Document.find({ managerId: workspaceId })
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            activeProjects,
            tasksCompleted,
            teamMembers,
            hoursLogged,
            recentDocuments,
            activities
        });
    } catch (err) {
        console.error('Dashboard Error:', err.message);
        res.status(500).json({ message: "Failed to load dashboard data" });
    }
};
