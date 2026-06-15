const express = require("express");
const cors = require("cors");

require("dotenv").config();
const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("GST Billing Backend Running...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
connectDB();