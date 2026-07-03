const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gstin: {
      type: String,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
      email: {
      type: String,
    },
    phone: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);