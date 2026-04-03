const Document = require('../models/Document');
const TeamMember = require('../models/TeamMember');
const Workspace = require('../models/Workspace');
const { DEFAULT_BILLING_CYCLE, getPlanDefinition, normalizePlanName } = require('../config/plans');
const { getTeamForUser, isManagerRole } = require('./teamService');

const sumStorageForWorkspace = async (workspaceId) => {
    if (!workspaceId) {
        return 0;
    }

    const [result] = await Document.aggregate([
        { $match: { workspaceId } },
        {
            $group: {
                _id: null,
                totalBytes: {
                    $sum: { $ifNull: ['$fileSizeBytes', 0] }
                }
            }
        }
    ]);

    return result?.totalBytes || 0;
};

const buildFeatureFlags = (features = []) => ({
    dashboard: features.includes('dashboard'),
    projects: features.includes('projects'),
    tasks: features.includes('tasks'),
    documents: features.includes('documents'),
    team: features.includes('team'),
    meetings: features.includes('meetings'),
    privateNotes: features.includes('privateNotes'),
    basic: features.includes('basic'),
    advanced: features.includes('advanced'),
    all: features.includes('all')
});

const buildPlanSnapshot = async ({ user, team }) => {
    const teamMembersUsed = team?._id
        ? await TeamMember.countDocuments({ teamId: team._id, status: { $ne: 'revoked' } })
        : 0;
    const storageUsedBytes = await sumStorageForWorkspace(team?._id);
    const planDefinition = team?.planName ? getPlanDefinition(team.planName) : null;

    return {
        userId: user?._id?.toString() || null,
        teamId: team?._id?.toString() || null,
        managerId: team?.owner?.toString?.() || team?.owner?._id?.toString?.() || null,
        plan: planDefinition
            ? {
                  id: team._id.toString(),
                  name: planDefinition.name,
                  label: planDefinition.label,
                  planStatus: 'active',
                  billingCycle: team.billingCycle || DEFAULT_BILLING_CYCLE
              }
            : null,
        usage: {
            teamMembersUsed,
            storageUsedBytes
        },
        limits: planDefinition
            ? {
                  teamMembers: planDefinition.teamMemberLimit,
                  storageBytes: planDefinition.storageLimitBytes
              }
            : null,
        features: buildFeatureFlags(planDefinition?.features || []),
        canManageSubscription: Boolean(user && isManagerRole(user.role) && team && team.owner.toString() === user._id.toString())
    };
};

const selectManagerPlan = async ({ managerId, planName, billingCycle = DEFAULT_BILLING_CYCLE }) => {
    const normalizedPlanName = normalizePlanName(planName);
    const planDefinition = getPlanDefinition(normalizedPlanName);

    if (!planDefinition) {
        const error = new Error('Invalid pricing plan selected');
        error.statusCode = 400;
        throw error;
    }

    const { user, team, isTeamManager } = await getTeamForUser(managerId);

    if (!isTeamManager) {
        const error = new Error('Only the manager can manage the team subscription');
        error.statusCode = 403;
        throw error;
    }

    team.planName = normalizedPlanName;
    team.billingCycle = billingCycle === 'yearly' ? 'yearly' : DEFAULT_BILLING_CYCLE;
    await team.save();

    return buildPlanSnapshot({ user, team });
};

const getUserPlanRecord = async (userId) => {
    const { team } = await getTeamForUser(userId);
    return team;
};

async function checkUserPlan(userId) {
    const { user, team } = await getTeamForUser(userId);
    return buildPlanSnapshot({ user, team });
}

module.exports = {
    selectManagerPlan,
    getUserPlanRecord,
    checkUserPlan
};
