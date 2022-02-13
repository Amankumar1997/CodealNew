const express =require('express');

const app=express();
// we need to require express layouts
const expressLayouts=require('express-ejs-layouts');

const db=require('./config/mongoose');
// use express routes
app.use('/',require('./routes/index'));
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





// server listen on port no 3000 
app.listen(port,function(err)
{
if(err){
    console.log(`there is an error to listening the port ${err}`);
}

console.log(`Server is running on port no ${port}`);
});