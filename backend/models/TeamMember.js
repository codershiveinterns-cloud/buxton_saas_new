const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'member'
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: false
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team' // Assuming there is or will be a Team logic, otherwise just generic
    },
    status: {
        type: String,
        enum: ['invited', 'active'],
        default: 'active'
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
