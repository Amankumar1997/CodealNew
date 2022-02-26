// we need to import the post schema that we have we created  inside the models folder
const Post=require('../models/post');
const  Comment=require('../models/comment');
module.exports.create=async function(req,res)
{
    // i also need to give access to routes
    // create new post
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        })
    }
    catch(err){console.log("error in post creation",err);return;}
   
    return res.redirect('back');
   
}

// action for destroy a post
module.exports.destroy=async function(req,res)
{

    try{

   
    // before dleting a post i need check it is present in the data base or not 
    let post= await Post.findById(req.params.id,function(err,post){

        // if getting the post
        // .id means converting the object id into string
        if(post.user==req.user.id){
        //   post.user and req.user .id is same then we remove post
        post.remove();

        // for dleting a coment i also need to import it
        // comment.deleteamny deletes all commetn which based on some query part
        Comment.deleteMany({post:req.params.id},function(err){
        return res.redirect('back');
        });
        

        }else{
            return res.redirect('back');
        }
  
    });
}catch(err){console.log('there is an error in destoyin post');
return;}
}