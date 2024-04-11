import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import './OrderReport.css';


export default function OrderReport() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        function getOrder() {
            axios.get("http://localhost:8070/order/").then((res) => {
                setOrder(res.data);
                
            }).catch((err) => {
                alert(err.message);
            });
        }
        getOrder();
    }, []);

    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: ()=> ComponentsRef.current,
        documentTitle:"Order Report",
        onAfterPrint:()=>alert("Report Downloaded!"),
    });

    // Calculate the total amount
    const totalAmount = order.length > 0 ? order.reduce((acc, order) => acc + Number(order.Price), 0) : 0;

   
    return (
        <div className='container report-container'> 
        <div ref={ComponentsRef} className="report-content">
       
        <img src="/logo.png" alt="logo" style={{ height: '50px', width: '140px', float: 'left' }} /><br/>


            <h1 className="text-center mb-4" align="middle">Expenses</h1>
            
            <table className="table table-striped">
                <thead className="thead-dark"> 
                    <tr>
                    <th>#</th>
                        <th>CustomerName</th>
                        <th>ContactNumber</th>
                        <th>Date</th>
                        <th>ProductSpecifications</th>
                        <th>OrderQuantity</th>
                        <th>DeliveryPreference</th>
                        <th>Price</th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
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
                            
                        </tr>
                    ))}
                <tfoot><br/>
                    <tr>
                        <td colSpan="4" className="text-right font-weight-bold">Total Amount:</td>
                        <td>{totalAmount}</td>
                    </tr>
                </tfoot>
            </table>
            
        </div>  
        <button onClick={handlePrint} className="btn btn-primary mt-2">Download</button> {/* Bootstrap button styling */}
    </div>
);
}
