const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClaimSchema = new Schema({
  claimId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },

  Message: {
    type: String,
  },

  claims: {
    type: Array,
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = Claim = mongoose.model("Claim's", ClaimSchema);
