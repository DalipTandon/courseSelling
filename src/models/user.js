const mongoose=require("mongoose");
const Course=require("./courses");


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        unique:true,
        required:true
    },
    lastName:{
        type:String,
        unique:true,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    pusrchasedCourse:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);