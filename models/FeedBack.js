const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FeedBackSchema = new Schema({
  userName:{
    type:String,
    required:true,
  },
  teacherName:{
    type:String,
    required:true,
  },
  subject:{
    type:String,
    required:true,
  },
  message:{
    type:String,
    required:true,
  },
  rating:{
    type:Number,
    required:true,
  },
  studentId:{
    type:String,
    required:true,
  },
  teacherId:{
    type:String,
    required:true,
  },
  position:{
    type:String,
    required:true,
  },
  date:{
    type:Number,
    required:true,
  }


});

module.exports = FeedBack = mongoose.model("FeedBacks", FeedBackSchema);
