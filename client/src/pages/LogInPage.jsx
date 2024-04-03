import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "components/AuthProvider";
import axios from 'axios';
import Logo from "../assets/LogoBigNoBg.svg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(false); // State to track if the view is mobile
  const { login, getToken } = useContext(AuthContext);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');



  let navigate = useNavigate();

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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setPasswordError('');

      await login(email, password);
      // After the login attempt, get the token to verify if login was successful.
      // This assumes `getToken` is a function that retrieves the stored token,
      // and it will return `undefined` or `null` if no token is stored.
      const apiToken = getToken();

      // Only navigate to "/" if `apiToken` is successfully retrieved, 
      // indicating the login was successful.
      if (apiToken) {
        navigate("/");
      }

    } catch (error) {
      setPasswordError('Login failed: Please check your credentials and try again.');
    }

  };


  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      {/* Mobile-specific layout and components  added in next line*/}
      <div className={`flex items-center justify-center h-screen bg-gray-100 ${isMobile ? 'px-4 lg:px-20' : ''}`}>

        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleLogin}
          >
            {/* Logo */}
            <div className="flex justify-center">
              {/* Mobile-specific layout and components  added in next line*/}
              <a href="/">
                {isMobile ? (
                  <img src={Logo} alt="Logo" className="w-auto h-32" />
                ) : (
                  <img src={Logo} alt="Logo" className="w-auto h-36" />
                )}
              </a>
            </div>


            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
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
              {emailError && <div className="text-red-500">{emailError}</div>}

            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
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
              {passwordError && <div className="text-red-500">{passwordError}</div>}
            </div>
            <div className="flex flex-col items-center justify-between space-y-4">
              <button
                className="w-full bg-custom-blue text-white hover:bg-custom-yellow hover:text-custom-blue font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="font-bold text-sm text-custom-blue hover:text-blue-800"
                href="/forgotPassword"
              >
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

    </>
  );
}

export default LoginPage;
