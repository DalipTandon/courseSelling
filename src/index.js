const express=require("express");
const app=express();




const UserRouter=require("./routes/users");
const adminRouter=require("./routes/admin");
const courseRouter=require("./routes/course");

app.use("/users",UserRouter);
app.use("/admin",adminRouter);
app.use("/course",courseRouter);


app.listen(3000,()=>{
    console.log("server started at port 3000");
    
})