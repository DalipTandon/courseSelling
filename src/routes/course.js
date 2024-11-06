const express = require("express");
const courseRouter = express.Router();
const { z } = require("zod");
const Course=require("../models/courses")
courseRouter.post("/create",async (req, res) => {
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

courseRouter.get("/feed", (req, res) => {
  res.send("course logged out");
});

module.exports = courseRouter;
