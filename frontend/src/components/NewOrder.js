import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormComponent = () => {


    const [CustomerName, setCustomerName] = useState();
    const [ContactNumber, setContactNumber] = useState();
    const [Date, setDate] = useState();
    const [ProductSpecifications, setProductSpecifications] = useState();
    const [OrderQuantity, setOrderQuantity] = useState();
    const [DeliveryPreference, setDeliveryPreference] = useState();
    const [Price, setPrice] = useState();

    const navigate = useNavigate()


  function sendData(e) {
    e.preventDefault();

    const newOrder = {
        CustomerName,
        ContactNumber,
        Date,
        ProductSpecifications,
        OrderQuantity,
        DeliveryPreference,
        Price
    };

    axios.post("http://localhost:8070/order/add", newOrder).then(() => {
        alert("Order Added");
        navigate('/all-order');

        // Resetting all the state variables after sending the data
        setCustomerName("");
        setContactNumber("");
        setDate("");
        setProductSpecifications("");
        setOrderQuantity(""); // Corrected line
        setDeliveryPreference("");
        setPrice("");

    }).catch((err) => {
        alert(err);
    });
}


    


  return (

    <div className='container'>
    <form onSubmit={sendData}>
        
      <div className="mb-3">
        <label htmlFor="CustomerName">Customer Name</label>
        <input type="text" className="form-control" id="CustomerName" placeholder='Customer Name'
        
            onChange={(e)=>{
                setCustomerName(e.target.value);
            }}
        
        
       required />
        
      </div>
      <div className="mb-3">
        <label htmlFor="ContactNumber">Contact Number</label>
        <input type="text" className="form-control" id="ContactNumber" placeholder='Contact Number'

           onChange={(e)=>{
            setContactNumber(e.target.value);
        }}
        
        required/>
        
      </div>

      <div className="mb-3">
        <label htmlFor="Date">Date</label>
        <input type="date" className="form-control" id="Date" placeholder='Date'
        
        onChange={(e)=>{
            setDate(e.target.value);
        }}
        
        required/>
        
      </div>

      <div className="mb-3">
        <label htmlFor="ProductSpecifications">Product Specifications</label>
        <input type="text" className="form-control" id="ProductSpecifications" placeholder='Product Specifications'
        
        onChange={(e)=>{
            setProductSpecifications(e.target.value);
        }}
        
        required/>
        
      </div>

      <div className="mb-3">
        <label htmlFor="Quantity">Quantity</label>
        <input type="text" className="form-control" id="Quantity" placeholder='Quantity'
        
        onChange={(e)=>{
            setOrderQuantity(e.target.value);
        }}
        
        required/>
        

      </div>

      <div className="mb-3">
        <label htmlFor="DeliveryPreference">Delivery Preference</label>
        <input type="text" className="form-control" id="DeliveryPreference" placeholder='Delivery Preference'
        
        onChange={(e)=>{
            setDeliveryPreference(e.target.value);
        }}
        
        required/>
        

      </div>

      <div className="mb-3">
        <label htmlFor="Price">Price</label>
        <input type="text" className="form-control" id="Price" placeholder='Price'
        
        onChange={(e)=>{
            setPrice(e.target.value);
        }}
        
        required/>
        

      </div>
     
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
}

export default FormComponent;
