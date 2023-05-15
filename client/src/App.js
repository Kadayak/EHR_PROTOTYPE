import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./App.css";
import PatientCard from "./PatientCard";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

function App() {
  document.title = "Electronic Health Record System";
  const [cpr, setCpr] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();

  const makeAPICall = async () => {
    try {
      // const response = await fetch('http://localhost:3001/', {mode:'cors'});
      // const data = await response.json();
      // console.log({ data })
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    makeAPICall();
  }, []);

  const handleLogin = () => {
    
    if(typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", true);
      setLoginStatus(true);
      navigate("login")
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
      setLoginStatus(false);
      navigate("/");
    }
  };


  return (
    <React.Fragment>
      <Navbar isLoggedIn={loginStatus} handleLogout={handleLogout} handleLogin={handleLogin} />
      <div className="App">
        <header className={ window.location.href !== "http://localhost:3000/" ? "App-header bg-hero bg-cover bg-no-repeat bg-centers" : "heading"}>
          <Routes>
            <Route exact path="" element={<HomePage />}></Route>
            <Route exact path="/patients" element={<PatientCard />}></Route>
            <Route exact path="/login" element={<LoginPage />}></Route>
          </Routes>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
