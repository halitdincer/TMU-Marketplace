import React, { useState, useEffect } from 'react';
import logo from '../images/logo.jpg'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchError, matchPasswordError] = useState('');

  async function checkIfEmailExists(emailToCheck) {
    try {
      const response = await axios.get('/api/users/check-email/', {
        params: { email: emailToCheck },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      
      return response.data.exists;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const validatePassword = (pwd) => {
    const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()]).{8,}');
    if (!regex.test(pwd)) {
      setPasswordError('Password must contain at least one number, one uppercase and lowercase letter, 8 or more characters, and at least one special character');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleConfirmPassword = (e) => {
      if (password !== confirmPassword) {

      matchPasswordError('Passwords do not match.');
      return false;
    } else {
      matchPasswordError('');
      return true;
    }
  }

  const handleSignUp = async (event) => {
    handleConfirmPassword();
    validatePassword(password);

    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = handleConfirmPassword();

    event.preventDefault();
   
    if (isPasswordValid && isConfirmPasswordValid) {
      try {
        const emailExists = await checkIfEmailExists(email);
        if (emailExists) {
          setEmailError('An account with this email already exists.');
          return;
        }
        else{
          setEmailError('');
        }
        try{
          const response = await axios.post('/api/users/signup/',
            JSON.stringify({ username: firstName, password, email }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
          );
          //Strip and Save token to local cache
          const token = (response.data.Authorization).split(' ')[1];
          localStorage.setItem('authtoken', token);    
          navigateToHome();
        } catch(error){
          console.error('Error:', error);
        }
      } catch (error) {
        setEmailError('An unexpected error occurred. Please try again.');
      }
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
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              title="Email must be in the format name@email.com"
              required
            />
          {emailError && <div className="text-red-500">{emailError}</div>}

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
              required
            />
            {passwordError && <div className="text-red-500">{passwordError}</div>}
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
            {passwordMatchError && <div className="text-red-500">{passwordMatchError}</div>}
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

