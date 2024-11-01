const express=require("express");
const UserRouter=express.Router();


UserRouter.get("/singup",(req,res)=>{
    res.send("signup done");
})

UserRouter.get("/signout",(req,res)=>{
    res.send("user logged out");
})




module.exports=UserRouter;