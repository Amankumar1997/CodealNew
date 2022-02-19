const { redirect } = require('express/lib/response');
const User=require('../models/user');
module.exports.profile=function(req,res)
{
    // i also need to give access to routes
    return res.render('user_profile',{});
}


//  render the sign up page
module.exports.signUp=function(req,res){
// if req is authenticated than it will redirect on profile page
if(req.isAuthenticated())
{
    return res.redirect('/users/profile');
}


    return res.render('user_sign_up',{

    })
}

//  renderthe sign in page
module.exports.signIn=function(req,res){
    // if req is authenticated than it will redirect on profile page
if(req.isAuthenticated())
{
    return res.redirect('/users/profile');
}
    return res.render('user_sign_in',{

    })
}


//  get the sign up data
module.exports.create=function(req,res){
// read body params 
// check paswword and confirm passwrd is same or not
if(req.body.password!=req.body.confirm_password)
{
    return res.redirect('back');
}
// trying find userId
User.findOne({email:req.body.email},function(err,user){
    if(err){console.log("errror in finding user sign up ");return}

    //  if user not found than we create a user
    if(!user){
    User.create(req.body,function(err,user){
        if(err){console.log("errror in creating while  user sign up ");return}
    
        return res.redirect('/users/sign-in');
    })
    }else{
        return res.redirect('back');
    }
});

}

// get the sign in data
module.exports.createSession=function(req,res){
    
    return res.redirect('/');
}


module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}