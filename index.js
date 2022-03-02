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

const mongoStore=require('connect-mongo');

//  import sass midlleeware
const sassMiddleware=require('node-sass-middleware');
// import flash
const flash = require('connect-flash');

const customware=require('./config/middleware');// we also need to use this after use flash
















app.use(sassMiddleware({

    //src path from where we pick up the scss file convert into css 
    src:'./assets/scss',
    // destination path where we put the css files 
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    // prefix means it is alocation where the servershould look for the css files
    prefix:'/css'
}));

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









// mongo store is used the sesion cookie in the db
//  we need to add middleware that takesthe session cookies and encrypts them
app.use(session({
    //  name of the cokie
name:'codieal',
// todo change the secret before deployment in production mode
secret:'blahsomething',
//saveUninitialized --> whn user is not logged in  we doont need to store  extra data in session cookies
saveUninitialized:false,
//resave is used for whenidentity is established we dont want rewrite or svaethe data ifit is not changed
resave:false,
// we need gave age of the cookie how long should be valid after thatsession cookie expire
cookie:{
    maxAge:( 1000 * 60 * 100)
},
store:mongoStore.create({
    mongoUrl:'mongodb://localhost/codiel_development'
}),function(err){
    console.log(err || 'connect -mogodb is ok');
}
}));

app.use(passport.initialize());
app.use(passport.session());
// check whter session cookie present or not 
app.use(passport.setAuthenticatedUser);

app.use(flash());
// use flash middle ware
app.use(customware.setFlash);
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