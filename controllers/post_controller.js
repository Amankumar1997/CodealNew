// we need to import the post schema that we have we created  inside the models folder
const Post=require('../models/post');
const  Comment=require('../models/comment');
module.exports.create=async function(req,res)
{
    // i also need to give access to routes
    // create new post
    try{
        let post= await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        if(req.xhr)
        {
            // we return json with a status
            return res.status(200).json({
               // json contain a data which ill have a post
                data:{
                    post:post
                },
                message:"post created"
            }) 
        }


        req.flash('success','Post Published');
        return res.redirect('back');
    }
    catch(err){  req.flash('error',err);return;}
   
    return res.redirect('back');
   
}

// action for destroy a post
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
           
           
            req.flash('success','Post associated comment Deleted');
            return res.redirect('back');
        }else{
            req.flash('error','you cannot delete this post');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error',err);
        console.log('Error', err);
        return;
    }
    
}