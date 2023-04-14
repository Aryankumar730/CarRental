const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchUser');
const Datas = require('../models/Data')
const { body, validationResult } = require('express-validator');

//Getting all the entries

router.get('/fetchallnotes', async (req, res) => {

    try {
        const currdata = await Datas.find();
        res.json(currdata)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }
});

//Getting specific entry based on

router.get('/fetchIddata/:id',fetchuser, async (req, res) => {

    try {

        let currdata = await Datas.findById(req.params.id);
        // const currdata = await Datas.find({title: req.body.title,user: req.user.id});
        res.json(currdata)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }
});

// Adding a new data using post method
router.post('/adddata', fetchuser, [
    body('Aname', 'Email must be atleast 5 characters long').isLength({ min: 3 }),
       
], async (req, res) => {

    try {

        const { Aname, Vmodel, Vnumber, Scapacity, Rent, city, country, image, Aemail} = req.body;

        // If there are errors return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let number = await Datas.findOne({Vnumber: req.body.Vnumber});
            if(number){
                return res.status(400).json({error1: "Sorry this car number is already registered"})
            }

        const data = new Datas({
            Aname,
            Vmodel,
            Vnumber,
            Scapacity,
            Rent,
            city,
            country,
            image,
            Aemail,
            user: req.user.id

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

// updating the current data

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try{
        const {Aname,
            Vmodel,
            Vnumber,
            Scapacity,
            Rent,
            city,
            country,
            image,
            Aemail


        } =  req.body;
       
    
        // Create a new object
          
        const newData = {};
        if(Aname){newData.Aname = Aname};
        if(Vmodel){newData.Vmodel=Vmodel};
        if(Vnumber){newData.Vnumber=Vnumber};
        if(Scapacity){newData.Scapacity=Scapacity};
        if(Rent){newData.Rent=Rent};
        if(city){newData.city=city};
        if(country){newData.country=country};
        if(image){newData.image=image};
        if(Aemail){newData.Aemail=Aemail};

        
        // Find the note to be updated and update it
    
        let currdata = await Datas.findById(req.params.id);
        if(!currdata){return res.status(404).send("Not found")}
    
        if(currdata.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
            
        note = await Datas.findByIdAndUpdate(req.params.id, {$set: newData}, {new:true})
        res.json({currdata});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }
})

// Deleting an existing note
router.delete('/deletenote/:id', fetchuser, [
    body('title').isLength({ min: 2 }),
    

], async (req, res) => {

    try{
            
        // Find the note to be deleteded and delete it
    
        let currdata = await Datas.findById(req.params.id);
        if(!currdata){return res.status(404).send("Not found")}
    
        if(currdata.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        currdata = await Datas.findByIdAndDelete(req.params.id)
        res.json("Success data has been deleted");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }

})


module.exports = router;