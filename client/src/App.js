import React, { useEffect, useState} from 'react';
import Navbar from './Navbar';
import './App.css';
import PatientCard from './PatientCard';
import {Routes, Route} from 'react-router-dom';
import HomePage from './HomePage';

function App() {
  document.title = "Electronic Health Record System";
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:3001/', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {makeAPICall();}, []);
  return (
    <React.Fragment>
      <Navbar/>
      <div className="App">
        <header className="App-header bg-hero bg-cover bg-no-repeat bg-centers">
          <Routes>
            <Route exact path="/patients" element={<PatientCard/>}></Route>
            <Route exact path="/home" element={<HomePage/>}></Route>
          </Routes>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
