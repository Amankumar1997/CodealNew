module.exports.home=function(req,res)
{
//  cookies come as res and send as respons
    
    res.cookie('user_id',25);
    console.log(req.cookies);
    // i also need to give access to routes
    return res.render('home',{});
}