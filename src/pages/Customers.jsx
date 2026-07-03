import { useState, useEffect } from "react";
import API from "../services/api";

function Customers() {

    const [name, setName] = useState("");
    const [gstin, setGstin] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        fetchCustomers();
    }, []);


    const fetchCustomers = async () => {

        try {

            const res = await API.get("/customers");

            setCustomers(res.data);

        }
        catch (error) {

            console.log(error);

        }

    };


    const saveCustomer = async () => {

        try {

            const customerData = {

                name,
                gstin,
                address,
                state,
                email,
                phone

            };


            await API.post(
                "/customers",
                customerData
            );


            alert("Customer Added Successfully");


            setName("");
            setGstin("");
            setAddress("");
            setState("");
            setEmail("");
            setPhone("");


            fetchCustomers();


        }
        catch (error) {

            console.log(error);

            alert("Failed to Add Customer");

        }

    };



    return (

        <div className="container mt-4">

            <h2>Customers</h2>


            <div className="card p-4 mb-4">


                <div className="row">


                    <div className="col-md-6 mb-3">

                        <input
                            className="form-control"
                            placeholder="Customer Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>



                    <div className="col-md-6 mb-3">

                        <input
                            className="form-control"
                            placeholder="GSTIN"
                            value={gstin}
                            onChange={(e) =>
                                setGstin(e.target.value)
                            }
                        />

                    </div>



                    <div className="col-md-12 mb-3">

                        <input
                            className="form-control"
                            placeholder="Address"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                        />

                    </div>



                    <div className="col-md-6 mb-3">

                        <input
                            className="form-control"
                            placeholder="State"
                            value={state}
                            onChange={(e) =>
                                setState(e.target.value)
                            }
                        />

                    </div>



                    <div className="col-md-6 mb-3">

                        <input
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>



                    <div className="col-md-6 mb-3">

                        <input
                            className="form-control"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                        />

                    </div>



                </div>



                <button
                    className="btn btn-success"
                    onClick={saveCustomer}
                >

                    Save Customer

                </button>


            </div>




            <table className="table table-bordered">


                <thead className="table-light">

                    <tr>

                        <th>Name</th>
                        <th>GSTIN</th>
                        <th>State</th>
                        <th>Phone</th>

                    </tr>

                </thead>



                <tbody>

                    {

                        customers.map((customer) => (

                            <tr key={customer._id}>


                                <td>
                                    {customer.name}
                                </td>


                                <td>
                                    {customer.gstin}
                                </td>


                                <td>
                                    {customer.state}
                                </td>


                                <td>
                                    {customer.phone}
                                </td>


                            </tr>
                        ))
                    }
                </tbody>
            </table>
       </div>
    );
}
export default Customers;