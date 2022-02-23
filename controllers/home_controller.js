const Post=require('../models/post');
const User =require('../models/user')

module.exports.home=function(req,res)
{
//  cookies come as res and send as respons
    // res.cookie('user_id',25);
    // console.log(req.cookies);
    // i also need to give access to routes


    // this query return all the post
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         posts:posts
    //     });
    // })

    //populating the user of each post
    Post.find({}).populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home',{
                posts:posts,
                all_users:users 

            });
        });
   
   })

   
}