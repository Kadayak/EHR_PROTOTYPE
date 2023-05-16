import React from 'react';
import axios from 'axios';

const LoginPage = () => {

    async function login() 
    {
        console.log("Login Started");
        const response = await axios.post("http://localhost:3001/api/auth/login/", {
                cpr: '030502-8282',
                password: 'mypassoword'
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error.response.data);
            });
    }

    
    return(
    <React.Fragment>
        <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                CPR Number
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="CPR Number"></input>
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"></input>
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={login}>
                Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
            </a>
            </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
            &copy;EHR Solutions. All rights reserved.
        </p>
        </div>
    </React.Fragment>
    );
}

export default LoginPage;