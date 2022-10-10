//Require mongoose package
const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    //Automatically gets the date of creation of the phase
    created: {
        type: Date,
        default: Date.now()
    }
});

//Exports the phaseSchema
module.exports = mongoose.model("Phase", phaseSchema); 