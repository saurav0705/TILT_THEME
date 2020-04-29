import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  useEffect(()=>{
    window.onbeforeunload = function()
    {
      localStorage.clear();
    };
    
  },[])
  return (
    
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      </BrowserRouter>
    </div>
  );
}

export default App;
