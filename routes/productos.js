const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const upload = require("../middleware/upload");

router.post("/", upload.array("images", 5), productoController.crearProducto);
router.get("/", productoController.obtenerProductos);
router.get("/:id", productoController.obtenerProducto);
router.put(
  "/:id",
  upload.array("images", 5),
  productoController.actualizarProducto
);
router.delete("/:id", productoController.eliminarProducto);

module.exports = router;
