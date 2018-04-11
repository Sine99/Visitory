const express = require("express");
const router = express.Router();
const passport = require('passport');


// Authorised JavaScript origins
// http://localhost:6600/

// Authorised redirect URIs
// http://localhost:6600/auth/google/callback

// --------Authenticate Requests-------------
router.get('/google', passport.authenticate('google', 
    {scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/dashboard');
    });
// ------------------------------------------

router.get('/verify', (req,res)=>{
    if(req.user){
        console.log(req.user);
        // res.send("hello")
    }else{
        // console.log(req.user);
        console.log("Not Authorised");
    }
});

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports = router;
