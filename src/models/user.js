const mongoose=require("mongoose");



const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        unqiue:true,
        required:true
    },
    lastName:{
        type:String,
        unqiue:true,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        unqiue:true
    },
    password:{
        type:String,
        required:true,
        unqiue:true
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);