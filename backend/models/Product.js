const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hsn: String,
    gst: Number,
    rate: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);