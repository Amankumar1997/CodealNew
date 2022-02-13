var express = require('express');
var router = express.Router();

// access home controller 
const postController=require('../controllers/post_controller');


// map  a route to the post controller
router.get('/post',postController.post);



module.exports=router;
