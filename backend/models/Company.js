const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

    companyName: {
        type: String,
        default: ""
    },

    gstin: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    mobile: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        default: ""
    },

    bankName: {
        type: String,
        default: ""
    },

    accountNumber: {
        type: String,
        default: ""
    },

    ifsc: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Company",
    companySchema
);