//Require mongoose package
var mongoose = require('mongoose');

//Define schema of projects
var projectSchema = new mongoose.Schema({
    domain:String,
    phases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Phase"
        }
    ],
    name: String,
    description: String,
    Sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Responsible: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Coordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"

        }
    ],
    allowedActionsBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"

        }
    ],
    forInformation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    externalParticipant: String,
    
    plannedStartDate: Date,
    plannedEndDate: Date,
    realStartDate: Date,
    realEndDate: Date,
    state: String,

    //Automatically gets the date of creation of the project
    created: {
        type: Date,
        default: Date.now()
    }
});

//Export our projectSchema, this reference will be used in other models
module.exports = mongoose.model('Project', projectSchema);