const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.put('/profile', auth, userController.updateProfile);
router.put('/password', auth, userController.updatePassword);

module.exports = router;
