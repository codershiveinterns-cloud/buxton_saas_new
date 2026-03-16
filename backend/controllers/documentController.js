const Document = require('../models/Document');

exports.createDocument = async (req, res) => {
    try {
        const { title, projectId } = req.body;
        const finalFileUrl = req.file ? `/uploads/${req.file.filename}` : req.body.fileUrl;
        const fileName = req.file ? req.file.originalname : 'External File';
        const fileType = req.file ? req.file.mimetype : 'unknown';

        const newDoc = new Document({ 
            title: title || fileName,
            fileName,
            fileType,
            fileUrl: finalFileUrl, 
            projectId,
            uploadedBy: req.user.id,
            managerId: req.user.role === 'Manager' ? req.user.id : null 
        });
        const document = await newDoc.save();

        const Activity = require('../models/Activity');
        await new Activity({
            userId: req.user.id,
            managerId: req.user.role === 'Manager' ? req.user.id : null,
            action: 'Document uploaded',
            projectId: projectId,
            message: `Uploaded document: ${title || fileName}`
        }).save();

        res.status(201).json(document);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDocumentsByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const documents = await Document.find({ projectId }).populate('uploadedBy', 'name email').sort({ createdAt: -1 });
        res.json(documents);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const workspaceId = req.user.role === 'manager' || req.user.role === 'Manager' ? req.user.id : req.user.managerId;
        const documents = await Document.find({ managerId: workspaceId }).sort({ createdAt: -1 });
        res.json(documents);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        if (req.user.role === 'Worker') {
            return res.status(403).json({ message: 'Workers cannot delete documents' });
        }
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        await document.deleteOne();
        res.json({ message: 'Document removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};
