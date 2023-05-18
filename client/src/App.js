import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home/HomePage";
import PatientCard from "./pages/Patient/PatientCard";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/Signup/SignUpPage";
import Modal from "react-modal";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const rootElement = document.getElementById("root");
  const navigate = useNavigate(); // Add this line to import the useNavigate hook

  Modal.setAppElement(rootElement);

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("Logged in");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    // Redirect to the login page or any other desired page
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="App">
        <header
          className={
            window.location.href !== "http://localhost:3000/"
              ? "App-header bg-gray-100"
              : "bg-gray-100"
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/patients" element={<PatientCard />} />
            <Route
              path="/login"
              element={<LoginPage handleLogin={handleLogin} />}
            />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </header>
      </div>
    </React.Fragment>
  );
};

export default App;
