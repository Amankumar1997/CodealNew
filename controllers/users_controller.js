module.exports.profile=function(req,res)
{
    // i also need to give access to routes
    return res.render('user_profile',{});
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{

    })
}

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{

    })
}

//  
module.exports.create=function(req,res){
    //  todo lator
}