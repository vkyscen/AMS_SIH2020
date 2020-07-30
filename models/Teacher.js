const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  institute:{
    type:String,
    required:true,
  },
  handling:[],
  ph_no:{
    type:Number,
    required:true,
  },
  schoolId:{
    type:String,
    required:true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true,
  }


});

module.exports = Teacher = mongoose.model("Teachers", TeacherSchema);
