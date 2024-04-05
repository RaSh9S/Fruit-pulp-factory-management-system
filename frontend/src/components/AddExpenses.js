import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormComponent = () => {


    const [category, setCategory] = useState();
    const [date, setDate] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();

    const navigate = useNavigate()

    
    const convertToBase64 = (e) => {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
          setImage(reader.result);
      };
      reader.onerror = (error) => {
          console.log("Error: ", error);
      };
  };

  function sendData(e) {
    e.preventDefault();

    const newExpense = {
        category,
        date,
        amount,
        description,
        base64: image,
    };

    axios.post("http://localhost:8070/expenses/add", newExpense).then(() => {
        alert("Expenses Added");
        navigate('/');

        // Resetting all the state variables after sending the data
        setCategory("");
        setDate("");
        setAmount("");
        setDescription("");
        setImage(""); // Corrected line

    }).catch((err) => {
        alert(err);
    });
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
        
        
       required />
        
      </div>
      <div className="mb-3">
        <label htmlFor="Date">Date</label>
        <input type="date" className="form-control" id="date" placeholder='Date'

           onChange={(e)=>{
            setDate(e.target.value);
        }}
        
        required/>
        
      </div>

      <div className="mb-3">
        <label htmlFor="Amount">Amount</label>
        <input type="text" className="form-control" id="amount" placeholder='Amount'
        
        onChange={(e)=>{
            setAmount(e.target.value);
        }}
        
        required/>
        
      </div>

      <div className="mb-3">
        <label htmlFor="Description">Description</label>
        <input type="text" className="form-control" id="description" placeholder='Description'
        
        onChange={(e)=>{
            setDescription(e.target.value);
        }}
        
        required/>
        
      </div>

      <div className='auth-inner' style={{width: "auto"}}>
        Upload Recipt
        <input
           accept='image/*'
           type='file'
           onChange={convertToBase64}
        
        />
        {image==""|| image==null?"": <img width={100} height={100} src={image}/>}
        

      </div>
     
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
}

export default FormComponent;
