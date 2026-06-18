import { useState } from "react";
import API from "../services/api";

function CompanySettings() {
  const [formData, setFormData] = useState({
    companyName: "",
    gstin: "",
    address: "",
    mobile: "",
    email: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveCompany = async () => {
    try {
      await API.post("/company", formData);
      alert("Company Details Saved");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Company Settings</h2>

      <input className="form-control mb-2" name="companyName" placeholder="Company Name" onChange={handleChange} />
      <input className="form-control mb-2" name="gstin" placeholder="GSTIN" onChange={handleChange} />
      <textarea className="form-control mb-2" name="address" placeholder="Address" onChange={handleChange}></textarea>
      <input className="form-control mb-2" name="mobile" placeholder="Mobile" onChange={handleChange} />
      <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
      <input className="form-control mb-2" name="bankName" placeholder="Bank Name" onChange={handleChange} />
      <input className="form-control mb-2" name="accountNumber" placeholder="Account Number" onChange={handleChange} />
      <input className="form-control mb-2" name="ifsc" placeholder="IFSC Code" onChange={handleChange} />

      <button className="btn btn-primary" onClick={saveCompany}>
        Save Company Details
      </button>
    </div>
  );
}

export default CompanySettings;