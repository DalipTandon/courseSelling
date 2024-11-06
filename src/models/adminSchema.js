const mongoose=require("mongoose");
const Course=require("./courses");


const adminSchema=new mongoose.Schema({
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
    createdCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
},{timestamps:true});

module.exports=mongoose.model("Admin",adminSchema);