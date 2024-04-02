import './App.css';
import React from 'react';
import AddExpenses from './components/AddExpenses';
import Header from './components/Header';
import AllExpenses from './components/AllExpenses';
import Update from './components/Update';

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
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
