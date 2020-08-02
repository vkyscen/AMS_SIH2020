const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DistrictDataSchema = new Schema({
  data:[
    {
        districtName:String,
        reportData:Object
    }
  ]
});

module.exports = DistrictData = mongoose.model("DistrictData", DistrictDataSchema);

