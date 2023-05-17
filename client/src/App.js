import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home/HomePage";
import PatientCard from "./pages/Patient/PatientCard";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/Signup/SignUpPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    //setIsLoggedIn(true);
    console.log("Logged in");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          handleLogin={handleLogin}
        />
        <div className="App">
          <header
            className={
              window.location.href !== "http://localhost:3000/"
                ? "App-header bg-hero bg-cover bg-no-repeat bg-centers"
                : "heading"
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/patients" element={<PatientCard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </header>
        </div>
    </React.Fragment>
  );
};

export default App;