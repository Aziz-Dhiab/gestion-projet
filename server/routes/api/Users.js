const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Require Models
const Project = require('../../models/Project');
const User = require('../../models/User');

// GET
// Get users
router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        err ? res.send('No users found.') : res.send(users);
    });
});

// GET
// Get current user 
router.get('/current-user', (req, res) => {
    req.user ? res.send(req.user) : res.send('No current user found');
});

// GET
// Get single user by its id
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        err ? res.send('User not found.') : res.send(user);
    });
});

// POST
// Register new user
router.post('/register', async (req, res) => {
    const data = req.body;

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    // Create a new user
    try {
        const newUser = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            registrationNumber: data.registrationNumber,
            email: data.email,
            role: data.role,
            structureManager: (data.structureManager) ? data.structureManager : null,
            password: hash,
        });

        await newUser.save();

        

        res.status(200).send("Welcome to the team!");

    } catch (err) {
        // If there are errors: send an error
        res.status(500).send(err);
    }
});

// POST
// Login with user credentials
// Handling login logic
router.post('/login', (req, res, next) => {
    let password = req.body.password;
    let email = req.body.email;

    if (password && email) {
        User.findOne({ "email": email }, function (err, foundUser) {
            if (!foundUser) {
                res.json({
                    success: false,
                    message: 'Incorrect credentials 1'
                });
            } else {
                bcrypt.compare(password, foundUser.password, (err, password) => {
                    if (password) {
                        passport.authenticate('local')(req, res, function () {
                            //TODO
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({
                                    foundUser: req.user
                                });
                            }
                        });
                    } else {
                        res.json({
                            success: false,
                            message: 'Incorrect credentials 2'
                        });
                    }
                })
            }
        })
    } else {
        res.json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
});

// GET
// Logout
router.get('/logout', (req, res) => {
    req.logout();
});

// POST
// Update a user
router.post('/:id', async (req, res) => {
    const data = req.body;
    let userPassword;

    try {
        // Check if the password provided is the same as the user's password or not
        await bcrypt.compare(data.password, req.user.password, async (err, password) => {
            if (password) {
                userPassword = password;
            } else {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(data.password, salt);
    
                userPassword = hash;
            }
        });

        await User.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                firstName: data.firstName,
                lastName: data.lastName,
                registrationNumber: data.registrationNumber,
                email: data.email,
                password: userPassword,
                role: data.role
            }
        }, { new: true })
        .then(response => { res.send(response); })
        .catch(err => { res.send('Could not update this user.'); });
    } catch(err) {
        res.send(err);
    }
});

// DELETE 
// Delete a user
router.get('/delete/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

        User.findByIdAndRemove({ _id: user._id }, (err) => {
            err ? res.send(err) : res.send('User has been deleted!');
        });

});

module.exports = router;