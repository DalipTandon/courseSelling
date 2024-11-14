const express=require("express");
const adminRouter=express.Router();
const {z}=require("zod")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const Admin=require("../models/adminSchema")
require('dotenv').config()

adminRouter.post("/signup",async(req,res)=>{
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
        const admin=new Admin({
            firstName,lastName,emailId,password:hashPassword
        })
      await  admin.save();
    
        res.send({message:"signup done",data:admin});
    }catch(error){
        res.send(error.message);
    }
  
})

adminRouter.post("/login",async(req,res)=>{
    
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
        const admin=await Admin.findOne({
            emailId:emailId
        })
        if(!admin){
            throw new Error("Invalid credentials")
        }
        const isPassword=await bcrypt.compare(password,admin.password);
        if(isPassword){
            var token=await jwt.sign({_id:admin._id},process.env.ADMIN_SECRET,{expiresIn:"7d"});
            res.cookie("token",token);
            res.json({
                message:"User logged in Successfully",
                Data:admin
            })
        }else{
            throw new error("Invalid credentials");
        }

    }catch(error){
        res.send(error.message);
    }
})

adminRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("logout successful");
})
 
module.exports=adminRouter;