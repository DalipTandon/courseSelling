const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
    
    courseName:{
        type:String,
        required:true
    },
    coursePrice:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    courseUrl:{
        type:String
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        
    }
})

module.exports= mongoose.model("Course",courseSchema);