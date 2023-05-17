import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
  async function login() {
    console.log("Login Started");
    const response = await axios
      .post("http://localhost:3001/api/auth/login/", {
        cpr: "0101802022",
        password: "strong_password",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
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
              placeholder="CPR Number"
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            ></input>
            <p className="text-red-500 text-xs italic">
              Please choose a password.
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
            <div class="flex-grow border-t border-gray-400"></div>
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
