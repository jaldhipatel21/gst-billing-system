import { useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [hsn, setHsn] = useState("");
  const [gst, setGst] = useState("");
  const [rate, setRate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      hsn,
      gst,
      rate,
    };

    setProducts([...products, newProduct]);

    setName("");
    setHsn("");
    setGst("");
    setRate("");
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="HSN Code"
          value={hsn}
          onChange={(e) => setHsn(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="GST %"
          value={gst}
          onChange={(e) => setGst(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <button className="btn btn-success">
          Save Product
        </button>
      </form>

      <hr />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>HSN</th>
            <th>GST%</th>
            <th>Rate</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.hsn}</td>
              <td>{product.gst}</td>
              <td>{product.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;