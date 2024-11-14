const express=require("express");
const app=express();
const mongoose=require("mongoose");
const connectDb=require("./config.js/db")
const cookieParser = require('cookie-parser')
const cors=require("cors")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
const UserRouter=require("./routes/users");
const adminRouter=require("./routes/admin");
const courseRouter=require("./routes/course");

app.use("/users",UserRouter);
app.use("/admin",adminRouter);
app.use("/course",courseRouter);




connectDb().then(()=>{
    console.log("DB is connected succesfully");
    
    app.listen(3000,()=>{
        console.log("server started at port 3000");
        
    })
})
.catch((err)=>{
    console.log("Db is not connected successfully");
    
})
