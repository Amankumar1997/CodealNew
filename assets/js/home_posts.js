{


    // method to submit the form data for the new post using Ajax
let createPost=function()
{
    // fetches form from home ejs
    let newPostForm= $('#new-post-form');
    newPostForm.submit(function(e)
    {
        // whenever the form is submitted we dont want to submit own its wn so we use prevent Default
        e.preventDefault();

       $.ajax({
           // type hamra post type hai
           type:'post',
           // url same as form home 
           url:'/posts/create',
           // send in th data that we are create post and serilize it serilize means to convertthe form data into json
           data:newPostForm.serialize(),
           success:function(data){
          // data always in the form of jsom
          console.log(data);
           },
           error:function(error)
           {
               // error is resposnse text
               console.log(error.responseText);
           }
       });

    })



}

// method to create a post in dom
createPost();// once we submitted we recive it post controller

}