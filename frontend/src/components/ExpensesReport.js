import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import './ExpensesReport.css';


export default function ExpensesReport() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        function getExpenses() {
            axios.get("http://localhost:8070/expenses/").then((res) => {
                setExpenses(res.data);
                
            }).catch((err) => {
                alert(err.message);
            });
        }
        getExpenses();
    }, []);

    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: ()=> ComponentsRef.current,
        documentTitle:"Expenses Report",
        onAfterPrint:()=>alert("Report Downloaded!"),
    });

    // Calculate the total amount
    const totalAmount = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);

   
    return (
        <div className='container report-container'> 
        <div ref={ComponentsRef} className="report-content">
       
        <img src="/logo.png" alt="logo" style={{ height: '50px', width: '140px', float: 'left' }} /><br/>


            <h1 className="text-center mb-4" align="middle">Expenses</h1>
            
            <table className="table table-striped">
                <thead className="thead-dark"> 
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount (Rs.)</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
                {expenses.map((expense, index) => (
                        <tr key={expense.id }>
                            <td>{index + 1}</td>
                            <td>{expense.category}</td>
                            <td>{expense.date}</td>
                            <td>{expense.description }</td>
                            <td>{expense.amount}</td>
                            

                           
                            
                            
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
