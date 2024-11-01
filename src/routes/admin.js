const express=require("express");
const adminRouter=express.Router();



adminRouter.get("/singup",(req,res)=>{
    res.send("admin  done");
})

adminRouter.get("/signout",(req,res)=>{
    res.send("admin logged out");
})



module.exports=adminRouter;