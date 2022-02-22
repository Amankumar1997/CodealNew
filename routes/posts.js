var express = require('express');
var router = express.Router();
const passport=require('passport');
// access home controller 
const postController=require('../controllers/post_controller');


// map  a route to the post controller
router.post('/create',passport.checkAuthentication,postController.create);
 // passport.checkAuth means user loggedin
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);



module.exports=router;
