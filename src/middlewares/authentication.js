const jwt=require("jsonwebtoken");
require('dotenv').config()
const User=require("../models/user")
const Admin=require("../models/adminSchema")



const userAuthentication=async(req,res,next)=>{

    try{
        const cookies=req.cookies;
        const{token}=cookies;
        if(!token){
            return res.status(401).json({ error: "Token not provided" });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.USER_SECRET);
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const { _id } = decoded;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("Invalid User");
        }
        req.user=user;
        next();

    }catch(error){
        res.status(500).json({ error: "Authentication failed" });
    }

}
const adminAuthentication=async(req,res,next)=>{

    try{
        const cookies=req.cookies;
        const{token}=cookies;
        if(!token){
            return res.status(401).json({ error: "Token not provided" });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ADMIN_SECRET);
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const { _id } = decoded;
        const admin=await Admin.findById(_id);
        if(!admin){
            throw new Error("Invalid User");
        }
        req.user=admin;
        next();

    }catch(error){
        res.status(500).json({ error: "Authentication failed" });
    }

}


module.exports={
    userAuthentication,adminAuthentication
}