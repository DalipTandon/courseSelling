const express = require("express");
const courseRouter = express.Router();
const { z } = require("zod");
const Course=require("../models/courses")
const{userAuthentication,adminAuthentication}=require("../middlewares/authentication")



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

courseRouter.get("/feed",userAuthentication, (req, res) => {

  try{
    res.send("done")
  }catch(error){
    res.send("plz authentixcate");
  }
});

module.exports = courseRouter;
