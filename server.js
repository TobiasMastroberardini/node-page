const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors());

// Configuración para recibir JSON
app.use(express.json());

// Configuración de Multer para servir archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Rutas
app.use("/products", productRoutes);

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/your-database-name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
