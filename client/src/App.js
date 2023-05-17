import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home/HomePage";
import PatientCard from "./pages/Patient/PatientCard";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/Signup/SignUpPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
        <Routes>
            <Route exact path="" element={<HomePage />}></Route>
            <Route exact path="/patients" element={<PatientCard />}></Route>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route exact path="/signup" element={<SignUpPage/>}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;






