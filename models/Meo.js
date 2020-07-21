const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MeoSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
});

module.exports = Meo = mongoose.model("Meos", MeoSchema);
