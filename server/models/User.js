//Require mongoose package
const mongoose = require('mongoose');
const passportMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
    },
    structureManager:String,
    //Automatically gets the date of creation of the user
    created: {
        type: Date,
        default: Date.now()
    }
});

// Makes it easier to authenticate users by adding methods with a plugin
userSchema.plugin(passportMongoose);

//Exports our userSchema with User as a reference, this reference will be used in other models
module.exports = mongoose.model("User", userSchema); 