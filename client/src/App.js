import React, { useState, useEffect, useMemo } from "react";

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
import { UserContext } from "./context/UserContext";
import ProfilePage from "./pages/Profile/ProfilePage";

const App = () => {
  const [user, setUser] = useState(null); // for AUTH

  useEffect(() => {
    console.log("user changed... ", user);
  }, [user]);

  const providerValue = useMemo(() => [user, setUser], [user, setUser]);

  const rootElement = document.getElementById("root");
  const navigate = useNavigate(); // Add this line to import the useNavigate hook

  Modal.setAppElement(rootElement);

  return (
    <UserContext.Provider value={providerValue}>
      <React.Fragment>
        <Navbar />
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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </header>
        </div>
      </React.Fragment>
    </UserContext.Provider>
  );
};

export default App;
