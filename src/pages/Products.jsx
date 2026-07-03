import { useState, useEffect } from "react";
import API from "../services/api";

function Products() {

    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [hsn, setHsn] = useState("");
    const [gst, setGst] = useState("");
    const [rate, setRate] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const res = await API.get("/products");

            setProducts(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const newProduct = {

                name,
                hsn,
                gst,
                rate

            };


            await API.post(
                "/products",
                newProduct
            );


            alert("Product Saved Successfully");


            setName("");
            setHsn("");
            setGst("");
            setRate("");


            fetchProducts();

        }

        catch (error) {

            console.log(error);

            alert("Failed to save product");

        }

    };



    return (

        <div className="container mt-5">

            <h2>Products</h2>


            <form onSubmit={handleSubmit}>

                <input

                    className="form-control mb-2"

                    placeholder="Product Name"

                    value={name}

                    onChange={(e) =>
                        setName(e.target.value)
                    }

                />



                <input

                    className="form-control mb-2"

                    placeholder="HSN Code"

                    value={hsn}

                    onChange={(e) =>
                        setHsn(e.target.value)
                    }

                />



                <input

                    className="form-control mb-2"

                    placeholder="GST %"

                    value={gst}

                    onChange={(e) =>
                        setGst(e.target.value)
                    }

                />



                <input

                    className="form-control mb-2"

                    placeholder="Rate"

                    value={rate}

                    onChange={(e) =>
                        setRate(e.target.value)
                    }

                />



                <button

                    className="btn btn-success"

                    type="submit"

                >

                    Save Product

                </button>


            </form>


            <hr />


            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>HSN</th>

                        <th>GST %</th>

                        <th>Rate</th>

                    </tr>

                </thead>


                <tbody>

                    {

                        products.map((product) => (

                            <tr key={product._id}>


                                <td>

                                    {product.name}

                                </td>


                                <td>

                                    {product.hsn}

                                </td>


                                <td>

                                    {product.gst}

                                </td>


                                <td>

                                    ₹{product.rate}

                                </td>


                            </tr>

                        ))

                    }

                </tbody>

            </table>


        </div>

    );

}

export default Products;