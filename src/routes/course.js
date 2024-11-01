const express=require("express");
const courseRouter=express.Router();




courseRouter.get("/singup",(req,res)=>{
    res.send("course done");
})

courseRouter.get("/signout",(req,res)=>{
    res.send("course logged out");
})


module.exports=courseRouter;