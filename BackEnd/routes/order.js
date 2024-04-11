const router = require("express").Router();
let Order = require("../models/order");




router.route("/add").post((req,res) => {
    
    const CustomerName = req.body.CustomerName;
    const ContactNumber = Number(req.body.ContactNumber);
    const Date = req.body.Date;
    const ProductSpecifications = req.body.ProductSpecifications;
    const OrderQuantity = Number(req.body.OrderQuantity);
    const DeliveryPreference = req.body.DeliveryPreference;
    const Price  =Number(req.body.Price);

    const newOrder = new Order({
        CustomerName,
        ContactNumber,
        Date,
        ProductSpecifications,
        OrderQuantity,
        DeliveryPreference,
        Price
    })

    newOrder.save().then(() => {
        res.json("Order Added");
    }).catch((err) => { // Include err as a parameter
        console.log(err);
    });

})



router.route("/").get((req,res) =>{
    Order.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})



router.route("/update/:id").put(async (req,res) => {
    let orderId = req.params.id;
   const{CustomerName,ContactNumber,Date,ProductSpecifications,OrderQuantity,DeliveryPreference,Price} = req.body; //destructure

   const updateOrder = {
    CustomerName,
    ContactNumber,
    Date,
    ProductSpecifications,
    OrderQuantity,
    DeliveryPreference,
    Price
   }

   const update = await Order.findByIdAndUpdate(orderId, updateOrder).then(() => {
    res.status(200).send({status : "Order updated"})
   }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error with updating order", error : err.message});
   })
})



router.route("/delete/:id").delete(async (req,res) => {
    let orderId = req.params.id;

    await Order.findByIdAndDelete(orderId).then(() => {
        res.status(200).send({status: "Order deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete order", error: err.message});
    })
})

router.route("/get/:id").get(async (req, res) => {
    let orderId = req.params.id;
    await Order.findById(orderId).then((order) => {
        res.status(200).send({status: "Order fetched", order: order});
    }).catch((err) => { // Include err as a parameter
        console.log(err.message);
        res.status(500).send({status: "Error with get order", error: err.message});
    });
});
module.exports = router;