const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const meetingController = require('../controllers/meetingController');

router.post('/create', auth, meetingController.createMeeting);
router.get('/', auth, meetingController.getMeetings);
router.get('/user/:email', auth, meetingController.getMeetingsForUser);

module.exports = router;
