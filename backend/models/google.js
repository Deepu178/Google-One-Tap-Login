const mongoose = require('mongoose');
const googleSchema = new mongoose.Schema({  
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Google', googleSchema, "google");