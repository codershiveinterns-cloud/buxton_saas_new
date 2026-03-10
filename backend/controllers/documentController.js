const Document = require('../models/Document');

exports.createDocument = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can upload documents' });
        }
        const { title, status, fileUrl: bodyFileUrl } = req.body;
        // The file could be coming from multer (req.file) or directly from body if it's external or a text link
        const finalFileUrl = req.file ? `/uploads/${req.file.filename}` : bodyFileUrl;

        const newDoc = new Document({ 
            title, 
            fileUrl: finalFileUrl, 
            status: status || 'Draft', 
            managerId: req.user.id 
        });
        const document = await newDoc.save();
        res.status(201).json(document);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const workspaceId = req.user.role === 'manager' ? req.user.id : req.user.managerId;
        const documents = await Document.find({ managerId: workspaceId }).sort({ createdAt: -1 });
        res.json(documents);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can delete documents' });
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
