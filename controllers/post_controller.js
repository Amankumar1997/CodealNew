// we need to import the post schema that we have we created  inside the models folder
const Post=require('../models/post');

module.exports.create=function(req,res)
{
    // i also need to give access to routes
    // create new post
    Post.create({
        content:req.body.content,
        user:req.user._id
    },
    function(err,post)
    {
        if(err){console.log('errror in creating a post');return;}
        return res.redirect('back');
    });
   
}