const express =require("express");
const mongoose = require("mongoose")
const router = express.Router();

const{checkAuthentication, checkGuest} = require('./helpers/auth');

// connecting to database
// we have already loaded the model file in the app.js
// now loading the schema model
const visitoryModel = mongoose.model("visitoryModel") 
const users = mongoose.model("users") 

// '/' is the starting page
router.get('/',checkGuest, (req, res) => {
    // res.send("this is the home page")
    res.render('pages/homePage');
});

router.get('/userHome',checkAuthentication, (req, res) => {
    visitoryModel.find({user: req.user.id})
        .populate('user')
        .then(visitory => {
            res.render('pages/userHome',{
                visitory : visitory,
            });
        });
});

// ---------- visitories views------------

//visitories index
router.get('/visitories', (req,res)=>{
    visitoryModel.find({status : 'public'})
        .populate('user')  //calling the local variable.
        .then(visitory =>{
            res.render('visitories/index',{
                visitory: visitory,
            });
        });
});

// display each single story
router.get('/visitories/display/:id', (req, res) => {
    visitoryModel.findOne({
      _id: req.params.id
    })
    .populate('user') //grab all info about the user
    .then(visitory => {
      res.render('visitories/display', {
        visitory : visitory
      });
    });
  });


// this will take to page to add ur visitory
router.get('/visitories/add',checkAuthentication, (req, res) => {
    res.render('visitories/add');
});

// this will take to page to add ur visitory
router.get('/visitories/update/:id',checkAuthentication, (req, res) => {
    visitoryModel.findOne({
        _id: req.params.id
      })
      .then(visitory => {
        res.render('visitories/update', {
        visitory : visitory
        });
      });
});

router.post('/visitories', (req, res) => {
    let commentAccept;
    // console.log(req.body);

    // commentAccept will exist in the req.body only when it is 'on' else it wont.
    // the value of commentAccept will be 'on'. So, it is imp to set the value of 
    // commentAccept to true if it exists.
    if(req.body.commentAccept){
        commentAccept = true;
        // console.log("I m here")
    } else {
        commentAccept = false;
    }

    console.log(req.body)
    
    const newVisitory = {
        place : req.body.place,
        city  : req.body.city,
        state : req.body.state,
        status : req.body.status,
        date : req.body.date,
        commentAccept : commentAccept,
        body  : req.body.body,
        user : req.user.id,
    }
    console.log(newVisitory)
    new visitoryModel(newVisitory)
        .save()
        .then(visitory => {
            // public and private stories can be restricted here
            res.redirect(`visitories/display/${visitory.id}`);
        });
});

router.put('/visitories/:id', (req, res)=>{
    visitoryModel.findOne({
        _id: req.params.id
      })
      .then(visitory => {
          let commentAccept;
            if(req.body.commentAccept){
                commentAccept = true;
                // console.log("I m here")
            } else {
                commentAccept = false;
            }  
        // Updates values
            visitory.place = req.body.place;
            visitory.city  = req.body.city;
            visitory.state = req.body.state;
            visitory.status = req.body.status;
            visitory.date = req.body.date;
            visitory.commentAccept = commentAccept;
            visitory.body  = req.body.body;

            visitory.save()
                .then(story =>{
                    res.redirect("/userHome")
                });
      });
});

router.delete('/visitories/:id',checkAuthentication, (req,res)=>{
    visitoryModel.deleteOne({_id : req.params.id})
        .then(()=>{
            res.redirect('/userHome');
        });   
});



module.exports = router;
