const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    Aname: {
        type: String,
        required: true
        
    },
    Vmodel: {
        type: String,
        required: true,
        
    },
    Vnumber: {
        type: String,
        required: true,
        unique : true
    },
    Scapacity: {
        type: Number,
        required: true,
        
    }, 
    Rent: {
        type: Number,
        required: true,
       
    },
    city: {
        type: String,
        required: true,
       
    },
    country: {
        type: String,
        required: true,
       
    },
    image:{
        type: String
    },
   
    Aemail: {
        type: String,
        required: true,
       
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('data', dataSchema);