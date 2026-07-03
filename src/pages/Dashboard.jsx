import { Link } from "react-router-dom";
import { useEffect, useState} from "react";
import API from "../services/api";
function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [sales,setSales]=useState(0);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [monthlySales, setMonthlySales] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const customerRes = await API.get("/customers");
        const productRes = await API.get("/products");
        const invoiceRes = await API.get("/invoices");

        setCustomerCount(customerRes.data.length);
        setProductCount(productRes.data.length);
        setInvoiceCount(invoiceRes.data.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
   
    fetchCounts();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const invoices = await API.get("/invoices");
      const customers = await API.get("/customers");
      const products = await API.get("/products");
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const monthly = invoices.data.filter(
        invoice => {
          const date = new Date(invoice.createdAt);
          return(date.getMonth() === month && date.getFullYear() === year);
        }
      );

      const totalMonth = monthly.reduce((sum, item) => sum + item.grandTotal, 0);
      setMonthlySales(totalMonth);

      setInvoiceCount(invoices.data.length);
      setCustomerCount(customers.data.length);
      setProductCount(products.data.length);

      const total = invoices.data.reduce((sum, item)=> sum + item.grandTotal, 0);
      setSales(total);

      setRecentInvoices(invoices.data.slice(0, 5));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold">GAJANAND Packaging</h1>
      <h1>GST Billing System</h1>

    
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card p-3">
            <h3>Customers</h3>
            <Link to="/customers" className="btn btn-primary">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h3>Products</h3>
            <Link to="/products" className="btn btn-primary">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h3>Create Invoice</h3>
            <Link to="/invoice" className="btn btn-primary">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h3>Company</h3>
            <Link to="/company" className="btn btn-primary">
            Open
            </Link>
          </div>
        </div>

        <div className="col-md-3 mt-4">
          <div className="card p-3">
            <h3>GST Reports</h3>
            <Link to="/gst-reports" className="btn btn-success">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-3 mt-4">
          <div className="card p-3 shadow">
            <h3>TotalSales</h3>
            <p>₹{sales.toFixed(2)}</p>
          </div>
        </div>

        <div className="col-md-3 mt-4">
          <div className="card p-3 shadow">
            <h3>Invoices</h3>
            <p>{invoiceCount}</p>
          </div>
        </div>

        <div className="col-md-3 mt-4">
          <div className="card p-3 shadow">
             <h3>Invoice History</h3>
            <Link to="/invoice-history" className="btn btn-warning
            ">
             invoice History
            </Link>
          </div>
        </div>

        <div className="card mt-4 shadow">
          <div className="card-header">
            <h3>Recent Invoices</h3>  
          </div>          
        </div>

        <div className="col-md-3 mt-4">
          <div className="card p-3 shadow">
            <h5>This Month</h5>
            <p>₹{monthlySales}</p>
          </div>
        </div>

        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>   
            </thead>
            <tbody>
              {
                recentInvoices.map((invoice)=>(
                  <tr key={invoice._id}>
                    <td>{invoice.invoiceNo}</td>
                    <td>{invoice.customerName}</td>
                    <td>₹{invoice.grandTotal}</td>
                    <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;