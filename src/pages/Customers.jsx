import { useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [gst, setGst] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = {
      name,
      gst,
      address,
    };

    setCustomers([...customers, newCustomer]);

    setName("");
    setGst("");
    setAddress("");
  };

  return (
    <div className="container mt-5">
      <h2>Add Customer</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>GST Number</label>
          <input
            type="text"
            className="form-control"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Customer
        </button>
      </form>

      <hr />

      <h3>Customer List</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>GST Number</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.gst}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;