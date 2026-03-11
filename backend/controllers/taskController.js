const Task = require('../models/Task');
const Activity = require('../models/Activity');
const User = require('../models/User');

exports.createTask = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can create tasks' });
        }
        const { title, description, priority, status, assignedTo, dueDate } = req.body;
        const newTask = new Task({ title, description, priority, status, assignedTo, dueDate, managerId: req.user.id });
        const task = await newTask.save();
        res.status(201).json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const workspaceId = req.user.role === 'manager' ? req.user.id : req.user.managerId;
        let query = { managerId: workspaceId };
        
        // Members only see their assigned tasks
        if (req.user.role === 'member') {
            query.assignedTo = req.user.id;
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });
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

        if (previousStatus !== 'completed' && req.body.status === 'completed') {
            const user = await User.findById(req.user.id);
            const userName = user ? user.name.split(' ')[0] : 'Unknown';
            
            const activity = new Activity({
                userId: req.user.id,
                managerId: req.user.role === 'manager' ? req.user.id : req.user.managerId,
                message: `Task Completed: ${task.title} – by ${userName}`,
                type: 'task_completed'
            });
            await activity.save();
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
