const Task = require('../models/Task');
const Activity = require('../models/Activity');
const User = require('../models/User');

exports.createTask = async (req, res) => {
    try {
        if (!['Admin', 'Manager', 'manager'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Only managers can create tasks' });
        }
        const { title, description, priority, status, assignedTo, dueDate, projectId } = req.body;
        const newTask = new Task({ title, description, priority, status, assignedTo, dueDate, projectId, managerId: req.user.id });
        const task = await newTask.save();

        await Activity.create({
            userId: req.user.id,
            managerId: req.user.id,
            action: 'Task created',
            projectId: projectId || null,
            message: `Created task: ${title}`
        });

        if (assignedTo) {
            const Notification = require('../models/Notification');
            const notif = await Notification.create({
                userId: assignedTo,
                title: 'New Task Assigned',
                message: `You have been assigned to: ${title}`,
                type: 'task_assigned',
                link: `/projects/${projectId}/tasks`
            });
            const io = req.app.locals.io;
            if (io) io.to(assignedTo.toString()).emit('new_notification', notif);
        }

        res.status(201).json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        let query = {};
        
        // Admins can see all tasks, Managers see theirs, Workers see assigned.
        if (req.user.role === 'Manager' || req.user.role === 'manager') {
            query.managerId = req.user.id;
        } else if (req.user.role === 'Worker' || req.user.role === 'member') {
            query.assignedTo = req.user.id;
        }

        if (req.query.projectId) {
            query.projectId = req.query.projectId;
        }

        const tasks = await Task.find(query).populate('assignedTo', 'name email').sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can fully edit tasks' });
        }
        const task = await Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        
        if (req.user.role === 'member' && task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only update tasks assigned to you' });
        }
        
        const previousStatus = task.status;
        task.status = req.body.status;
        await task.save();

        if (previousStatus !== 'Completed' && req.body.status === 'Completed') {
            const user = await User.findById(req.user.id);
            const userName = user ? user.name.split(' ')[0] : 'Unknown';
            
            const activity = new Activity({
                userId: req.user.id,
                managerId: req.user.role === 'Manager' || req.user.role === 'manager' ? req.user.id : req.user.managerId,
                message: `Task Completed: ${task.title} – by ${userName}`,
                action: 'Task status updated',
                projectId: task.projectId || null
            });
            await activity.save();
        } else if (previousStatus !== req.body.status) {
            await Activity.create({
                userId: req.user.id,
                managerId: req.user.role === 'Manager' || req.user.role === 'manager' ? req.user.id : req.user.managerId,
                message: `Task Status Updated to ${req.body.status}: ${task.title}`,
                action: 'Task status updated',
                projectId: task.projectId || null
            });
        }

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can delete tasks' });
        }
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};
