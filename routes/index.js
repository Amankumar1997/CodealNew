var express = require('express');
var router = express.Router();

// access home controller 
const homeControler=require('../controllers/home_controller')

console.log('routes loaded');

router.get('/',homeControler.home);

router.use('/users',require('./user'));

router.use('/posts',require('./posts'));

module.exports=router;

