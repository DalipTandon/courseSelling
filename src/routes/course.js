const express = require("express");
const courseRouter = express.Router();
const { z } = require("zod");
const Course=require("../models/courses")
const{userAuthentication,adminAuthentication}=require("../middlewares/authentication")
const Purchase=require("../models/purchase")


courseRouter.post("/create",adminAuthentication,async (req, res) => {
  try {
    const { courseName, coursePrice, description, courseUrl,courseRating } = req.body;
    const course=new Course({
        courseName, coursePrice, description, courseUrl,courseRating
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
courseRouter.post("/buy/:userId/:courseId",userAuthentication,async(req,res)=>{
  try{
    const{userId,courseId}=req.params;
  
    
    const course = await Course.findOne({ _id: courseId });
    // console.log(course);
    
    if(!course){
      return res.status(400).send("No such course  available");
    }
    if(courseId!==course._id.toString()){
      return res.status(400).send("No such course with this id available");
    }
    const existingPurchase = await Purchase.findOne({ courseId, userId });
    if (existingPurchase) {
      return res.status(400).send("Course already purchased by this user");
    }

    const purchaseCourse=new Purchase({
      courseId,userId,
      status:"completed"
    })
    await purchaseCourse.save();
    res.send({
      message:"Course Bought Successfully",
      data:{purchaseCourse,course}
    })

  }catch(error){
    res.send(error.message);
  }
})
module.exports = courseRouter;
