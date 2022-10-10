const express = require('express');
const router = express.Router();

const Phase = require('../../models/Phase');

// GET
// Get phases
router.get('/', (req, res) => {
    Phase.find({}, (err, phase) => {
        err ? res.send('No phase found.') : res.send(phase);
    });
});

// GET 
// Get a single phase
router.get('/:id', (req, res) => {
    Phase.findById(req.params.id, (err, phase) => {
        err ? res.send('Phase not found.') : res.send(phase);
    });
});

// POST
// Create a phase
router.post('/', (req, res) => {
    const data = req.body;

    try {
        const newPhase = new Phase({
            name: data.name
        });

        newPhase.save();
        res.send(newPhase);
    } catch(err) {
        res.send('Could not create this phase.');
    }
});

// POST
// Update a phase
router.post('/:id', (req, res) => {
    const data = req.body;

    try {
        Phase.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                name: data.name
            }
        }, { new: true })
        .then(response => { res.send(response); })
        .catch(err => { res.send('Could not update this phase.'); });
    } catch(err) {
        res.send('Could not update this phase.');
    }
});

// DELETE
// Delete a phase
router.get('/delete/:id', async (req, res) => {
    const phase = await Phase.findById(req.params.id);

    Phase.findByIdAndRemove({ _id: phase._id }, (err) => {
        err ? res.send(err) : res.send('Phase has been deleted!');
    });
});

module.exports = router;