const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },

  questions: [
    {
      question: String,
      type: Number,
    },
  ],
});

module.exports = Question = mongoose.model("Qestions", QuestionSchema);
