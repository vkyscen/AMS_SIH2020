const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GrievanceSchema = new Schema({
  GrievanceId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },

  schoolName: {
    type: String,
  },

  message: {
    type: String,
  },

  status: {
    type: String,
    required: true,
  },

  date: {
    type: Number,
    required:true,
  },
  dId: {
    type: String,
    required: true,
  },
});

module.exports = Grievance = mongoose.model("Grievances", GrievanceSchema);
