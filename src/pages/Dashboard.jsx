import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="container mt-5">
      <h1> <ul><b>GAJANAND Packaging</b></ul></h1>
      <h1>GST Billing System</h1>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3">
            <h3>Customers</h3>
            <Link to="/customers" className="btn btn-primary">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h3>Products</h3>
            <Link to="/products" className="btn btn-primary">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h3>Create Invoice</h3>
            <Link to="/invoice" className="btn btn-primary">
              Open
            </Link>
          </div>
        </div>

        <div className="col-md-4 mt-4">
          <div className="card p-3">
             <h3>Invoice History</h3>
            <Link to="/invoice-history" className="btn btn-warning
            ">
             invoice History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;