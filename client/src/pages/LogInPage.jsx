import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "components/AuthProvider";
import axios from 'axios';


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
      setPasswordError('Login failed: Please check your credentials and try again.');

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
              {isMobile ? (
                <svg xmlns="http://www.w3.org/2000/svg"  width="150" zoomAndPan="magnify" viewBox="0 0 340 349.999991" height="150" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/></defs><g fill="#004c9b" fill-opacity="1"><g transform="translate(112.757991, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(129.634914, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(146.511837, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(163.38876, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(180.265684, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(197.142607, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(214.01953, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(230.896448, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(247.773377, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(264.670707, 187.821816)"><g><path d="M 69.09375 -57.59375 C 68.601562 -48.726562 68.359375 -39.164062 68.359375 -28.90625 C 68.359375 -18.5625 68.601562 -8.925781 69.09375 0 C 64.59375 -0.207031 61.039062 -0.3125 58.4375 -0.3125 C 55.976562 -0.3125 52.425781 -0.207031 47.78125 0 L 44.71875 -15.5 C 43.101562 -9.875 40.570312 -5.707031 37.125 -3 C 33.6875 -0.289062 29.679688 1.0625 25.109375 1.0625 C 20.890625 1.0625 17.234375 0.128906 14.140625 -1.734375 C 11.046875 -3.597656 8.707031 -6.113281 7.125 -9.28125 C 5.539062 -12.445312 4.75 -16 4.75 -19.9375 L 4.75 -35.125 C 4.75 -44.476562 4.570312 -51.96875 4.21875 -57.59375 L 27.953125 -57.59375 C 27.535156 -47.257812 27.328125 -37.03125 27.328125 -26.90625 C 27.328125 -23.800781 28.082031 -21.332031 29.59375 -19.5 C 31.101562 -17.675781 33.019531 -16.765625 35.34375 -16.765625 C 37.519531 -16.765625 39.429688 -17.734375 41.078125 -19.671875 C 42.734375 -21.609375 43.738281 -24.265625 44.09375 -27.640625 L 44.09375 -30.0625 C 44.226562 -35.550781 44.296875 -39.347656 44.296875 -41.453125 C 44.296875 -46.304688 44.15625 -51.6875 43.875 -57.59375 Z M 69.09375 -57.59375 "/></g></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(102.258295, 227.307893)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(123.982188, 227.307893)"><g><path d="M 132.25 -98.46875 L 142.828125 0 L 107.703125 0 L 105.53125 -70.265625 L 91.96875 0 L 56.421875 0 L 42.59375 -69.71875 L 40.5625 0 L 5.421875 0 L 16 -98.46875 L 62.125 -98.46875 L 73.921875 -34.3125 L 84.234375 -98.46875 Z M 132.25 -98.46875 "/></g></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(49.400252, 228.526817)"><g><path d="M 74.296875 -55.3125 C 65.054688 -55.914062 56.617188 -56.367188 48.984375 -56.671875 L 48.828125 -40.6875 C 48.828125 -35.257812 50.003906 -31.015625 52.359375 -27.953125 C 54.722656 -24.890625 58.921875 -23.359375 64.953125 -23.359375 C 67.265625 -23.359375 69.472656 -23.5625 71.578125 -23.96875 C 71.179688 -20.25 70.984375 -16.476562 70.984375 -12.65625 C 70.984375 -10.851562 71.082031 -6.734375 71.28125 -0.296875 C 66.863281 0.503906 63.144531 1.003906 60.125 1.203125 C 57.113281 1.398438 53.195312 1.5 48.375 1.5 C 36.625 1.5 28.3125 -1.332031 23.4375 -7 C 18.5625 -12.675781 16.125 -20.59375 16.125 -30.75 L 16.28125 -56.21875 C 11.550781 -56.007812 6.625 -55.707031 1.5 -55.3125 L 1.5 -81.984375 C 6.726562 -81.984375 11.148438 -83.640625 14.765625 -86.953125 C 18.378906 -90.265625 20.539062 -94.234375 21.25 -98.859375 L 62.234375 -98.859375 C 57.109375 -91.828125 51.4375 -86.203125 45.21875 -81.984375 L 74.296875 -81.984375 Z M 74.296875 -55.3125 "/></g></g></g></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg"  width="200" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="200" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/></defs><g fill="#004c9b" fill-opacity="1"><g transform="translate(112.757991, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(129.634914, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(146.511837, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(163.38876, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(180.265684, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(197.142607, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(214.01953, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(230.896448, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(247.773377, 187.821816)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(264.670707, 187.821816)"><g><path d="M 69.09375 -57.59375 C 68.601562 -48.726562 68.359375 -39.164062 68.359375 -28.90625 C 68.359375 -18.5625 68.601562 -8.925781 69.09375 0 C 64.59375 -0.207031 61.039062 -0.3125 58.4375 -0.3125 C 55.976562 -0.3125 52.425781 -0.207031 47.78125 0 L 44.71875 -15.5 C 43.101562 -9.875 40.570312 -5.707031 37.125 -3 C 33.6875 -0.289062 29.679688 1.0625 25.109375 1.0625 C 20.890625 1.0625 17.234375 0.128906 14.140625 -1.734375 C 11.046875 -3.597656 8.707031 -6.113281 7.125 -9.28125 C 5.539062 -12.445312 4.75 -16 4.75 -19.9375 L 4.75 -35.125 C 4.75 -44.476562 4.570312 -51.96875 4.21875 -57.59375 L 27.953125 -57.59375 C 27.535156 -47.257812 27.328125 -37.03125 27.328125 -26.90625 C 27.328125 -23.800781 28.082031 -21.332031 29.59375 -19.5 C 31.101562 -17.675781 33.019531 -16.765625 35.34375 -16.765625 C 37.519531 -16.765625 39.429688 -17.734375 41.078125 -19.671875 C 42.734375 -21.609375 43.738281 -24.265625 44.09375 -27.640625 L 44.09375 -30.0625 C 44.226562 -35.550781 44.296875 -39.347656 44.296875 -41.453125 C 44.296875 -46.304688 44.15625 -51.6875 43.875 -57.59375 Z M 69.09375 -57.59375 "/></g></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(102.258295, 227.307893)"><g/></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(123.982188, 227.307893)"><g><path d="M 132.25 -98.46875 L 142.828125 0 L 107.703125 0 L 105.53125 -70.265625 L 91.96875 0 L 56.421875 0 L 42.59375 -69.71875 L 40.5625 0 L 5.421875 0 L 16 -98.46875 L 62.125 -98.46875 L 73.921875 -34.3125 L 84.234375 -98.46875 Z M 132.25 -98.46875 "/></g></g></g><g fill="#004c9b" fill-opacity="1"><g transform="translate(49.400252, 228.526817)"><g><path d="M 74.296875 -55.3125 C 65.054688 -55.914062 56.617188 -56.367188 48.984375 -56.671875 L 48.828125 -40.6875 C 48.828125 -35.257812 50.003906 -31.015625 52.359375 -27.953125 C 54.722656 -24.890625 58.921875 -23.359375 64.953125 -23.359375 C 67.265625 -23.359375 69.472656 -23.5625 71.578125 -23.96875 C 71.179688 -20.25 70.984375 -16.476562 70.984375 -12.65625 C 70.984375 -10.851562 71.082031 -6.734375 71.28125 -0.296875 C 66.863281 0.503906 63.144531 1.003906 60.125 1.203125 C 57.113281 1.398438 53.195312 1.5 48.375 1.5 C 36.625 1.5 28.3125 -1.332031 23.4375 -7 C 18.5625 -12.675781 16.125 -20.59375 16.125 -30.75 L 16.28125 -56.21875 C 11.550781 -56.007812 6.625 -55.707031 1.5 -55.3125 L 1.5 -81.984375 C 6.726562 -81.984375 11.148438 -83.640625 14.765625 -86.953125 C 18.378906 -90.265625 20.539062 -94.234375 21.25 -98.859375 L 62.234375 -98.859375 C 57.109375 -91.828125 51.4375 -86.203125 45.21875 -81.984375 L 74.296875 -81.984375 Z M 74.296875 -55.3125 "/></g></g></g></svg>
              )}
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
