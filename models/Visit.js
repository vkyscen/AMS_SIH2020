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
      fieldData: [
        { question: String, answer: String, score: Number, total: Number },
      ],
      message: String,
    },
  ],
  reportId: {
    type: String,
    required: true,
  },
  dId: {
    type: String,
    required: true,
  },
  reportDate: {
    type: Date,
    default: new Date(),
  },
  inaccurateReport: {
    categories: Array,
    message: String,
  },
  remarks: {
    categoryName: String,
    message: String,
  },
});

module.exports = Visit = mongoose.model("Visits", VisitSchema);
