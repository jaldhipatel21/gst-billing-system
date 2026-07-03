import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditInvoice() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [invoiceNo, setInvoiceNo] = useState("");

    const [customerName, setCustomerName] = useState("");

    const [customerGST, setCustomerGST] = useState("");

    const [items, setItems] = useState([]);

    useEffect(() => {

        fetchInvoice();

    }, []);


    const fetchInvoice = async () => {

        try{

            const res = await API.get(

                `/invoices/${id}`

            );

            const invoice = res.data;


            setInvoiceNo(
                invoice.invoiceNo
            );

            setCustomerName(
                invoice.customerName
            );

            setCustomerGST(
                invoice.customerGST
            );

            setItems(
                invoice.items
            );

        }

        catch(error){

            console.log(error);

        }

    };


    const updateInvoice = async () => {

        try{

            const subtotal = items.reduce(

                (sum,item)=>

                    sum + item.amount,

                0

            );


            const gstAmount = items.reduce(

                (sum,item)=>

                    sum +

                    (item.amount*

                    Number(item.gst))/100,

                0

            );


            const grandTotal =

                subtotal +

                gstAmount;



            await API.put(

                `/invoices/${id}`,

                {

                    invoiceNo,

                    customerName,

                    customerGST,

                    items,

                    subtotal,

                    gstAmount,

                    grandTotal

                }

            );


            alert(

                "Invoice Updated"

            );


            navigate(

                "/invoice-history"

            );

        }

        catch(error){

            console.log(error);

        }

    };
    return(
<div className="container mt-4">
<h2>
Edit Invoice
</h2>
<div className="card p-4">
<input
className="form-control mb-3"
value={customerName}
onChange={(e)=>
setCustomerName(
e.target.value
)
}
/>
<input
className="form-control mb-3"
value={customerGST}
onChange={(e)=>
setCustomerGST(
e.target.value
)
}
/>
<table className="table">
<thead>
<tr>
<th>
Product
</th>
<th>
Qty
</th>
<th>
Rate
</th>
<th>
GST
</th>
</tr>
</thead>
<tbody>
{
items.map(
(item,index)=>(
<tr key={index}>
<td>
{item.product}
</td>
<td>
<input
type="number"
className="form-control"
value={item.qty}
onChange={(e)=>{
const updated=[...items];
updated[index].qty=
e.target.value;
updated[index].amount=
updated[index].qty*
updated[index].rate;
setItems(
updated
);
}}
/>
</td>
<td>
<input
type="number"
className="form-control"
value={item.rate}
onChange={(e)=>{
const updated=[...items];
updated[index].rate=
e.target.value;
updated[index].amount=
updated[index].qty*
updated[index].rate;
setItems(
updated
);
}}
/>
</td>
<td>
{item.gst}%
</td>
</tr>
)
)
}
</tbody>
</table>
<button
className="btn btn-success"
onClick={updateInvoice}
>
Update Invoice
</button>
</div>
</div>
    )
}

export default EditInvoice;