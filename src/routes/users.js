const express=require("express");
const UserRouter=express.Router();
const User =require("../models/user")
const {z}=require("zod");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {userAuthentication}=require("../middlewares/authentication")
const Purchase=require("../models/purchase")
require('dotenv').config()

UserRouter.post("/signup",async(req,res)=>{
    try{
        const requiredBody=z.object({
            firstName: z.string().min(3).max(50),
            lastName: z.string().min(3).max(50),
            emailId: z.string().min(3).max(50).email(),
            password: z.string().min(6),
        })
        const parsedDataWithSuccess=requiredBody.safeParse(req.body);
        if(!parsedDataWithSuccess.success){
           return res.json({
            message:"Error",
            error:parsedDataWithSuccess.error
           })
        }
        const {firstName,lastName,emailId,password}=req.body;
        const hashPassword=await bcrypt.hash(password,10);
        const user=new User({
            firstName,lastName,emailId,password:hashPassword
        })
      await  user.save();
    
        res.send({message:"signup done",data:user});
    }catch(error){
        res.send(error.message);
    }
  
})

UserRouter.post("/login",async(req,res)=>{
    
    try{
        const requiredBody=z.object({
            emailId: z.string().min(3).max(50).email(),
            password: z.string().min(6),
        })
        const parsedDataWithSuccess=requiredBody.safeParse(req.body);
        if(!parsedDataWithSuccess.success){
           return res.json({
            message:"Error",
            error:parsedDataWithSuccess.error
           })
        }
        const {emailId,password}=req.body;
        const user=await User.findOne({
            emailId:emailId
        })
        if(!user){
            throw new Error("Invalid credentials")
        }
        const isPassword=await bcrypt.compare(password,user.password);
        if(isPassword){
            var token=await jwt.sign({_id:user._id},process.env.USER_SECRET,{expiresIn:"7d"});
            res.cookie("token",token);
            res.json({
                message:"User logged in Successfully",
                Data:user
            })
        }else{
            throw new error("Invalid credentials");
        }

    }catch(error){
        res.send(error.message);
    }
})
UserRouter.get("/mycourse",userAuthentication,async(req,res)=>{
    try{
        const user=req.user;
        const myCourse=await Purchase.find({
            userId:user._id
        }) .populate("courseId", "courseName")
        if(!myCourse|| (myCourse.length===0)){
            throw new Error("No courses");
        }
        res.send({
            message:"Your Purchased courses",
            data:myCourse
        })

    }catch(error){
        res.send(error.message);
    }
})

 


module.exports=UserRouter;