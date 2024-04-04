import React, { useState, useEffect, useContext } from 'react';
import Logo from "../assets/LogoBigNoBg.svg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "components/AuthProvider"; // replace 'path-to-AuthProvider' with the actual path to AuthProvider.jsx


function ChangePassword() {
  const { userData, updatePassword  } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchError, matchPasswordError] = useState('');
  const [isMobile, setIsMobile] = useState(false); // State to track if the view is mobile


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust this value based on your mobile breakpoint
    };

    // Call handleResize on component mount to set initial state
    handleResize();

    // Add event listener for resize to adjust isMobile state as necessary
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validatePassword = (pwd) => {
    const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()]).{8,}');
    if (!regex.test(pwd)) {
      setPasswordError("Password must be 8+ characters with a mix of uppercase, lowercase, numbers, and symbols.");
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleConfirmPassword = (e) => {
    if (confirmPassword === '') {
      matchPasswordError('Please confirm your password.');
    } else if (password !== confirmPassword) {
      matchPasswordError('Passwords do not match.');
      return false;
    } else {
      matchPasswordError('');
      return true;
    }
  }

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    handleConfirmPassword();
    validatePassword(password);
    setPasswordError(password === '' ? 'Please enter your password.' : '');
    matchPasswordError(confirmPassword === '' ? 'Please confirm your password.' : '');
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = handleConfirmPassword();

    //Send new password to Authprovider to send request
    if (isPasswordValid && isConfirmPasswordValid) {
      updatePassword(JSON.stringify({username: userData.username, password}));
      navigateToProfile();
    }
  };

  const navigate = useNavigate();
  // Function to handle navigation to the home page
  const navigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className={`flex items-center justify-center h-screen bg-gray-100 ${isMobile ? 'px-4 lg:px-20' : ''}`}>

      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-4 mt-4 mb-4"
          onSubmit={handlePasswordChange}
        >
          <div className="flex justify-center">
            <a href="/">

              {isMobile ? (
                <img src={Logo} alt="Logo" className="w-auto h-32 " />
              ) : (
                <img src={Logo} alt="Logo" className="w-auto h-36" />
              )}
            </a>
          </div>
          
 
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordMatchError && <div className="text-red-500 text-sm">{passwordMatchError}</div>}
          </div>

          <div className="flex flex-col items-center justify-between space-y-4">
            <button className="w-full hover:bg-custom-blue hover:text-white bg-custom-yellow text-custom-blue font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;

