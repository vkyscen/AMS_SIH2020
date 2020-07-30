const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  institute:{
    type:String,
    required:true,
  },
  position:{
    type:String,
    required:true,
  },
  dob:{
    type:String,
    required:true,
  },
  ph_no:{
    type:Number,
    required:true,
  },
  schoolId:{
    type:String,
    required:true,
  },
  studentId: {
    type: String,
    required: true,
  },
  roll_no:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  }
  
});

module.exports = Student = mongoose.model("Students", StudentSchema);
