const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require("express-session");
//const sessionSecret = process.env.SESSION_CONF || require('./config/sessionConfig').secret;
const path = require('path');

// Require routes
const users = require('./routes/api/Users');
const projects = require('./routes/api/Projects');
const phases = require('./routes/api/Phases');

const aws = require('aws-sdk');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Config
require('./config/passport')(passport);

// DB Config
const uri = "mongodb+srv://user:abcd@cluster0.ysdkw12.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Initialize sessions

app.use(session({
    secret: "secret-key", /*sessionSecret,*/
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false },
    expires: new Date(Date.now() + 3600000)
}));

// Initialize passport
app.use(passport.initialize());
// Initialize passport session
app.use(passport.session());

// Routes
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/phases', phases);


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

//Serve static assets if we are in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build')); 
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Serve on specified port
const port = require('./config/env').serverPORT;
app.listen(port, () => console.log(`Server started on port ${port}`));