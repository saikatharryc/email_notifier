const mongoose = require("mongoose");
const pxlsSchema = new mongoose.Schema({
  link: String,
  recipient: String,
  type: String,
  pxl: String,
  count: Number
});

const Pxls = mongoose.model("Pxls", pxlsSchema);
module.exports = Pxls;
