const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  code: String,
  price: Number,
  category: String,
  origin: String,
  availableAmount: Number
});

module.exports = mongoose.model("Product", productSchema);