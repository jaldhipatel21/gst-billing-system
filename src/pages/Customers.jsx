import { useState, useEffect } from "react";
import API from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/customers", {
        name,
        gstNumber,
        address,
      });

      setName("");
      setGstNumber("");
      setAddress("");

      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
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
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
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
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.gstNumber}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;