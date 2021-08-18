const mongoose = require('mongoose')




const User = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },    
    joinDate:{
        type:Date,
        required:true,
        default :Date.now
    }
})



module.exports = mongoose.model('User',User)