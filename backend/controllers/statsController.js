const Task = require('../models/Task');
const Document = require('../models/Document');
const User = require('../models/User');
const Project = require('../models/Project');

exports.getStats = async (req, res) => {
    try {
        const workspaceId = req.user.role === 'manager' ? req.user.id : req.user.managerId;

        // Active Projects
        const activeProjects = await Task.countDocuments({ managerId: workspaceId, status: 'in-progress' });

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
