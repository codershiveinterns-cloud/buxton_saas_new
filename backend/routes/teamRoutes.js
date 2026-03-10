const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/members', auth, userController.getUsers);
router.post('/add-member', auth, userController.createUser);
router.delete('/member/:id', auth, userController.deleteUser);

module.exports = router;
