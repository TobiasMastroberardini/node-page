const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }], // Lista de URLs de imágenes
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
