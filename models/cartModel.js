const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: String,
  code: String,
  price: Number,
  category: String,
  origin: String,
  selectedAmount: Number
});

module.exports = mongoose.model("Cart", cartSchema);