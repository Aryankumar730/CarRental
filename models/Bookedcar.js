const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'user'
    // },
    Cname: {
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
    Rent: {
        type: Number,
        required: true,
       
    },
    Aemail: {
        type: String,
        required: true,
       
    },
    Cemail: {
        type: String,
        required: true,
       
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('booked', dataSchema);