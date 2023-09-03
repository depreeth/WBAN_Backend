const mongoose = require("mongoose");
// const validator = require("validator");
const Schema = mongoose.Schema;

const MSPSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mspId:{
    type: String,
    required:true,
    unique: true
  },
  parameter: {
    type: String,
    required: true,
    trim: true,
  },
  value1: {
    type: Number,
    required: true,
  },
  value2: {
    type: Number,
    // required: true,
  },
});

const MSP = mongoose.model("MSPvalues", MSPSchema);

module.exports = MSP;
