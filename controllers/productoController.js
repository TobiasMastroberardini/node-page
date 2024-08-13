const Producto = require("../models/Producto");

exports.crearProducto = async (req, res) => {
  try {
    const { name, description, price, sizes } = req.body;
    const images = req.files.map((file) => file.path);

    let sizesArray;
    if (typeof sizes === "string") {
      sizesArray = sizes.split(",");
    } else if (Array.isArray(sizes)) {
      sizesArray = sizes;
    } else {
      sizesArray = [];
    }

    const newProducto = new Producto({
      name,
      description,
      price: parseFloat(price),
      sizes: sizesArray,
      images,
    });

    const savedProducto = await newProducto.save();
    res.status(201).json(savedProducto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
