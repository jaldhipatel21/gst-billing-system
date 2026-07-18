const express = require("express");


require("dotenv").config();
const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const companyRoutes = require("./routes/companyRoutes");
const backupRoutes = require("./routes/backupRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/backup",backupRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/company", companyRoutes);
app.get("/", (req, res) => {
  res.send("GST Billing Backend Running...");
});

const PORT =process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
connectDB();