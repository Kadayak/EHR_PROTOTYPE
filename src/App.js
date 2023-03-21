import React from 'react';
import Navbar from './Navbar';
import './App.css';
import PatientCard from './PatientCard';
import {Routes, Route} from 'react-router-dom';

function App() {
  document.title = "Electronic Health Record System";
  return (
    <React.Fragment>
      <Navbar/>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path="/patients" element={<PatientCard/>}>
            </Route>
          </Routes>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
