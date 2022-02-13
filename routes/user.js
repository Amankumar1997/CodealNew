var express = require('express');
var router = express.Router();

// access home controller 
const usersController=require('../controllers/users_controller');


// map  a route to the user controller
router.get('/profile',usersController.profile);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);


module.exports=router;

