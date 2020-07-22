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

  isVisited: {
    type: Boolean,
    required: true,
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
  },
});

module.exports = School = mongoose.model("Schools", SchoolSchema);
