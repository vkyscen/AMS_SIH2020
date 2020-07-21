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
  observedData: {
    category1: {
      q1: { type: String },
      q2: { type: String },
      q3: { type: String },
      q4: { type: String },
      q5: { type: String },
    },
    category2: {
      q1: { type: String },
      q2: { type: String },
      q3: { type: String },
      q4: { type: String },
      q5: { type: String },
    },
    category3: {
      q1: { type: String },
      q2: { type: String },
      q3: { type: String },
      q4: { type: String },
      q5: { type: String },
    },
    category4: {
      q1: { type: String },
      q2: { type: String },
      q3: { type: String },
      q4: { type: String },
      q5: { type: String },
    },
    category5: {
      q1: { type: String },
      q2: { type: String },
      q3: { type: String },
      q4: { type: String },
      q5: { type: String },
    },
  },
  reportId: {
    type: String,
    required: true,
  },
  dId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = Visit = mongoose.model("Visit's", VisitSchema);
