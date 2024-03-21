const router = require("express").Router();
let Expenses = require("../models/expenses");


router.route("/add").post((req,res)=>{

    const category = req.body.category;
    const date = req.body.date;
    const amount = req.body.amount;
    const description = req.body.description; 


    const newExpense = new Expenses({

        category,
        date,
        amount,
        description
        

    })

    newExpense.save().then(()=>{
        res.json("Expense Added")
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/").get((req,res)=>{

    Expenses.find().then((expenses)=>{
        res.json(expenses)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async (req,res)=>{
    let expemsesId = req.params.id;
    const {category, date, amount, description} = req.body;

    const updateExpenses = {
        category,
         date, 
         amount, 
         description
    }

    const update = await Expenses.findByIdAndUpdate(expemsesId,updateExpenses).then(()=> {
        res.status(200).send({status: "Update successfull"})
    }).catch((err)=>{
        console.log(err);
    })


})

router.route("/delete/:id").delete(async (req,res)=>{
    let expensesId = req.params.id;

    await Expenses.findByIdAndDelete(expensesId)
    .then(()=>{
        res.status(200).send({status: "Deleted Successfull"});
    })
    .catch((err)=>{
        console.log(err.message);
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let expemsesId = req.params.id;
     
    const expense = await Expenses.findById(expemsesId)
    .then((Expenses) =>{
        res.status(200).send({status: "Successfull",Expenses});
    }).catch(() =>{

        console.log(err.message);
    })
})

module.exports = router;