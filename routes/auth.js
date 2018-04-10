const express = require("express");
const router = express.Router();
const passport = require('passport');

// Authorised JavaScript origins
// http://localhost:6600/

// Authorised redirect URIs
// http://localhost:6600/auth/google/callback

router.get('/google', passport.authenticate('google', 
    {scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

module.exports = router;
