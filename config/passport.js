const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");

module.exports = (passport)=>{
    passport.use(
        new GoogleStrategy(
            {
                clientID: keys.googleClientID,
                clientSecret: keys.googleClientSecret,
                callbackURL: "/auth/google/callback",
                proxy : true //becoz https will be used rather than http on local server.
            },  (accessToken, refreshToken, profile, done) => {
                // User.findOrCreate({ googleId: profile.id }, 
                // function (err, user) {
                // return cb(err, user);
                console.log(accessToken);
                console.log(profile);
            })
    )};    
