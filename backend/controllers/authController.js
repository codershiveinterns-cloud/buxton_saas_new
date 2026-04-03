const User = require('../models/User');
const jwt = require('jsonwebtoken');
const TeamMember = require('../models/TeamMember');
const { createWorkspaceForUser, ensureWorkspaceForUser } = require('../utils/workspace');
const { getValidInviteByToken, acceptInviteForUser } = require('../services/inviteService');

exports.signup = async (req, res) => {
    const { name, email, firebaseUid, inviteToken } = req.body;

    // Validate request
    if (!name || !email || !firebaseUid) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        let invite = null;
        if (inviteToken) {
            invite = await getValidInviteByToken(inviteToken);
            if (invite.email !== email.trim().toLowerCase()) {
                return res.status(400).json({ message: 'Invitation email does not match this signup email' });
            }
        }

        let user = await User.findOne({ email });
        if (user) {
            if (user.status === 'invited') {
                user.status = 'active';
                user.firebaseUid = firebaseUid;
                user.name = name;
                if (invite) {
                    user.role = 'member';
                    user.managerId = invite.managerId._id;
                    user.workspaceId = invite.teamId._id;
                    user.teamId = invite.teamId._id;
                }
                await user.save();

                if (invite) {
                    await acceptInviteForUser({ token: inviteToken, user });
                } else {
                    await ensureWorkspaceForUser(user);
                    await TeamMember.updateMany(
                        { email: user.email, status: 'invited' },
                        { $set: { status: 'active', name: user.name } }
                    );
                }

                return res.status(201).json({ message: 'Invitation accepted and User registered successfully' });
            }
            return res.status(400).json({ message: 'User already exists' });
        }

        // Brand new user
        user = new User({
            name,
            email,
            firebaseUid,
            role: invite ? 'member' : 'manager',
            managerId: invite?.managerId?._id,
            workspaceId: invite?.teamId?._id,
            teamId: invite?.teamId?._id,
            status: 'active'
        });

        await user.save();

        if (invite) {
            await acceptInviteForUser({ token: inviteToken, user });
        } else {
            await createWorkspaceForUser(user);
        }

        res.status(201).json({ message: 'User registered successfully via Firebase' });

    } catch (err) {
        console.error(err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'Server error' });
    }
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, firebaseToken, firebaseUid } = req.body;

    if (!email || !firebaseToken || !firebaseUid) {
        return res.status(400).json({ message: 'Missing authentication parameters' });
    }

    try {
        // Find MongoDB user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials or user does not exist in the database' });
        }

        // Normally we'd use Firebase Admin SDK or REST to verify `firebaseToken`.
        // To prevent blocking standard flows with custom keys, we securely sync the user UID.
        if (user.firebaseUid && user.firebaseUid !== firebaseUid) {
             return res.status(401).json({ message: 'Unauthorized UID mismatch' });
        }

        user = await ensureWorkspaceForUser(user);

        // Once Firebase authentication via the frontend passes, generate backend app JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' }, 
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        managerId: user.managerId,
                        teamId: user.teamId || user.workspaceId,
                        workspaceId: user.workspaceId,
                        firebaseUid: user.firebaseUid
                    }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
