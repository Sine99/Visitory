const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const visitorySchema = new Schema({
    place: {
        type : String,
        required : true // becoz google is the only authentication being used.
    },
    city:{
        type : String, 
        required : true
    },
    state: {
        type : String,   
        required : true
    },
    status : {
        type : String,
        default : "public"
    },

    date : {
        type : Date,   
        required: true,
    },
    
    commentAccept :{
        type : Boolean,
        default : true
    },
    body :{
        type : String,
        required : true
    },
    comments : [{
        commentBody: {
            type: String,
            required : true
        },
        commentDate : {
            type : Date,
            default : Date.now,
        },
        commentUser : {
            type: Schema.Types.ObjectId,
            ref : 'users',
        },
    }],
    user:{
        type: Schema.Types.ObjectId,
        ref : 'users',
    }    
}); 

// Create collections and add Schema
mongoose.model('visitoryModel', visitorySchema)
// users is the collection above








