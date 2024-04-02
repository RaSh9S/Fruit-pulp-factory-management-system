import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function AllExpenses() {
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

    const deleteExpense = (id) => {
        axios.delete(`http://localhost:8070/expenses/delete/${id}`)
        .then(response => {
            alert('Expense Deleted Successfully');
            // Remove the deleted expense from the state to update UI
            setExpenses(expenses.filter(expense => expense.id !== id));
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
    

    return (
        <div className='container'>
            <h1>All Expenses</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Edit</th>
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
                            <td><Link to={`/update/${expense._id}`} className="btn btn-info">Edit</Link></td>

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
    );
}
