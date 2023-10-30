const mongoose = require("mongoose");

const productScehma = mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
});

module.exports = mongoose.model("products", productScehma);
