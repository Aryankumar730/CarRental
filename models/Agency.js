const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
    agencyname: {
        type: String,
        required: true
        
    }, 
    email: {
        type: String,
        required: true,
        unique : true
    },  
    password: {
        type: String,
        required: true,
        
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const agency = mongoose.model('agency', agencySchema);
// user.createIndexes();
module.exports = agency;