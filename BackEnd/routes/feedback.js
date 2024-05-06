const router = require("express").Router();
let Feedback = require("../models/feedback"); //import feedback model


router.route("/add").post((req,res)=>{
    const { description, base64, comment } = req.body;

    const newFeedback = new Feedback({
        description,
        image: base64,
        comment,
    });

    newFeedback.save().then(() => {
        res.json("New Post Added");
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error adding post" });
    });

    
});



router.route("/").get((req,res)=>{

    Feedback.find().then((feedback)=>{
        res.json(feedback)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async (req, res) => {
    let feedbackID = req.params.id;
    const { description, image, comment } = req.body; // Include image in the destructuring

    const updateFeedback = {
        
        description,
        image,
        comment
    };

    await Feedback.findByIdAndUpdate(feedbackID, updateFeedback, { new: true }) 
    .then((updateFeedback) => {
        res.status(200).send({status: "Update successful", updateFeedback});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update operation"});
    });
});

router.route("/delete/:id").delete(async (req,res)=>{
    let feedbackID = req.params.id;

    await Feedback.findByIdAndDelete(feedbackID)
    .then(()=>{
        res.status(200).send({status: "Deleted Successfull"});
    })
    .catch((err)=>{
        console.log(err.message);
    })
})

router.get('/get/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).send({ message: "Feedback not found" });
        }
        // Send the feedback object directly; no need to wrap in an additional object
        res.status(200).json(feedback);
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).send({ error: "Server error", details: err.message });
    }
});


// Assuming your backend is set up with Express and Mongoose
router.post('/add-comment/:id', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).send({ message: "Feedback not found" });
        }
        if (!feedback.comments) feedback.comments = [];
        feedback.comments.push(comment);
        await feedback.save();
        res.status(200).send({ message: "Comment added successfully", feedback });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to add comment", error: err });
    }
});





module.exports = router;