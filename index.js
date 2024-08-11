const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

const products = require("./routes/products");
app.use("/api/products", products);
