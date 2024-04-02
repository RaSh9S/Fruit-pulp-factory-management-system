import React, { useState } from 'react';
import axios from "axios";

const FormComponent = () => {


    const [category, setCategory] = useState();
    const [date, setDate] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();


    function sendData(e){

        e.preventDefault();
    
        const newExpense ={
            category,
            date,
            amount,
            description
        }

        axios.post("http://localhost:8070/expenses/add" ,newExpense).then(()=>{
            alert("Expenses Added");

            setCategory("");
            setDate("");
            setAmount("");
            setDescription("");

        }).catch((err)=>{
            alert(err)
        })


    }


  return (

    <div className='container'>
    <form onSubmit={sendData}>
        
      <div className="mb-3">
        <label htmlFor="Category">Category</label>
        <input type="text" className="form-control" id="category" placeholder='Category'
        
            onChange={(e)=>{
                setCategory(e.target.value);
            }}
        
        
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="Date">Date</label>
        <input type="text" className="form-control" id="date" placeholder='Date'

           onChange={(e)=>{
            setDate(e.target.value);
        }}
        
        />
        
      </div>

      <div className="mb-3">
        <label htmlFor="Amount">Amount</label>
        <input type="text" className="form-control" id="amount" placeholder='Amount'
        
        onChange={(e)=>{
            setAmount(e.target.value);
        }}
        
        />
        
      </div>

      <div className="mb-3">
        <label htmlFor="Description">Description</label>
        <input type="text" className="form-control" id="description" placeholder='Description'
        
        onChange={(e)=>{
            setDescription(e.target.value);
        }}
        
        />
        
      </div>
     
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
}

export default FormComponent;
