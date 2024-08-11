const mongoose = require("mongoose");

// URL de conexión a MongoDB
const dbURI = "mongodb://localhost:27017/mydatabase";

// Conectar a MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Conectado a MongoDB");
});

db.on("error", (err) => {
  console.error("Error de conexión a MongoDB:", err);
});

module.exports = { db };
