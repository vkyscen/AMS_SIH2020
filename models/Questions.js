const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  q1: {
    type: String,
  },
  q2: {
    type: String,
  },
  q3: {
    type: String,
  },
  q4: {
    type: String,
  },
  q5: {
    type: String,
  },
});

module.exports = Question = mongoose.model("Qestions", QuestionSchema);
