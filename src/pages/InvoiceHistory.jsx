import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function InvoiceHistory() {

    const [invoices, setInvoices] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const res = await API.get(
                "/invoices"
            );
            setInvoices(res.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const deleteInvoice = async (id) => {
        const confirmDelete = window.confirm(
            "Delete Invoice ?"
        );
        if (!confirmDelete) return;
        try {
            await API.delete(
                `/invoices/${id}`
            );
            fetchInvoices();
        }
        catch (error) {
            console.log(error);
        }
    };

    const filteredInvoices = invoices.filter(
        invoice =>
            invoice.invoiceNo
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    );

    return (
        <div className="container mt-4">
            <h2>
                Invoice History
            </h2>
            <input
                className="form-control mb-3"
                placeholder="Search Invoice"
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
            />
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Invoice No</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredInvoices.map(
                            invoice => (
                                <tr
                                    key={invoice._id}
                                >
                                    <td>{invoice.invoiceNo}</td>
                                    <td>{invoice.customerName}</td>
                                    <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                                    <td>₹{invoice.grandTotal}</td>
                                    <td><button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => {
                                             navigate(`/invoice/${invoice._id}`);
                                            }}
                                        >
                                            View
                                        </button>

                                     <button
                                        className="btn btn-warning btn-sm ms-2 me-2"
                                        onClick={()=>navigate(
                                            `/edit-invoice/${invoice._id}`
                                        )
                                        }>
                                            Edit
                                        </button>
                                        
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() =>navigate(`/invoice/${invoice._id}?print=true`)
                                            }
                                        >
                                            Print
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm me-2"
                                            onClick={() =>
                                                deleteInvoice(
                                                    invoice._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default InvoiceHistory;