const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/tu_basededatos", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB establecida");
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
