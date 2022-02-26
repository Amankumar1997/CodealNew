const Comment= require('../models/comment');
 const Post=require('../models/post');




 module.exports.create=function(req,res)
{
    // we need to create comment over a post
    Post.findById(req.body.post,function(err,post){
        // if post is found then we create the comment
        if(post)
        {
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                // if the comments gets created
                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            })
        }
    })

}

module.exports.destroy=async function(req,res){

    try{
    // now i finding the comment if exiting or not in the the database before deliting
    let comment = await Comment.findById(req.params.id)
      
          
        //   agr comment is equal jo id request ki thenwe delete the comment
            if(comment.user==req.user.id){

                // delete krne se phle hu usko varibalbe me stor kr lenge
                let postId=comment.post;
                // deleting a comment
                comment.remove();
                // findbyidupdate finds the matching docu,ent and update acoording to it 
               let post =await  Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
                                               //pull means dleting coments along which req.id comes
                              
                 return res.redirect('back');                        
               
            }
            // agr comment isnot equal jo id request  jo dlete krna hai
            else{
                return res.redirect('back');
            }
     
     
    }catch(err){console.log("error in destrying comment",err);return }
}