import React, { useState, useEffect } from 'react';
import logo from '../images/logo.jpg'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post('/api/users/signup/',
        JSON.stringify({ username: email, password, firstName, lastName}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
      );
      // TODO: remove console.logs before deployment
      //console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      navigateToHome();
    } catch(error){
      console.error('Error:', error);
    }
  };

  let navigate = useNavigate();

  // Function to handle navigation to the home page
  const navigateToHome = () => {
    navigate('/');
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSignUp}>
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-auto h-20" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first-name"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="last-name"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" // Regex for password validation
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col items-center justify-between space-y-4">
            <button className="w-full bg-custom-blue text-white hover:bg-custom-yellow hover:text-custom-blue font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Create Account
            </button>
          </div>
        </form>
        <div className="text-center">
          <a className="font-bold text-sm text-custom-blue hover:text-blue-800" href="/login">
            Already have an account? Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

