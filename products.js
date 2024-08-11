const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Obtener todos los productos");
});

router.get("/:id", (req, res) => {
  res.send(`Obtener producto con ID: ${req.params.id}`);
});

module.exports = router;
