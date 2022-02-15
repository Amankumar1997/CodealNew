const express = require('express');
const router = express.Router();
const passport=require('passport');
// access home controller 
const usersController=require('../controllers/users_controller');


// map  a route to the user controller
router.get('/profile',usersController.profile);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);




router.post('/create',usersController.create);

//  use passport as a middlewar to autehticate
router.post('/create-session',passport.authenticate('local',// we use local stratgy 
{failureRedirect:'/users/sign-in'})// falire redirect means if user fails to sign in then user back to sign in page
,usersController.createSession);


module.exports=router;

