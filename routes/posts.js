var express = require('express');
var router = express.Router();
const passport=require('passport');
// access home controller 
const postController=require('../controllers/post_controller');


// map  a route to the post controller
router.post('/create',passport.checkAuthentication,postController.create);



module.exports=router;
