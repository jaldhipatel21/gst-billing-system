import { useState, useEffect } from "react";
import API from "../services/api";

function Company() {

    const [companyName, setCompanyName] = useState("");
    const [gstin, setGstin] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifsc, setIfsc] = useState("");

    useEffect(() => {
        fetchCompanyDetails();
    }, []);

    const fetchCompanyDetails = async () => {
        try {
            const res = await API.get("/company");
            
            if (res.data) {
                setCompanyName(res.data.companyName || "");
                setGstin(res.data.gstin || "");
                setAddress(res.data.address || "");
                setMobile(res.data.mobile || "");
                setEmail(res.data.email || "");
                setBankName(res.data.bankName || "");
                setAccountNumber(res.data.accountNumber || "");
                setIfsc(res.data.ifsc || "");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const saveCompany = async () => {
        try{
            await API.post("/company", {
                companyName,
                gstin,
                address,
                mobile,
                email,
                bankName,
                accountNumber,
                ifsc
            });
            alert("Company details saved successfully!");
        }
        catch(error){
            console.log(error);
            alert("Failed to save company details.");
        }
    };
    return(
        <div className="container mt-4">
            <h2>Company Details</h2>
            <div className="card p-4 shadow">
                <input
                className="form-control mb-3"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                className="form-control mb-3"
                placeholder="GSTIN"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                />
                <textarea
                className="form-control mb-3"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
                <input
                className="form-control mb-3"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                />
                <input
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                className="form-control mb-3"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                />
                <input
                className="form-control mb-3"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                />
                <input
                className="form-control mb-3"
                placeholder="IFSC"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                />
                <button className="btn btn-primary" onClick={saveCompany}>Save</button>
            </div>
        </div>
    )
}

export default Company;