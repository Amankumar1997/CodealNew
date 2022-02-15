const express =require('express');
const cookieParser=require('cookie-parser');
const app=express();
// we need to require express layouts
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

 // used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

app.use(express.urlencoded());
//  use cookie parser
app.use(cookieParser());

const port =3000;




// access static files
app.use(expressLayouts);
// set up static fles 
app.use(express.static('./assets'));
// extract styles and scripts from the sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//  set view engine
app.set('view engine','ejs');
app.set('views','./views');


//  we need to add middleware that takesthe session cookies and encrypts them
app.use(session({
    //  name of the cokie
name:'codieal',
// todo change the secret before deployment in production mode
secret:'blahsomething',
saveUninitialized:false,
resave:false,
// we need gave age of the cookie how long should be valid after thatsession cookie expire
cookie:{
    maxAge:( 1000 * 60 * 100)
}
}));

app.use(passport.initialize());
app.use(passport.session());
// use express routes
app.use('/',require('./routes/index'));


// server listen on port no 3000 
app.listen(port,function(err)
{
if(err){
    console.log(`there is an error to listening the port ${err}`);
}

console.log(`Server is running on port no ${port}`);
});