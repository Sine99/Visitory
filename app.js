const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session =require("express-session");
const cookieParser =require("cookie-parser");
const exphbs  = require('express-handlebars');
const bodyParser = require("body-Parser");

const moment = require('moment');
const methodOverride = require("method-override");

const path = require('path');
const {truncate, stripTags, formatDate} = require('./helpers/hbs');

// Load user model schema 
require("./models/User");
require("./models/visitoryModel");

// load passport config
require("./config/passport")(passport);

const pages = require('./routes/pages');
const auth = require('./routes/auth');
const keys = require('./config/keys');

const app =express();

// -------body-Parser------------------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// method-override middleware--
app.use(methodOverride('_method'))


//------- connecting to MongoDB -------
mongoose.Promise = global.Promise;

    // mongoose connect  ----> mlab
mongoose.connect(keys.mongoURI)
    .then(()=> console.log("MongdoDB connected"))
    .catch(err => console.log(err))
// ------------------------------------

app.engine('handlebars', 
    exphbs({
        helpers: {
            truncate : truncate,
            stripTags :stripTags,
            formatDate : formatDate
        },
        defaultLayout: 'main',
    })
);
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

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 6600;
app.listen(port, ()=>{
    console.log(`Server is up and running on ${port}`);
});
