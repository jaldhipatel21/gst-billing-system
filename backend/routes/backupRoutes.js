const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
});
const upload = multer({storage});
const Invoice = require("../models/Invoice");
const Customer = require("../models/Customer");
const Product = require("../models/Product");

// ====================
// Backup Database
// ====================
router.get("/",authMiddleware,roleMiddleware("admin"),async (req, res)=> {
    try {
        const invoices = await Invoice.find();
        const customers = await Customer.find();
        const products = await Product.find();
        const backupData = {
            invoices,
            customers,
            products
        };
        fs.writeFileSync(
            "backup.json",
            JSON.stringify(
                backupData,
                null,
                2
            )
        );
        res.download(
            "backup.json"
        );
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});
// =====================
// Restore Database
// =====================
router.post("/restore", authMiddleware, roleMiddleware("admin"), upload.single("backup"), async (req, res) => {

    console.log("req.file =>");
    console.log(req.file);

    console.log("req.body =>");
    console.log(req.body);

try{
const data = JSON.parse(
fs.readFileSync(
req.file.path,
"utf-8"
)
);
res.json({
message:"Backup File Loaded",
data
});
}
catch(error){
res.status(500).json({
message:error.message
});
}
}
);
module.exports = router;