const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const { name, clientName, location, startDate, endDate, status, supervisorId } = req.body;
        
        const newProject = new Project({
            name,
            clientName,
            location,
            startDate,
            endDate,
            status,
            supervisorId,
            managerId: req.user.id
        });

        await newProject.save();

        const Activity = require('../models/Activity');
        await new Activity({
            userId: req.user.id,
            managerId: req.user.id,
            action: 'Project created',
            projectId: newProject._id,
            message: `Created new project: ${name}`
        }).save();

        res.status(201).json({ success: true, project: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getProjects = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'Admin') {
            // Admin sees all
        } else if (req.user.role === 'Manager') {
            query.managerId = req.user.id;
        } else if (req.user.role === 'Supervisor') {
            query.supervisorId = req.user.id;
        } else {
            // Worker? Needs to be part of the task but let's assume they can see projects they work on.
            // For now, if Worker, maybe return assigned projects or no access here.
        }

        const projects = await Project.find(query).populate('supervisorId', 'name email').sort({ createdAt: -1 });
        res.status(200).json({ success: true, projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('supervisorId', 'name email')
            .populate('managerId', 'name email');
        
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, project });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, message: 'Project deleted' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getProjectTeam = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('teamMembers', 'name email role phone');
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project.teamMembers || []);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addTeamMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (!project.teamMembers.includes(userId)) {
            project.teamMembers.push(userId);
            await project.save();
        }

        res.json({ success: true, message: 'Team member added' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.removeTeamMember = async (req, res) => {
    try {
        const { userId } = req.params;
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        project.teamMembers = project.teamMembers.filter(id => id.toString() !== userId);
        await project.save();

        res.json({ success: true, message: 'Team member removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
