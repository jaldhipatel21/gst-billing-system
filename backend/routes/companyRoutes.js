const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Get Company Details
router.get("/", async (req, res) => {
  try {
    const company = await Company.findOne();

    res.json(company || {});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Create or Update Company Details
router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const existingCompany = await Company.findOne();

    if (existingCompany) {
      const updatedCompany = await Company.findByIdAndUpdate(
        existingCompany._id,
        req.body,
        {
          new: true,
        }
      );

      return res.json({
        message: "Company updated successfully",
        company: updatedCompany,
      });
    }

    const company = await Company.create(req.body);

    res.status(201).json({
      message: "Company created successfully",
      company,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;