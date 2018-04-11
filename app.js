const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session =require("express-session");
const cookieParser =require("cookie-parser");
var exphbs  = require('express-handlebars');

// Load user model schema 
require("./models/User");

// load passport config
require("./config/passport")(passport);

const pages = require('./routes/pages');
const auth = require('./routes/auth');
const keys = require('./config/keys');

const app =express();

//------- connecting to MongoDB -------
mongoose.Promise = global.Promise;

    // mongoose connect  ----> mlab
mongoose.connect(keys.mongoURI)
    .then(()=> console.log("MongdoDB connected"))
    .catch(err => console.log(err))
// ------------------------------------

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Using express-session middleware-----
// this session must be used before passport.session()
// becoz passport uses this session.
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}));

//----passport middleware - connecting to passport.js file-----
app.use(passport.initialize());
app.use(passport.session()); //creating session --using serialize/deserialize
// ---------------------------------------

// Set global varibles
app.use((req,res,next)=>{
    res.locals.user =  req.user || null;
    next();
});

// Route for authentication
// this should be used below session
app.use("/auth", auth); 
app.use("/", pages);

const port = process.env.PORT || 6600;
app.listen(port, ()=>{
    console.log(`Server is up and running on ${port}`);
});
