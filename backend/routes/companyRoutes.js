const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Save Company
router.post("/", async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Company
router.get("/", async (req, res) => {
  try {
    const company = await Company.findOne();
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;