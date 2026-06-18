const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: String,
  gstin: String,
  address: String,
  mobile: String,
  email: String,
  bankName: String,
  accountNumber: String,
  ifsc: String,
});

module.exports = mongoose.model("Company", companySchema);