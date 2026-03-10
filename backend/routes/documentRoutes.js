const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

// @route   POST api/documents
// @desc    Upload document
// @access  Private
router.post('/', auth, upload.single('file'), documentController.createDocument);

// @route   GET api/documents
// @desc    View documents
// @access  Private
router.get('/', auth, documentController.getDocuments);

// @route   DELETE api/documents/:id
// @desc    Delete document
// @access  Private
router.delete('/:id', auth, documentController.deleteDocument);

module.exports = router;
