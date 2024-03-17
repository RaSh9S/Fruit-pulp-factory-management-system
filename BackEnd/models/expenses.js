const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expensesSchema = new Schema({

    category : {
        type : String,
        required: true
    },

    date : {
        type : Number,
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


})