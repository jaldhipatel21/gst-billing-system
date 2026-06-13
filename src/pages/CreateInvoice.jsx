import { useState } from "react";

function CreateInvoice() {
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [rate, setRate] = useState("");
  const [gst, setGst] = useState("18");

  const addItem = () => {
    if (!product || !qty || !rate) return;

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

  return (
    <div className="container mt-4">
      <h2>GST Invoice</h2>

      <div className="row">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
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

      <hr />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>GST%</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.qty}</td>
              <td>{item.rate}</td>
              <td>{item.gst}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end">
        <h5>Subtotal: ₹{subtotal}</h5>
        <h5>GST: ₹{gstAmount.toFixed(2)}</h5>
        <h4>Total: ₹{grandTotal.toFixed(2)}</h4>
      </div>
    </div>
  );
}

export default CreateInvoice;