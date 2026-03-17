const User = require('../models/User');
const Workspace = require('../models/Workspace');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Document = require('../models/Document');
const TeamMember = require('../models/TeamMember');
const Activity = require('../models/Activity');

const isWorkspaceOwnerRole = (role) => ['Admin', 'Manager', 'manager'].includes(role);

const buildWorkspaceName = (name) => `${name}'s Workspace`;

const createWorkspaceForUser = async (user) => {
    const workspace = await Workspace.create({
        name: buildWorkspaceName(user.name),
        owner: user._id
    });

    user.workspaceId = workspace._id;
    await user.save();

    return workspace;
};

const syncWorkspaceData = async (ownerId, workspaceId) => {
    const missingWorkspaceFilter = [
        {
            $or: [
                { workspaceId: { $exists: false } },
                { workspaceId: null }
            ]
        }
    ];

    await Promise.all([
        User.updateMany(
            {
                $and: [
                    ...missingWorkspaceFilter,
                    {
                        $or: [
                            { _id: ownerId },
                            { managerId: ownerId }
                        ]
                    }
                ]
            },
            { $set: { workspaceId } }
        ),
        TeamMember.updateMany(
            {
                $and: [
                    ...missingWorkspaceFilter,
                    { managerId: ownerId }
                ]
            },
            { $set: { workspaceId } }
        ),
        Project.updateMany(
            {
                $and: [
                    ...missingWorkspaceFilter,
                    { managerId: ownerId }
                ]
            },
            { $set: { workspaceId } }
        ),
        Task.updateMany(
            {
                $and: [
                    ...missingWorkspaceFilter,
                    { managerId: ownerId }
                ]
            },
            { $set: { workspaceId } }
        ),
        Document.updateMany(
            {
                $and: [
                    ...missingWorkspaceFilter,
                    { managerId: ownerId }
                ]
            },
            { $set: { workspaceId } }
        ),
        Activity.updateMany(
            {
                $and: [
                    ...missingWorkspaceFilter,
                    { managerId: ownerId }
                ]
            },
            { $set: { workspaceId } }
        )
    ]);
};

const ensureWorkspaceForOwner = async (user) => {
    let workspace = user.workspaceId ? await Workspace.findById(user.workspaceId) : null;

    if (!workspace) {
        workspace = await Workspace.findOne({ owner: user._id });
    }

    if (!workspace) {
        workspace = await createWorkspaceForUser(user);
    } else if (!user.workspaceId || user.workspaceId.toString() !== workspace._id.toString()) {
        user.workspaceId = workspace._id;
        await user.save();
    }

    await syncWorkspaceData(user._id, workspace._id);

    return user;
};

const ensureWorkspaceForUser = async (user) => {
    if (!user) {
        return null;
    }

    if (user.workspaceId) {
        return user;
    }

    if (isWorkspaceOwnerRole(user.role) || !user.managerId) {
        return ensureWorkspaceForOwner(user);
    }

    const manager = await User.findById(user.managerId);
    if (!manager) {
        return user;
    }

    const ensuredManager = await ensureWorkspaceForOwner(manager);
    if (ensuredManager.workspaceId) {
        user.workspaceId = ensuredManager.workspaceId;
        await user.save();
    }

    return user;
};

module.exports = {
    buildWorkspaceName,
    createWorkspaceForUser,
    ensureWorkspaceForUser,
    isWorkspaceOwnerRole
};
