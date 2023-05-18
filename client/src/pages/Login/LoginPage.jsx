import React, { useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";

const LoginPage = () => {
  const [cpr, setCPR] = useState("");
  const [password, setPassword] = useState("");
  const [cprError, setCPRError] = useState("");
  const [passwordError, setPasswordError] = useState("Please choose a password");
  const [passwordIsValid, setPasswordValid] = useState(false);

  async function login() {
    console.log("Login Started");

    if (!validateCPR(cpr)) {
      setCPRError("Invalid CPR number format");
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    console.log(cpr)
    console.log(password)

    await axios
      .post("http://localhost:3001/api/auth/login/", {
        cpr: cpr,
        password: password,
      })
      .then((response) => {
        console.log("SUCCESS");
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        alert("login success");
      })
      .catch((error) => {
        console.log("ERROR");
        console.log(error.response.data);
        alert("login error");
      });
  }

  function handleCPRChange(event) {
    const inputValue = event.target.value;
    setCPR(inputValue);
    setCPRError(""); // Clear any previous error message
  }
  
  function validateCPR(cpr) {
    const cprRegex = /^\d{6}\d{4}$/;
    return cprRegex.test(cpr);
  }
  
  function handlePasswordChange(event) {
    const inputValue = event.target.value;
    setPassword(inputValue)

    if (!validatePassword()) {
      setPasswordValid(false);
      setPasswordError("Invalid password format");
      return;
    }

    else {
      setPasswordValid(true);
      setPasswordError("");
    }
  }

  function validatePassword() {
    if (password === "") return false
    if (password.length < 2) return false
    return true;
  }
  
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center h-screen">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              CPR Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              // pattern="\d{4}-\d{4}" // Is this necessary?
              placeholder="xxxxxxxxxx"
              value={cpr}
              onChange={handleCPRChange}
            ></input>
            {cprError && (
              <p className="text-red-500 text-xs italic">{cprError}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${!passwordIsValid && "border-red-500"}`}
              id="password"
              type="password"
              placeholder="******************"
              onChange={handlePasswordChange}
            ></input>
            <p className="text-red-500 text-xs italic">
              {passwordError}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-mono py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xlg"
              type="button"
              onClick={login}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs">
              New to EHR Solutions?
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-gray-200 hover:bg-gray-300 text-black font-mono py-2 px-4 rounded focus:outline-black focus:shadow-outline w-full text-base">
              <Link to="/signup">Create an account</Link>
            </button>
          </div>
        </form>
        <p className="text-center text-black text-xs mt-2">
          &copy;EHR Solutions. All rights reserved.
        </p>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
