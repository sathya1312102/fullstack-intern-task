const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template"
  }
});

module.exports = mongoose.model("Favorite", favoriteSchema);