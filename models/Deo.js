const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeoSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  districtName: {
    type: String,
  },
  dId: {
    type: String,
    required: true,
  },
});

module.exports = Deo = mongoose.model("Deos", DeoSchema);
