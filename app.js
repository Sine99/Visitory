const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

require("./config/passport")(passport);
const auth =require('./routes/auth');

const app =express();

app.get('/', (req, res) => {
    res.send("this is the home page")
});

app.use("/auth", auth);

const port = process.env.PORT || 6600;
app.listen(port, ()=>{
    console.log(`Server is up and running on ${port}`);
});