const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

router.get('/members', auth, userController.getUsers);
router.post('/add-member', auth, authorizeRole('manager'), userController.createUser);
router.delete('/member/:id', auth, authorizeRole('manager'), userController.deleteUser);

module.exports = router;
