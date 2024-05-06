import './App.css';
import React from 'react';
import AddExpenses from './components/AddExpenses';
import Header from './components/Header';
import AllExpenses from './components/AllExpenses';
import Update from './components/Update';
import ExpensesReport from './components/ExpensesReport';
import NewOrder from './components/NewOrder'; 
import AllOrders from './components/AllOrders';
import UpdateOrder from './components/UpdateOrder'
import OrderReport from './components/OrderReport';

import AddFeedback from './components/AddFeedback';
import EditFeedback from './components/EditFeedback';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Header />
        
        <Routes>
          <Route path="/" element={<AllExpenses />} />
          <Route path='/add' element={<AddExpenses />} />
          <Route path='/update/:id' element={<Update />}/>
          <Route path="/report" element={<ExpensesReport />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path='/all-order' element={ <AllOrders /> } />
          <Route path='/update-order/:id' element={ <UpdateOrder /> } />
          <Route path='/order-report' element={ <OrderReport /> } />

          <Route path="/new-post" element={ <AddFeedback />} />
          <Route path="/edit-post/:id" element={ <EditFeedback />} />
          
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
