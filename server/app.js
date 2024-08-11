const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();

const app = express();

app.use(express.json()); // For parsing application/json
app.use("/api", productRoutes);

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
