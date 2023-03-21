import React from 'react';
import Navbar from './Navbar';
import './App.css';
import PatientCard from './PatientCard';

function App() {
  document.title = "Electronic Health Record System";
  return (
    <React.Fragment>
      <Navbar />
      <div className="App">
        <header className="App-header">
          <div className="grid grid-cols-4 gap-4">
            <PatientCard firstName="Laura" lastName="Jhonson" age="42" email="ljhns@alumni.de.ku" photo="https://freerangestock.com/sample/120140/business-man-profile-vector.jpg" appointment="11/04/23"/>
            <PatientCard firstName="Irma" lastName="Sjöberg" age="26" email="irma_sjoberg@gmail.com" photo="https://freerangestock.com/sample/120140/business-man-profile-vector.jpg" appointment = "30/03/23"/>
            <PatientCard firstName="Alexander" lastName="Black" age="33" email="alexblack@hotmail.com" photo="https://freerangestock.com/sample/120140/business-man-profile-vector.jpg" appointment="25/07/23"/>
          </div>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
