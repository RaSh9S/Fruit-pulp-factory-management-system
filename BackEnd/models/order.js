const mongoose = require("mongoose");//import mongoose 

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    CustomerName : {
        type : String,
        required: true
    },
    ContactNumber : {
        type : Number,
        required: true
    },
    Date : {
        type : Date,
        required: true
    },
    ProductSpecifications: { 
        type: String,
        required: true
    },
    OrderQuantity : {
        type : Number,
        required: true
    },
    DeliveryPreference : {
        type : String,
        required: true
    },
    Price : {
        type : Number,
        required: true
    }

})

const Order = mongoose.model("Place new order", orderSchema);

module.exports = Order; //export