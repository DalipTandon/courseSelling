const express=require("express");
const UserRouter=express.Router();
const User =require("../models/user")

UserRouter.post("/signup",async(req,res)=>{
    const {firstName,lastName,emailId,password}=req.body;
    const user=new User({
        firstName,lastName,emailId,password
    })
  await  user.save();

    res.send({message:"signup done",data:user});
})

UserRouter.get("/signout",(req,res)=>{
    res.send("user logged out");
})




module.exports=UserRouter;