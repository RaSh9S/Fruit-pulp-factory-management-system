const mongoose = require("mongoose"); // import momgooes 

const Schema = mongoose.Schema; 

const expensesSchema = new Schema({

    category : {
        type : String,
        required: true  //back end validation
    },

    date: {
        type: Date,
        required: true
    },

    amount : {
        type : Number,
        required: true
    },

    description : {
        type : String,
        required: true
    },

    image: { // Make sure the field name matches exactly.
        type: String,
    },


})

const Expenses = mongoose.model("Expenses",expensesSchema); //send data to expenses doc

module.exports = Expenses; //export model ( importent )