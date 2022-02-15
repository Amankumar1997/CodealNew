const User=require('../models/user');
//  import passport
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
// authention using passport
passport.use(new LocalStrategy({

    usernameField:'email'
    },function(email,password,done)
    {
//  find a user and eSTABLISH THE idenetiy
User.findOne({email:email},function(err,user){
    if (err) {console.log("error in finding user passport"); 
    return done(err); }

    // if password there is no usr and password is not match with user password
  if(!user || user.password!=password)
  {
      console.log('Invalid User And password');
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

module.export=passport;