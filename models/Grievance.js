const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GrievanceSchema = new Schema({
  GrievanceId: {
    type: String,
    required: true,
  },
  title: {
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

  Message: {
    type: String,
  },

  type: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = Grievance = mongoose.model("Grievances", GrievanceSchema);
