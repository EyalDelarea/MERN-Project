const express = require('express');
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth');
const passport = require('passport');



router.get('/',(req,res)=>{
    res.send("Hello World")
})

//Change to auth
router.get('/dashboard', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.json("it worked");
    }
);







module.exports = router