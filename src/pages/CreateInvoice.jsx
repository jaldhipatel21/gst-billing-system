import API from "../services/api";
import { useState } from "react";

function CreateInvoice() {
  const [invoiceNo] = useState("INV-001");
  const [customerName, setCustomerName] = useState("");
  const [customerGST, setCustomerGST] = useState("");

  const [items, setItems] = useState([]);
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [rate, setRate] = useState("");
  const [gst, setGst] = useState("18");

  const addItem = () => {
    if (!product || !qty || !rate) {
      alert("Please fill all product details");
      return;
    }

    const amount = Number(qty) * Number(rate);

    const newItem = {
      product,
      qty,
      rate,
      gst,
      amount,
    };

    setItems([...items, newItem]);

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
      sum + (item.amount * Number(item.gst)) / 100,
    0
  );

  const grandTotal = subtotal + gstAmount;

  const saveInvoice = async () => {
  try {
    const invoiceData = {
      invoiceNo,
      customerName,
      customerGST,
      items,
      subtotal,
      gstAmount,
      grandTotal,
    };

    await API.post("/invoices", invoiceData);

    alert("Invoice Saved Successfully!");

   } catch (error) {
    console.error(error);
    alert("Failed to save invoice");
  }
};

  return(
    <div className="container mt-4">

      <div className="card p-4 mb-4">
        <h2 className="text-center">GST Billing System</h2>

        <div className="row mt-3">
          <div className="col-md-6">
            <strong>Invoice No:</strong> {invoiceNo}
          </div>

          <div className="col-md-6 text-end">
            <strong>Date:</strong>{" "}
            {new Date().toLocaleDateString()}
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
            />
          </div>

          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Customer GST Number"
              value={customerGST}
              onChange={(e) =>
                setCustomerGST(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="GST %"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
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

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>GST %</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.qty}</td>
              <td>₹{item.rate}</td>
              <td>{item.gst}%</td>
              <td>₹{item.amount}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                    onClick={() => {
                        const updatedItems = items.filter(
                            (_, i) => i !== index
                        );
                        setItems(updatedItems);
                    }}
                  >Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end">
        <h5>Subtotal: ₹{subtotal.toFixed(2)}</h5>
        <h5>GST: ₹{gstAmount.toFixed(2)}</h5>
        <h4>Total: ₹{grandTotal.toFixed(2)}</h4>
      </div>
      <div className="mt-3 d-flex gap-2">
         <button
          className="btn btn-primary"
          onClick={saveInvoice}
        >
           Save Invoice
         </button>

      <div className="mt-3">
        <button
          className="btn btn-success"
          onClick={() => window.print()}
        >
          Print Invoice
        </button>
      </div>
    </div>
</div>
  );  
}
export default CreateInvoice;