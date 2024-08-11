const Product = require("../models/productModel");
const path = require("path");
const fs = require("fs");

// Subir producto con imágenes
exports.uploadProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    let images = [];

    if (req.files) {
      images = req.files.map((file) => file.path.replace("public/", "")); // Guardar solo la ruta relativa
    }

    const newProduct = new Product({ name, description, price, images });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar producto por ID
exports.updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    if (req.files) {
      updates.images = req.files.map((file) =>
        file.path.replace("public/", "")
      );
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar producto por ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
