const mongoose = require("mongoose");

const Data = mongoose.model(
  "Data",
  new mongoose.Schema({
      name:String,
      sub:Array  
  })
);

module.exports = Data;