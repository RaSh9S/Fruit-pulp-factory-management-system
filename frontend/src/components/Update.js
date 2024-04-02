import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {


    const {id} = useParams();

    const [values, setValues] = useState({
        category: '',
        date: '',
        amount: '',
        description: ''
      });
      

      useEffect(() => {
        axios.get(`http://localhost:8070/expenses/get/${id}`)
          .then(res => {
            const expenseData = res.data.Expenses;
            setValues({
              category: expenseData.category || '',
              date: expenseData.date || '',
              amount: expenseData.amount || '',
              description: expenseData.description || ''
            });
          })
          .catch(err => console.log(err));
      }, [id]);
      
       const navigate = useNavigate()

      const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/expenses/update/${id}`, values)
          .then(res => {
            navigate('/');
          })
          .catch(err => console.log(err));
      }

    return (
        <div className='container'>
    <form onSubmit={handleSubmit}>
        
      <div className="mb-3">
        <label htmlFor="Category">Category</label>
        <input
            type="text"
            className="form-control"
            id="category"
            placeholder='Category'
            value={values.category}
            onChange={(e) => setValues({...values, category: e.target.value })}
            />
        
      </div>
      <div className="mb-3">
        <label htmlFor="Date">Date</label>
        <input type="text" className="form-control" id="date" placeholder='Date'
        value={values.date}
        onChange={(e) => setValues({...values, date: e.target.value })}
        />
        
      </div>

      <div className="mb-3">
        <label htmlFor="Amount">Amount</label>
        <input type="text" className="form-control" id="amount" placeholder='Amount'
        value={values.amount}
        onChange={(e) => setValues({...values, amount: e.target.value })}
        
       
        />
        
      </div>

      <div className="mb-3">
        <label htmlFor="Description">Description</label>
        <input type="text" className="form-control" id="description" placeholder='Description'
        value={values.description}
        onChange={(e) => setValues({...values, description: e.target.value })}
       
        />
        
      </div>
     
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
    </div>
    );
}

export default Update;
