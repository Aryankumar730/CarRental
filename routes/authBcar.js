const express = require('express');
const router = express.Router();
const Booked = require('../models/Bookedcar');
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchUser');


// const JWT_secret = "This is carRentalProject";

//fetching the booked car using the agency email

router.get('/fetch/:email', async (req, res) => {

    try {

        let currdata = await Booked.find({Aemail : req.params.email});

       
        // const currdata = await Datas.find({title: req.body.title,user: req.user.id});
        res.json(currdata)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }
});

//checking if the vehicle no. is present or not


router.get('/check', async (req, res) => {

    try {

        let currdata = await Booked.findOne({Vnumber : req.body.Vnum});

        if(currdata){
            return res.json({success: " this car number is present"})
        }
        else{

            return res.status(400).json({error1: " this car number is not present"})
        }
        
        // res.json(currdata);
       
        // const currdata = await Datas.find({title: req.body.title,user: req.user.id});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }
});



//creating a user using: POST "/api/auth". Doesn't require auth 
router.post('/adddata', [
    body('Aemail', 'Email must be atleast 5 characters long').isLength({ min: 3 }),
       
], async (req, res) => {

    try {

        const { Cname, Vmodel, Vnumber, Rent, Aemail, Cemail} = req.body;

        // If there are errors return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let number = await Booked.findOne({Vnumber: req.body.Vnumber});
            if(number){
                return res.status(400).json({error1: "Sorry this car number is already registered"})
            }

        const data = new Booked({
            Cname,
            Vmodel,
            Vnumber,
            Rent,
            Aemail,
            Cemail,
           
        })
        const savedNote = await data.save()
        let success = true;

        res.json({success,data:savedNote})
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }

})

module.exports = router;