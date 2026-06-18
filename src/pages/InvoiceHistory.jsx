import { useEffect, useState } from "react";
import API from "../services/api";

function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await API.get("/invoices");
      setInvoices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Invoice History</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>GST Number</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNo}</td>
              <td>{invoice.customerName}</td>
              <td>{invoice.customerGST}</td>
              <td>₹{invoice.grandTotal}</td>
              <td>
                {new Date(
                  invoice.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceHistory;