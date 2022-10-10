const express = require('express');
const router = express.Router();

const Project = require('../../models/Project');

// GET
// Get projects
router.get('/', (req, res) => {
    Project.find({}, (err, projects) => {
        err ? res.send('No projects found.') : res.send(projects);
    });
});

// GET
// Get single project by its id
router.get('/:id', (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        err ? res.send('Project not found.') : res.send(project);
    });
});

// POST
// Create a project
router.post('/', (req, res) => {
    const data = req.body;

    try {
        const newProject = new Project({
            author: {
                id: req.user._id,
                username: req.user.username
            },
            name: data.name,
            description: (data.description) ? data.description : null,
            team: data.team,
            company: data.company,
            tags: (data.tags) ? data.tags : [],
            tasks: [],
            startDate: data.startDate,
            endDate: data.endDate
        });

        newProject.save();
        res.send(newProject);
    } catch(err) {
        res.send('Could not create this project.');
    }
});

// POST
// Update a project
router.post('/:id', (req, res) => {
    const data = req.body;

    try {
        Project.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                domain: data.domain,
                phases: data.phases,
                name: data.name,
                description: data.description,
                sponsor: data.sponsor,
                projectManager: data.projectManager,
                Responsible: data.Responsible,
                Coordinator: data.coordinator,
                team: data.team,
                allowedActionsBy: data.allowedActionsBy,
                forInformation: data.forInformation,
                plannedStartDate: data.plannedStartDate,
                plannedEndDate: data.plannedEndDate,
                realStartDate: data.realStartDate,
                realEndDate: data.realEndDate,
                state: data.state,
            }
        }, { new: true })
        .then(response => { res.send(response); })
        .catch(err => { res.send(err); });
    } catch(err) {
        res.send(err);
    }
});

// DELETE
router.get('/delete/:id', async (req, res) => {

    const project = await Project.findOne({ _id: req.params.id });

    // Delete the project
    await Project.findByIdAndRemove({ _id: project._id }, (err) => {
        err ? res.send(err) : res.send('Project has been deleted!');
    });
});

module.exports = router;