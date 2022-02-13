const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    email:{
        type:String,
        // required means field is submision is mandtary 
        required:true,
        // uniqe means email sholud be uniqe which not presttn in db
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},
{
    //  timestamp means 
    timestamps:true
}
);

const User=mongoose.model('User',userSchema);
module.exports=User;