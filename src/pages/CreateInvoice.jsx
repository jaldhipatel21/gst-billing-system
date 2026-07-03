import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {toWords} from "number-to-words";

function CreateInvoice() {
    const navigate = useNavigate();

    const [invoiceNo, setInvoiceNo] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [customerGST, setCustomerGST] = useState("");
    const [company,setCompany] = useState(null);
    const [items, setItems] = useState([]);
    const [product, setProduct] = useState("");
    const [qty, setQty] = useState("");
    const [rate, setRate] = useState("");
    const [gst, setGst] = useState("18");
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [products,setProducts]=useState([]);
    const [selectedProduct,setSelectedProduct]=useState("");
    const [hsn,setHsn]=useState("");

    useEffect(() => {
        fetchInvoiceNumber();
        fetchCustomers();
        fetchProducts();
    }, []);
    const fetchInvoiceNumber = async () => {
        try {
            const res = await API.get(
                "/invoices/next-number"
            );
            setInvoiceNo(
                res.data.invoiceNo
            );
        }
        catch (error) {
            console.log(error);
        }
    };
    const fetchCustomers = async () => {
    try {
        const res = await API.get("/customers");
        setCustomers(res.data);
    }
    catch (error) {
        console.log(error);
    }
};
const fetchProducts = async()=>{

try{

const res =
await API.get("/products");


setProducts(
res.data
);


}
catch(error){

console.log(error);

}

}
const handleProductChange = (id) => {
    setSelectedProduct(id);
    const product = products.find(
        p=>p._id===id
    );
    if(product){
        setProduct(product.name);
        setRate(product.rate);
        setGst(product.gst);
        setHsn(product.hsn);
    }
}
    const fetchCompany = async () => {
        try {
            const res = await API.get(
                "/company"
            );
            setCompany(
                res.data
            );
        }
        catch (error) {
            console.log(error);
        }
    };
    fetchCompany();
const handleCustomerChange = (id) => {
    setSelectedCustomer(id);
    const customer = customers.find(
        c => c._id === id
    );
    if (customer) {
        setCustomerName(customer.name);
        setCustomerGST(customer.gstin);
        setCustomerAddress(customer.address);
    }
};
    const addItem = () => {
        if (!product || !qty || !rate) {
            alert("Please fill all product details");
            return;
        }
       const amount =
            Number(qty) * Number(rate);
        const newItem = {
            product,
            hsn,
            qty,
            rate,
            gst,
            amount
        };
        setItems([
            ...items,
            newItem
        ]);
        setProduct("");
        setQty("");
        setRate("");
        setGst("18");
    };
    const subtotal = items.reduce(
        (sum, item) => sum + item.amount,
        0
    );
    const gstAmount = items.reduce(
        (sum, item) =>
            sum +
            (item.amount * Number(item.gst)) / 100,
        0
    );
    const grandTotal =
        subtotal + gstAmount;
    const amountInWords = toWords(Math.round(grandTotal));
    const saveInvoice = async () => {
    try {

        const invoiceData = {
            invoiceNo,
            customerName,
            customerGST,
            items,
            subtotal,
            gstAmount,
            grandTotal
        };

        const res = await API.post(
            "/invoices",
            invoiceData
        );

        alert("Invoice Saved Successfully");

        // Open the saved invoice
        navigate(`/invoice/${res.data.invoice._id}`);

    }
    catch (error) {

        console.log(error);

        alert("Failed to save invoice");

    }
};
    return (
        <div className="container mt-4">
            <div className="card p-4 mb-4"
            style={{border:"2px solid black"}}
            >
                <h2 className="text-center fw-bold">
                    TAX INVOICE
                </h2>
{/*------------ START CHATGPT============ */}
{/* <div className="row">
  <div className="col-md-6">

                <h4>{company?.companyName}</h4>
                <p>{company?.address}</p>
                <p>  GSTIN :{company?.GSTIN}</p>
                </div>

                <div className="col-md-6 text-end">
                <p> Invoice : {invoiceNo}</p>
                <p> Date : {new Date().toLocaleDateString()}</p>

  </div>
</div>

<hr/> */}
{/* END GPT---------------------------- */}
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h4>GAJANAND PACKAGING</h4>
                    <p>PLOT NO-46,PARTH INDUSTRIAL PARK</p>
                    <p>SADRA,KADI-382715</p>
                    <p>GUJRAT</p>
                    <p><b>GSTIN/UIN: 24AAWFG2538F1Z9</b></p>
                    <p><b>State Name: Gujrat,Code:24</b></p>
                   </div>
                  <div className="col-md-6 text-end">
                      <p><strong>Invoice :</strong> {invoiceNo}</p>
                      <p><strong>Date :</strong> {new Date().toLocaleDateString()}</p>
                      <p><strong>VENDOR CODE </strong><input type="text" placeholder="Vendor Code" /></p>
                      <p><strong>Other Reference(s) </strong><input type="text" 
                       placeholder="Other References" /></p>
                  </div>
                </div>
                <hr />
                <h5 className="mt-3">Buyer Details</h5>
                <hr/>
                <div className="row">
                    <div className="col-md-6 mb-2">
                      Name
                        {/* <input */}
                         <select
                            className="form-select"
                            value={selectedCustomer}
                            onChange={(e)=>
                                handleCustomerChange(e.target.value)
                            }  
                            >
                            <option value="">
                                Select Customer
                            </option>
                              {
                                customers.map((customer) => (
                                    <option key={customer._id} value={customer._id}>
                                        {customer.name}
                                    </option>
                                ))
                              }
                            </select>                   
                        </div>
                        <div className="col-md-6 mb-2">
                       GSTIN/UN <input
                            className="form-control"
                            placeholder="Customer GST No"
                            value={customerGST}
                            onChange={(e) =>
                                setCustomerGST(
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className="col-md-6 mb-2">
                      Address<input
                            className="form-control"
                            placeholder="Customer Address"
                            value={ customerAddress}
                           readOnly
                        />
                    </div>
                   </div>
            </div>
            <input
            className="form-control"
            placeholder="HSN"
            value={hsn}
            readOnly
            />
            <div className="row mt-4">
                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={selectedProduct}
                        onChange={(e) =>
                            handleProductChange(
                                e.target.value
                            )
                        }
                    >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                            <option
                                key={product._id}
                                value={product._id}
                            >
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Qty"
                        value={qty}
                        onChange={(e) =>
                            setQty(
                                e.target.value
                            )
                        }
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Rate"
                        value={rate}
                        onChange={(e) =>
                            setRate(
                                e.target.value
                            )
                        }
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        value={gst}
                        onChange={(e) =>
                            setGst(
                                e.target.value
                            )
                        }
                    />
                </div>
                <div className="col-md-3">
                    <button
                        className="btn btn-primary w-100"
                        onClick={addItem}
                    >
                        Add Item
                    </button>
                </div>
            </div>
            <table className="table table-bordered mt-4">
               <thead className="table-light">
                <tr>
                <th>Sr</th>
                <th>Product</th>
                <th>HSN</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>GST</th>
                <th>Amount</th>
                <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.product}</td>
                                <td>{item.hsn}</td>
                                <td>{item.qty}</td>
                                <td>₹{item.rate}</td>
                                <td>{item.gst}%</td>
                                <td>₹{item.amount}</td>
                                <td>
                                    <button
                                       className="btn btn-danger btn-sm"
                                        onClick={() => {
                                            const updatedItems =
                                                items.filter(
                                                    (_, i) =>

                                                        i !== index

                                                );
                                            // setItems(
                                            //     updatedItems
                                            // );
                                            setSelectedProduct("");
                                            setHsn("");
                                            setProduct("");
                                            setQty("");
                                            setRate("");
                                            setGst("18");
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
           <div className="text-end">
                <h5> Subtotal : ₹{subtotal.toFixed(2)}</h5>
                <h5> CGST : ₹{(gstAmount/2).toFixed(2)}</h5>
                <h5>SGST : ₹{(gstAmount/2).toFixed(2)}</h5>
                <h4>Grand Total : ₹{grandTotal.toFixed(2)}</h4>
            </div>
            <div className="mt-3">

<strong>

Amount in Words :

</strong>

<br/>

{amountInWords}

Rupees Only

</div>
    <hr/>
            <h5>Bank Details</h5>
            <p>Bank : HDFC Bank</p>
            <p>A/C : XXXXX1234</p>
            <p>IFSC : HDFC0001234</p>
            
    <hr/>
        <h5>Terms & Conditions</h5>

        <p>1. Goods once sold cannot be returned.</p>
        <p>2. bill payment in 3 months.</p>
        <div className="text-end">
        <h5>Authorized Signatory</h5>
        </div>
            <div className="mt-3 d-flex gap-2">
                <button
                    className="btn btn-primary"
                    onClick={saveInvoice}
                >
                    Save Invoice
                </button>
            </div>
        </div>
    );
}
export default CreateInvoice;