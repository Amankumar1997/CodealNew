const User=require('../models/user');
//  import passport
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;



// authention using passport
passport.use(new LocalStrategy({

    usernameField:'email',
    // setup request .flash
    passReqToCallback:true
    },
    function(req,email,password,done)
    {
//  find a user and eSTABLISH THE idenetiy
User.findOne({email:email},function(err,user){
    if (err) {
        req.flash('error',err); 
    return done(err); }

    // if password there is no usr and password is not match with user password
  if(!user || user.password!=password)
  {
      req.flash('error','Invalid User And password');
    //    if user is not found then return false means we not return any user and null for if there is errror
     return done(null,false);
  }
  return done(null,user);

})
    }


));


// serilizing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);

})
// desreailzing the user from the key in the cookies
passport.deserializeUser(function(id,done){
// find the user if it exist i the database
User.findById(id,function(err,user){
    if(err){console.log('Error in Finding user paaprt');
return done(err)
}

return done(null,user);
});
});







// check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
// detect user signd in  if user is signed in passed to the next function which is my controller action
    if(req.isAuthenticated())
    {
        return next();
    }

    // if the user is not signed in then redirecton user sign in page
return res.redirect('/users/sign-in');
}


// set the user for view if it is signed in
passport.setAuthenticatedUser=function(req,res,next){
    // check user is authenticated or not
    if(req.isAuthenticated()){
    //  req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
     res.locals.user=req.user;
    }
next();
}




module.export=passport;