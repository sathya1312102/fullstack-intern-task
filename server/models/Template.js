const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: String,
  description: String,
  thumbnail_url: String,
  category: String
});

module.exports = mongoose.model("Template", templateSchema);