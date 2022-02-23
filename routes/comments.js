var express = require('express');
var router = express.Router();
const passport=require('passport');
// access home controller 
const commentsContoller=require('../controllers/comment_controller');

router.post('/create',passport.checkAuthentication,commentsContoller.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsContoller.destroy);


module.exports=router;
