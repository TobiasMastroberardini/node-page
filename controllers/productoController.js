const Producto = require("../models/Producto");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.crearProducto = async (req, res) => {
  try {
    const { name, description, price, sizes } = req.body;

    // Parsear sizes
    let parsedSizes = [];
    if (sizes) {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (error) {
        console.error("Error parsing sizes:", error);
        // Si no se puede parsear, asumimos que es una cadena simple y la convertimos en array
        parsedSizes = sizes.split(",").map((size) => size.trim());
      }
    }

    // Manejar imágenes
    const images = req.files ? req.files.map((file) => file.path) : [];

    const newProducto = new Producto({
      name,
      description,
      price: parseFloat(price),
      sizes: parsedSizes,
      images,
    });

    const savedProducto = await newProducto.save();
    res.status(201).json(savedProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.upload = upload.array("images");

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.actualizarProducto = async (req, res) => {
  try {
    const { name, description, price, sizes } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : undefined;

    const updatedProducto = await Producto.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price: parseFloat(price),
        sizes: sizes ? sizes.split(",") : [],
        ...(images && { images }),
      },
      { new: true }
    );

    if (!updatedProducto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updatedProducto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const deletedProducto = await Producto.findByIdAndDelete(req.params.id);
    if (!deletedProducto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
