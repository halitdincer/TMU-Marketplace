import React, { useState } from 'react';
import logo from '../images/logo.jpg'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    // Sending a request to your server
    console.log('Logging in with:', email, password);
    try{
      const response = await axios.post('/api/users/login/',
        JSON.stringify({ username: email, password}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
      );
      //Strip and Save token to local cache
      const token = (response.data.Authorization).split(' ')[1];
      localStorage.setItem('authtoken', token);
      navigateToHome();
      //delete later
      console.log(JSON.stringify(response?.data));
    } catch(error){
      console.error('Error:', error);
    }
  };

  let navigate = useNavigate();

  // Function to handle navigation to the home page
  const navigateToHome = () => {
    navigate('/');
  };
  
  
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
