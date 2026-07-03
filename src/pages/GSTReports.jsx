import { useEffect, useState } from "react";
import API from "../services/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function GSTReports(){

const [invoices,setInvoices]=useState([]);
const [fromDate,setFromDate]=useState("");
const [toDate,setToDate]=useState("");
useEffect(()=>{
fetchInvoices();
},[]);

const exportExcel = ()=>{
const excelData = filteredInvoices.map(
invoice=>({
InvoiceNo:invoice.invoiceNo,
Customer:invoice.customerName,
GSTIN:invoice.customerGST,
Taxable:invoice.subtotal,
GST:invoice.gstAmount,
Total:invoice.grandTotal,

Date:new Date(
invoice.createdAt
).toLocaleDateString()
})
);

const worksheet =
XLSX.utils.json_to_sheet(
excelData
);

const workbook =
XLSX.utils.book_new();
XLSX.utils.book_append_sheet(
workbook,
worksheet,
"GST Report"
);
const excelBuffer =
XLSX.write(
workbook,
{
bookType:"xlsx",
type:"array"
}
);
const file = new Blob(
[excelBuffer],
{
type:
"application/octet-stream"
}
);
saveAs(
file,
"GST_Report.xlsx"
);
};

const fetchInvoices = async()=>{
try{
const res = await API.get("/invoices");
setInvoices(res.data);
}
catch(error){
console.log(error);
}
};
const totalTaxable = invoices.reduce(
(sum,item)=>
sum+item.subtotal,
0
);

const totalGST = invoices.reduce(
(sum,item)=>
sum+item.gstAmount,
0
);
const grandTotal = invoices.reduce(
(sum,item)=>
sum+item.grandTotal,
0
);


const cgst = totalGST/2;

const sgst = totalGST/2;

const filterInvoice = invoices.filter(invoice=>{
    const date = new Date(invoice.createdAt);

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if(from && date < from) return false;
    if(to && date > to) return false;

    return true;
});

return(
<div className="container mt-4">

<h2>GST Reports</h2>
<div className="row mb-3">
    <div className="col-md-3">
        <input type="date" className="form-control" value={fromDate} onChange={(e)=>setFromDate(e.target.value)}/>
    </div>
    <div className="col-md-3">
        <input type="date" className="form-control" value={toDate} onChange={(e)=>setToDate(e.target.value)}/>
    </div>
</div>

<div className="row mb-3">
<div className="col-md-4">
<div className="card p-3">
<h5>Taxable Value</h5>
<h3>
₹{totalTaxable.toFixed(2)}
</h3>
</div>
</div>

<div className="col-md-4">
<div className="card p-3">
<h5>GST</h5>
<h3>
₹{totalGST.toFixed(2)}
</h3>
</div>
</div>

<div className="row mt-4">
<div className="col-md-4">
<div className="card p-3 shadow">
<h5>CGST</h5>
<h3>₹{cgst.toFixed(2)}</h3>
</div>
</div>

<div className="col-md-4">
<div className="card p-3 shadow">
<h5>SGST</h5>
<h3>₹{sgst.toFixed(2)}</h3>
</div>
</div>

<div className="col-md-4">
<div className="card p-3 shadow">
<h5>Total GST</h5>
<h3>₹{totalGST.toFixed(2)}</h3>
</div>
</div>
</div>

<div className="col-md-4">
<div className="card p-3">
<h5>Total Sales</h5>
<h3>
₹{grandTotal.toFixed(2)}
</h3>
</div>
</div>
</div>

<table className="table table-bordered">

<thead>

<tr>
<th>Invoice</th>
<th>Customer</th>
<th>Taxable</th>
<th>GST</th>
<th>Total</th>
</tr>
</thead>

<tbody>
{
filterInvoice.map(invoice=>(
<tr key={invoice._id}>
<td>{invoice.invoiceNo}</td>
<td>{invoice.customerName}</td>
<td>₹{invoice.subtotal}</td>
<td>₹{invoice.gstAmount}</td>
<td>₹{invoice.grandTotal}</td>
</tr>
))
}
</tbody>
<tfoot>
<tr>
<th colSpan="2">
Total
</th>
<th>
₹{totalTaxable.toFixed(2)}
</th>
<th>
₹{totalGST.toFixed(2)}
</th>
<th>
₹{grandTotal.toFixed(2)}
</th>
</tr>
</tfoot>
</table>

<div className="mb-3">
<button
className="btn btn-success"
onClick={exportExcel}
>
Export Excel
</button>
</div>

</div>
)
}
export default GSTReports;