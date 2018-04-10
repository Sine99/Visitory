const express = require("express");
const mongoose = require("mongoose");

const app =express();



const port = process.env.PORT || 6600

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});