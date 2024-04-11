import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";


export default function AllOrders() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        getOrder();
    }, []);
    
    const getOrder = () => {
        axios.get("http://localhost:8070/order/")
        .then((res) => {
            setOrder(res.data);
            setNoResults(false);
        })
        .catch((err) => {
            alert(err.message);
        });
    };
    

    const navigate = useNavigate()

    const deleteOrder = (id) => {
        axios.delete(`http://localhost:8070/order/delete/${id}`)
        .then(() => {
            
            alert('Expense Deleted Successfully');
            navigate('/all-order');
            
            // Remove the deleted expense from the state to update UI
            setOrder(order.filter(order => order._id !== id));
            
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: ()=> ComponentsRef.current,
        documentTitle:"Order Report",
        onAfterPrint:()=>alert("Report Donloaded!"),

    })

    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            getOrder();  // Reset to original orders if search query is empty
            return;
        }
        const filteredOrder = order.filter(order =>
            Object.values(order).some(value =>
                value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        if (filteredOrder.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
            setOrder(filteredOrder);
        }
    };
    
    


    

    return (
        <div className='container'>

            <h1>All Orders</h1>
            <input onChange={(e) => setSearchQuery(e.target.value)}
            type='text'
            name='search'
            placeholder='Search'
            style={{float: 'right'}}
            ></input>
            <button onClick={handleSearch} style={{float: 'right'}}>Search</button>

            {noResults ? (

                <div>
                    <p>No Details</p>
                </div>
            ): (




            <div ref={ComponentsRef}>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>CustomerName</th>
                        <th>ContactNumber</th>
                        <th>Date</th>
                        <th>ProductSpecifications</th>
                        <th>OrderQuantity</th>
                        <th>DeliveryPreference</th>
                        <th>Price</th>
                        <th>View</th>
                        <th>Delete</th>
                        
                        
                        
                        {}
                    </tr>
                </thead>
                <tbody>
                    {order.map((order, index) => (
                        <tr key={order.id }>
                            <td>{index + 1}</td>
                            <td>{order.CustomerName}</td>
                            <td>{order.ContactNumber}</td>
                            <td>{order.Date}</td>
                            <td>{order.ProductSpecifications }</td>
                            <td>{order.OrderQuantity }</td>
                            <td>{order.DeliveryPreference }</td>
                            <td>{order.Price }</td>
                            <td><Link to={`/update-order/${order._id}`} className="btn btn-info">View</Link></td>
                            <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => deleteOrder(order._id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                           
                            
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            
            </div>  
            )}
            <Link to={`/order-report`} className="btn btn-info">Report</Link>
        </div>
        
    );
}
