const express = require("express");
const router = express.Router();

const Invoice = require("../models/Invoice");


// ====================
// Next Invoice Number
// ====================

router.get("/next-number", async (req, res) => {

    try {
        const lastInvoice = await Invoice.findOne()
            .sort({ createdAt: -1 });
        if (!lastInvoice) {
            return res.json({
                invoiceNo: "INV-0001"
            });
        }

       const currentNumber = parseInt(
            lastInvoice.invoiceNo.replace("INV-", "")
        );
        const nextNumber = currentNumber + 1;

        const invoiceNo =
            `INV-${String(nextNumber)
                .padStart(4, '0')}`;

        res.json({
            invoiceNo
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// ====================
// Save Invoice
// ====================

router.post("/", async (req, res) => {
    try {
        const invoice = await Invoice.create(
            req.body
        );

        res.status(201).json({
            message: "Invoice Saved",
            invoice
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// ====================
// Get All Invoices
// ====================

router.get("/", async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .sort({
                createdAt: -1
            });

        res.json(
            invoices
        );
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ====================
// Get Single Invoice
// ====================

router.get("/:id", async (req, res) => {
    try {
        const invoice =
            await Invoice.findById(
                req.params.id
            );
        if (!invoice) {
            return res.status(404).json({
                message: "Invoice not found"
            });
        }
        res.json(invoice);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// ====================
// Delete Invoice
// ====================
router.delete("/:id", async (req, res) => {
    try {
        await Invoice.findByIdAndDelete(
            req.params.id
        );
        res.json({
            message: "Invoice Deleted"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// ====================
// Get Single Invoice
// ====================

router.get("/:id", async (req, res) => {

    try {

        const invoice = await Invoice.findById(
            req.params.id
        );

        res.json(invoice);

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



// ====================
// Update Invoice
// ====================

router.put("/:id", async (req, res) => {

    try {

        const invoice =
            await Invoice.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }

            );


        res.json({

            message: "Invoice Updated",

            invoice

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});
module.exports = router;