import React from 'react';
import Counter from './Counter';
import Employee from './Employee';
import Navbar from './Navbar';
import './App.css';
import Main_Card from './Main_Card';

function App() {
  const headerText = "EHR System";
  document.title = "My EHR";
  return (
    <React.Fragment>
      <Navbar />
      <div className="App">
        <header className="App-header">
          <div className="grid grid-cols-4 gap-4">
            <Main_Card firstName="Jon" lastName="Smith" age="20" email="jsmth@gmail.com" photo="https://freerangestock.com/sample/120140/business-man-profile-vector.jpg"/>
            <Main_Card firstName="Laura" lastName="Jhonson" age="42" email="ljhns@alumni.de.ku" photo="https://freerangestock.com/sample/120140/business-man-profile-vector.jpg"/>
            <Main_Card firstName="Irma" lastName="Sjöberg" age="26" email="irma_sjoberg@gmail.com" photo="https://freerangestock.com/sample/120140/business-man-profile-vector.jpg"/>
            <Main_Card firstName="Alexander" lastName="Black" age="33" email="alexblack@hotmail.com" photo="https://freerangestock.com/sample/120140/business-man-profile-vector.jpg"/>
          </div>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
