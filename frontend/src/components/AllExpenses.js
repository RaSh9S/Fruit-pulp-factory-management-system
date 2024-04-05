import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";


export default function AllExpenses() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        getExpenses();
    }, []);
    
    const getExpenses = () => {
        axios.get("http://localhost:8070/expenses/")
        .then((res) => {
            setExpenses(res.data);
        })
        .catch((err) => {
            alert(err.message);
        });
    };
    

    const navigate = useNavigate()

    const deleteExpense = (id) => {
        axios.delete(`http://localhost:8070/expenses/delete/${id}`)
        .then(() => {
            
            alert('Expense Deleted Successfully');
            navigate('/');
            
            // Remove the deleted expense from the state to update UI
            setExpenses(expenses.filter(expense => expense.id !== id));
            
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: ()=> ComponentsRef.current,
        documentTitle:"Expenses Report",
        onAfterPrint:()=>alert("Report Donloaded!"),

    })

    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {
        const filteredExpenses = expenses.filter(expense =>
            Object.values(expense).some(value =>
                value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        if (filteredExpenses.length === 0) {
            setNoResults(true);
        } else {
            setExpenses(filteredExpenses);
        }
    };
    


    

    return (
        <div className='container'>

            <h1>All Expenses</h1>
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
                        <th>Category</th>
                        <th>Date</th>
                        <th>Amount (Rs.)</th>
                        <th>Description</th>
                        <th>View</th>
                        <th>Delete</th>
                        
                        
                        
                        {}
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={expense.id }>
                            <td>{index + 1}</td>
                            <td>{expense.category}</td>
                            <td>{expense.date}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.description }</td>
                            <td><Link to={`/update/${expense._id}`} className="btn btn-info">View</Link></td>
                            <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => deleteExpense(expense._id)}
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
            <Link to={`/report`} className="btn btn-info">Report</Link>
        </div>
        
    );
}
