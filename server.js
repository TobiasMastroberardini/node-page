const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const productoRoutes = require("./routes/productos");

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/api/productos", productoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
