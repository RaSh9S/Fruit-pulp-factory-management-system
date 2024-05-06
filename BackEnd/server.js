const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongodb = require("mongodb");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070; //port selection local or hosted

app.use(cors());
app.use(bodyparser.json()); //use jason format

const URL = process.env.MONGODB_URL; //get URL 

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection success!");
});

const ExpensesRouter = require("./routes/expenses.js"); //imoprt expenses.js 

app.use("/expenses",ExpensesRouter); //load expenses.js file in routs folder

const orderRouter = require("./routes/order.js");
app.use("/order", orderRouter);

const feedbackRouter = require("./routes/feedback.js");
app.use("/feedback", feedbackRouter);

app.listen(PORT, () => {                           
    console.log(`Server is up and running on port ${PORT}`);
});
