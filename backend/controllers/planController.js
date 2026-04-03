const { selectManagerPlan, checkUserPlan } = require('../services/planService');

exports.selectPlan = async (req, res) => {
    try {
        const { managerId, plan, planName, billingCycle } = req.body;
        const selectedPlan = plan || planName;

        console.log('[plans/select] request', {
            managerId,
            plan: selectedPlan,
            billingCycle
        });

        if (!managerId || !selectedPlan) {
            return res.status(400).json({
                success: false,
                message: 'managerId and plan are required'
            });
        }

        if (req.user.id !== managerId) {
            return res.status(403).json({
                success: false,
                message: 'Only the manager can modify the subscription'
            });
        }

        const snapshot = await selectManagerPlan({
            managerId,
            planName: selectedPlan,
            billingCycle
        });

        res.status(200).json({
            success: true,
            message: 'Plan saved',
            plan: snapshot.plan?.name || null,
            planDetails: snapshot
        });
    } catch (err) {
        console.error('Select plan error:', err.message);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Failed to save selected plan'
        });
    }
};

exports.getCurrentPlan = async (req, res) => {
    try {
        const snapshot = await checkUserPlan(req.user.id);
        res.json({
            success: true,
            plan: snapshot.plan?.name || null,
            planDetails: snapshot
        });
    } catch (err) {
        console.error('Get current plan error:', err.message);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Failed to fetch plan'
        });
    }
};

exports.getPlanCheck = async (req, res) => {
    try {
        const requestedUserId = req.params.userId;
        console.log('[plans/check] request', { userId: requestedUserId });

        if (requestedUserId !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to check this subscription'
            });
        }

        const snapshot = await checkUserPlan(requestedUserId);
        res.json({
            success: true,
            plan: snapshot.plan?.name || null,
            planDetails: snapshot
        });
    } catch (err) {
        console.error('Check plan error:', err.message);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Failed to check plan'
        });
    }
};
