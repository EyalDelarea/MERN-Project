const express = require('express');
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')



router.get('/',(req,res)=>{
    res.send("Hello World")
})

// router.get('/dashboard',(req,res)=>{
//     console.log("hey")
//     console.log(req.user)
    

//    try{
//        const user = req.user
//         res.send("/dashboard",{
//             name:req.user.name
//         })
//    }catch(e){
//        res.redirect('/login')
//    }
// })





module.exports = router