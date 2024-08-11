const express = require("express");
const app = express();
const port = 3000;

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuración de vistas (usando EJS, por ejemplo)
app.set("view engine", "ejs");

// Importar rutas
const productRoutes = require("./routes/productRoutes");
// const userRoutes = require('./routes/userRoutes'); // Añadir más rutas si es necesario

// Usar rutas
app.use("/products", productRoutes);
// app.use('/users', userRoutes); // Añadir rutas para usuarios si es necesario

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
