import React, { useState } from 'react';
import logo from '../images/logo.jpg'; 
import { useNavigate } from 'react-router-dom'; 


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Sending a request to your server
    console.log('Logging in with:', username, password);
  };

  let navigate = useNavigate();

  // Function to handle navigation to the signup page
  const navigateToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md"> {/* Adjusted the width to max-w-md for better spacing */}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-auto h-20" /> {/* Adjust size as needed */}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-between space-y-4">
            <button className="w-full bg-custom-blue text-white hover:bg-custom-yellow hover:text-custom-blue font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
            <a className="font-bold text-sm text-custom-blue hover:text-blue-800" href="/forgotPassword">
              Forgot Password?
            </a>
            <button
              className="w-full bg-custom-yellow hover:bg-gray-400 text-custom-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={navigateToSignUp} 
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
