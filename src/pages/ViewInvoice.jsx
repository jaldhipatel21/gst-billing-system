import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation } from "react-router-dom";
import "../styles/print.css";
import "../styles/invoice.css"

function ViewInvoice() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [company, setCompany] = useState(null);
    const location = useLocation();

    const fetchInvoice = async () => {
        try{
            const res = await API.get(
                `/invoices/${id}`
            );

            console.log("Invoice Response");
            console.log(res.data);

           setInvoice(res.data);
        }
        catch(error){
            console.log(error);
        }
    };
    // if(!invoice || !company){
    //     return <h3>Loading...</h3>
    // }

    const fetchCompany = async () => {
        try {
            const res = await API.get("/company");
            
             console.log("Company Response");
             console.log(res.data);

            setCompany(res.data);
        }
        catch(error){
            console.log(error);
        }
    };

    const downloadPDF = async () => {
        const printArea = document.getElementById(
            "print-area"
        );
        const canvas = await html2canvas(
            printArea,
            {
                scale: 2
            }
        );
        const imgData = canvas.toDataURL(
            "image/png"
        );
        const pdf = new jsPDF(
            "p",
            "mm",
            "a4"
        );
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth)
        /canvas.width;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight
        );
        pdf.save(`${invoice.invoiceNo}.pdf`);
    }

    useEffect(() => {
        fetchInvoice();
        fetchCompany();
    }, []);

    useEffect(() => {
        if (location.search === "?print=true") {
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }, [location]);

    console.log("Invoice State");
    console.log(invoice);
    
    console.log("Company State");
    console.log(company);
    
    
    if(!invoice || !company){
    
    return <h3>Loading...</h3>
    
    }

    return(
<div className="invoice-box" id="print-area">
    <div className="text-center mb-4">

        <h2>TAX INVOICE</h2>

    </div>

    <div className="invoice-header">

        <div>

            <h3 className="company-name">
                {company.companyName}
                {/* GAJANAND PACKAGING */}
            </h3>
            {company.address}
            {/* PLOT NO-46,PARTH INDUSTRIAL PARK
            SADRA,KADI-382715
            GUJRAT */}
            <br/>

            GSTIN :{company.gstin}
            {/* 24AAWFG2538F1Z9 */}
            <br/>
            Phone : {company.mobile}

            <br/>
            Email : {company.email}

        </div>
        <div>

            <b>Invoice No :</b>
            {invoice.invoiceNo}
            <br/>
            <b>Date :</b>
            {
                new Date(
                    invoice.createdAt
                )
                .toLocaleDateString()
            }
        </div>
    </div>
    <hr/>
<div>
    <h5>
    Buyer Details
    </h5>
    <p>
    <b>Name :</b>
    {invoice.customerName} 
    <br/>
    <b>GST :</b>
    {invoice.customerGST}
    </p>
    <hr/>
</div>
    <table className="table table-bordered">
    <thead>
    <tr>
    <th>Product</th>
    <th>HSN</th>
    <th>Qty</th>
    <th>Rate</th>
    <th>GST</th>
    <th>Amount</th>
    </tr>
    </thead>
    <tbody>
    {
    invoice.items.map((item,index)=>(
    <tr key={index}>
    <td>{item.product}</td>
    <td>{item.hsn}</td>
    <td>{item.qty}</td>
    <td>₹{item.rate}</td>
    <td>{item.gst}%</td>
    <td>₹{item.amount}</td>
    </tr>
    ))
    }
    </tbody>
    </table>
    <hr/>
<div>
    <h5>Bank Details</h5>
    Account No : {company.accountNumber}<br/>
    IFSC : {company.ifsc}<br/>
    <b>Bank :</b> {company.bankName}
</div>
<hr/>
    <div className="mt-3 d-flex align-items-end">

        <QRCodeCanvas
            value={JSON.stringify({
            Invoice: invoice.invoiceNo,
            Customer: invoice.customerName,
            Amount: invoice.grandTotal,
            })}
            size={120}
        />

        <div className="ms-auto text-end">
            <h5>Subtotal : ₹{invoice.subtotal}</h5>
            <h5>GST : ₹{invoice.gstAmount}</h5>
            <h3>Grand Total : ₹{invoice.grandTotal}</h3>
        </div> 
    </div>

    <div className="signature">
    Authorized Signatory
    </div>


    <div className="mt-3 text-center no-print">
        <button
            className="btn btn-success me-2"
            onClick={() => window.print()}
        >
            Print Invoice
        </button>
        
        <button
            className="btn btn-danger"
            onClick={downloadPDF}
        >
            Download PDF
        </button>
    </div>
   </div>
)
}
export default ViewInvoice;