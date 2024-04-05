import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {


    const {id} = useParams();

    const [values, setValues] = useState({
      category: '',
      date: '',
      amount: '',
      description: '',
      image: '' 
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setValues({...values, image: reader.result});
    };
    reader.onerror = (error) => {
        console.error('Error: ', error);
    };
};

      

      useEffect(() => {
        axios.get(`http://localhost:8070/expenses/get/${id}`)
          .then(res => {
            const expenseData = res.data.Expenses;
            const formattedDate = expenseData.date ? new Date(expenseData.date).toISOString().split('T')[0] : '';
            setValues({
              category: expenseData.category || '',
              date: formattedDate || '',
              amount: expenseData.amount || '',
              description: expenseData.description || '',
              image: expenseData.image || ''
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
          <h1>Expense Details</h1><br></br>
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
        <input type="date" className="form-control" id="date" placeholder='Date'
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

      <div className='mb-3'>
    <label htmlFor="Image">Image</label>
    <input
        type='file'
        className="form-control"
        id="image"
        onChange={handleImageChange}
        accept="image/*" // This ensures only image files can be selected
        
    />
    
    {values.image && <img src={values.image} alt="Uploaded" style={{width: '400px', marginTop: '40px'}} />}

</div>
     
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
    </div>
    );
}

export default Update;
