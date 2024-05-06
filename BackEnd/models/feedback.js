const mongoose = require("mongoose"); // import momgooes 

const Schema = mongoose.Schema; 

const feedbackSchema = new Schema({

    
    description : {
        type : String,
        
    },

    image: { // Make sure the field name matches exactly.
        type: String,
    },

    comments: [String], 


})

const Feedback = mongoose.model("Feedback",feedbackSchema); //send data to feedback doc

module.exports = Feedback; //export model ( importent )