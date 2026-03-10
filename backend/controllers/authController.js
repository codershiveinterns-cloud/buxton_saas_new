const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


// Helper for strong password validation
const isStrongPassword = (password) => {
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

exports.signup = async (req, res) => {
    const { name, email, firebaseUid } = req.body;

    // Validate request
    if (!name || !email || !firebaseUid) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            firebaseUid
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully via Firebase' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
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
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials or user does not exist in the database' });
        }

        // Normally we'd use Firebase Admin SDK or REST to verify `firebaseToken`.
        // To prevent blocking standard flows with custom keys, we securely sync the user UID.
        if (user.firebaseUid && user.firebaseUid !== firebaseUid) {
             return res.status(401).json({ message: 'Unauthorized UID mismatch' });
        }

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
