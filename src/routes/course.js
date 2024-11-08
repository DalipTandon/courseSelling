const express = require("express");
const courseRouter = express.Router();
const { z } = require("zod");
const Course=require("../models/courses")
const{userAuthentication,adminAuthentication}=require("../middlewares/authentication")
const Purchase=require("../models/purchase")


courseRouter.post("/create",adminAuthentication,async (req, res) => {
  try {
    const { courseName, coursePrice, description, courseUrl } = req.body;
    const course=new Course({
        courseName, coursePrice, description, courseUrl
    })
    await course.save();
    res.send({
        message:"Course is created successfully",
        data:course
    })
  } catch (error) {
    res.status(400).send(error);
  }
});

courseRouter.get("/feed", async(req, res) => {

  try{
     const courseData=await Course.find();
    res.send({message:"All Courses",data:courseData});
  }catch(error){
    res.send(error.message);
  }
});
courseRouter.post("/buy/:userId/:courseId",async(req,res)=>{
  try{
    const {courseName}=req.body;
    const{userId,courseId}=req.params;
  
    
    const course = await Course.findOne({ courseName: courseName });
    console.log(course);
    
    if(!course){
      return res.status(400).send("No such course with this name is available");
    }
    if(courseId!==course._id.toString()){
      return res.status(400).send("No such course with this id available");
    }

    const purchaseCourse=new Purchase({
      courseId,userId,
      status:"completed"
    })
    await purchaseCourse.save();
    res.send({
      message:"Course Bought Successfully",
      data:purchaseCourse
    })

  }catch(error){
    res.send(error.message);
  }
})
module.exports = courseRouter;
