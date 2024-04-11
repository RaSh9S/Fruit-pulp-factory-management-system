import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {


    const {id} = useParams();

    const [values, setValues] = useState({
        CustomerName: '',
        ContactNumber: '',
        Date: '',
        ProductSpecifications: '',
        OrderQuantity: '',
        DeliveryPreference: '',
        Price: '' 
  });


      

      useEffect(() => {
        axios.get(`http://localhost:8070/order/get/${id}`)
          .then(res => {
            const orderData = res.data.order;
            const formattedDate = orderData.date ? new Date(orderData.date).toISOString().split('T')[0] : '';
            setValues({
              CustomerName: orderData.CustomerName || '',
              ContactNumber: orderData.ContactNumber || '',
              Date: formattedDate || '',
              ProductSpecifications: orderData.ProductSpecifications || '',
              OrderQuantity: orderData.OrderQuantity || '',
              DeliveryPreference: orderData.DeliveryPreference || '',
              Price: orderData.Price || ''
            });
          })
          .catch(err => console.log(err));
      }, [id]);
      
       const navigate = useNavigate()

      const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/order/update/${id}`, values)
          .then(res => {
            navigate('/all-order');
          })
          .catch(err => console.log(err));
      }

    return (
        <div className='container'>
          <h1>Order Details</h1><br></br>
    <form onSubmit={handleSubmit}>
        
      <div className="mb-3">
        <label htmlFor="CustomerName">CustomerName</label>
        <input
            type="text"
            className="form-control"
            id="CustomerName"
            placeholder='Customer Name'
            value={values.CustomerName}
            onChange={(e) => setValues({...values, CustomerName: e.target.value })}
            />
        
      </div>
      <div className="mb-3">
        <label htmlFor="ContactNumber">Contact Number</label>
        <input type="text" className="form-control" id="ContactNumber" placeholder='Contact Number'
        value={values.ContactNumber}
        onChange={(e) => setValues({...values, ContactNumber: e.target.value })}
        />
        
      </div>

      <div className="mb-3">
        <label htmlFor="Date">Date</label>
        <input type="date" className="form-control" id="Date" placeholder='Date'
        value={values.Date}
        onChange={(e) => setValues({...values, Date: e.target.value })}
        
       
        />
        
      </div>

      <div className="mb-3">
        <label htmlFor="ProductSpecifications">Product Specifications</label>
        <input type="text" className="form-control" id="ProductSpecifications" placeholder='Product Specifications'
        value={values.ProductSpecifications}
        onChange={(e) => setValues({...values, ProductSpecifications: e.target.value })}
       
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="OrderQuantity">Order Quantity</label>
        <input type="text" className="form-control" id="OrderQuantity" placeholder='Order Quantity'
        value={values.OrderQuantity}
        onChange={(e) => setValues({...values, OrderQuantity: e.target.value })}
       
        />
        
      </div>

      <div className="mb-3">
        <label htmlFor="DeliveryPreference">Delivery Preference</label>
        <input type="text" className="form-control" id="DeliveryPreference" placeholder='Delivery Preference'
        value={values.DeliveryPreference}
        onChange={(e) => setValues({...values, DeliveryPreference: e.target.value })}
       
        />
        
      </div>

      <div className="mb-3">
        <label htmlFor="Price">Price</label>
        <input type="text" className="form-control" id="Price" placeholder='Price'
        value={values.Price}
        onChange={(e) => setValues({...values, Price: e.target.value })}
       
        />
        
      </div>

    
     
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
    </div>
    );
}

export default Update;
