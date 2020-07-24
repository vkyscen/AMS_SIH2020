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
});

module.exports = Visit = mongoose.model("Visits", VisitSchema);
