const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: String,
    customerName: String,
    customerGST: String,

    items: [
      {
        product: String,
        qty: Number,
        rate: Number,
        gst: Number,
        amount: Number,
      },
    ],

    subtotal: Number,
    gstAmount: Number,
    grandTotal: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);