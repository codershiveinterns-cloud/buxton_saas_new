const TaskMessage = require('../models/TaskMessage');

exports.getMessages = async (req, res) => {
    try {
        const messages = await TaskMessage.find({ taskId: req.params.taskId })
            .populate('senderId', 'name role')
            .sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addMessage = async (req, res) => {
    try {
        const { taskId, message } = req.body;
        if (!taskId || !message) {
            return res.status(400).json({ message: 'Task ID and message are required' });
        }

        const newMessage = new TaskMessage({
            taskId,
            senderId: req.user.id,
            message
        });

        await newMessage.save();

        // Populate sender details before returning
        await newMessage.populate('senderId', 'name role');

        res.status(201).json(newMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
