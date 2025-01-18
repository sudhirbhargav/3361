const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Must match a category name
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
