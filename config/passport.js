const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");

const users = mongoose.model('users');

module.exports = (passport)=>{
    passport.use(
        new GoogleStrategy(
            {
                clientID: keys.googleClientID,
                clientSecret: keys.googleClientSecret,
                callbackURL: "/auth/google/callback",
                proxy : true //becoz https will be used rather than http on local server.
            },  
            (accessToken, refreshToken, profile, done) => {
                // users.findAndModify({ googleId: profile.id }, 
                // function (err, user) {
                // return done(err, user);})
                // console.log(accessToken);
                // console.log(profile);
                
                const newUser = {
                    googleID : profile.id,
                    firstName : profile.name['givenName'],
                    lastName : profile.name['familyName'],
                    email : profile.emails[0].value,
                    gender : profile.gender,
                    image : profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?')),
                }
                users.findOne({
                   googleID : profile.id, 
                }).then(user => {
                    // Return the already existing user
                    // image : user.profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
                    if(user){
                        console.log("user exists")
                        done(null, user);
                    }
                    else{
                        //creating new user using mongoose.model
                        new users(newUser)
                            .save()
                            .then(user => done(null, user)); 
                        console.log("new user added")
                    }
                }) 
            })
    );
    passport.serializeUser((user, done) =>{
        // console.log(user)
        done(null, user.id);
      });
       
     passport.deserializeUser((id, done)=> {
         users.findById(id).then(user => done(null,user));
        // users.findById(id, function(err, user) { // check we are using model 'users'
        //     console.log(user);
        //     done(err, user);
        // });
        // 
        // });
    });
};    
