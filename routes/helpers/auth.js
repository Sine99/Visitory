module.exports = {
    // module.exports exports object

    // if the user is not logged in, he will redirect to app homepage
    checkGuest: (req, res, next)=>{
        if(req.isAuthenticated()){
            res.redirect('/userHome');
        }else {
           return next();
        }
    },
    // if the user is logged in, he will be redirected to user homepage
    checkAuthentication: function (req,res,next){
        if(req.isAuthenticated()){
            //req.isAuthenticated() will return true if user is logged in
           return next();
        } else{
            res.redirect("/");
        }
    },
}