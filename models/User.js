const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const visUserSchema = new Schema({
    googleID: {
        type : String,
        required : true // becoz google is the only authentication being used.
    },
    email:{
        type : String, 
        required : true
    },
    firstName: {
        type : String,   
    },
    lastName: {
        type : String,   
    },
    gender: {
        type : String,   
    },
    image:{
        type: String
    }
}); 

// Create collections and add Schema
mongoose.model('users', visUserSchema)
// users is the collection above








