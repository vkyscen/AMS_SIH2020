const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VisitSchema = new Schema({
  schoolId: {
    type: String,
    required: true,
  },
  mId: {
    type: String,
    required: true,
  },
  reportData: [
    {
      categoryName: String,
      visibleForTeachers: Boolean,
      fieldData: [
        { question: String, answer: String, qType:Number },
      ],
    },
  ],

  visitId: {
    type: String,
    required: true,
  },
  dId: {
    type: String,
    required: true,
  },
  reportDate: {
    type: Number,
    required:true,
  },
  inaccurateReport: {
    categories: Array,
    message: String,
    complaintDate:Number,
  },
  remarks: [
    {
      categoryName: String,
      message:String,
    },
  ],
  schoolName: {
    type: String,
  },
  
});
module.exports = Visit = mongoose.model("Visits", VisitSchema);
