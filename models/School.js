const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
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
  mandalName: {
    type: String,
  },

  mId: {
    type: String,
    required: true,
  },

  dId: {
    type: String,
    required: true,
  },
  geoHash: {
    type: String,
    required: true,
  },
  lastVisited: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  dateTobeVisited: {
    type: Date,
  },
  meoName: {
    type: String,
  },
  schoolAddress: {
    type: String,
  },
  latestVisitId:{
    type:String,
    default:null,
  }
});

module.exports = School = mongoose.model("schools", SchoolSchema);
