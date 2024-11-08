const Course = require("./courses");
const User = require("./user");
const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purchaseDate: { type: Date, default: Date.now },
  status: { type: String, default: "completed" },
});

module.exports=mongoose.model("Purchase",purchaseSchema);