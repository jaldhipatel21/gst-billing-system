const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");

// Save Invoice
router.post("/", async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({
      createdAt: -1,
    });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;