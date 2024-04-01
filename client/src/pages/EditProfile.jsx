import React, { useContext, useState } from 'react';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { AuthContext } from 'components/AuthProvider'; // replace 'path-to-AuthProvider' with the actual path to AuthProvider.jsx
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const { userData, updateProfile } = useContext(AuthContext);

  // Use state to manage form data
  const [formState, setFormState] = useState({
    profilePic: userData.profilePic,
    username: userData.username,
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    password: userData.password,
  });

  const [profile_picture, setProfilePic] = useState(userData.profile_picture);
  const [username, setUsername] = useState(userData.username);
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchError, matchPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

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

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = async (event) => {
    handleConfirmPassword();
    validatePassword(password);

    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = handleConfirmPassword();

    event.preventDefault();
   
    if (isPasswordValid && isConfirmPasswordValid) { 
      try{
        const response = await axios.post('/api/users/signup/',
          JSON.stringify({ username: email, password, firstName, lastName}),
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
        setEmailError('An account with this email already exists.');
      }
    }
  };

  let navigate = useNavigate();
  // Function to handle navigation to the home page
  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex lg:flex-row">
      <Sidebar />
      <div className="flex-1">
        <Header/>
        <div className="bg-white py-6 sm:py-6">
            <div className="mx-auto lg:max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-4 p-4 rounded-md bg-custom-blue shadow-md px-2 py-2">
                <h1 className="text-5xl font-semibold" style={{color: 'white'}}>Edit Profile</h1>              
              </div>                
              <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <article className="lg:max-w-md mx-auto bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden my-5" style={{width: '90%', height: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <label style={{ marginBottom: '10px', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      Image:
                      <br />
                      <input type="file" name="profilePic" value={formState.profilePic} onChange={(e) => setProfilePic(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  </label>
                  <label style={{ marginBottom: '10px', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      Username:
                      <br />
                      <input type="text" name="username" value={formState.username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  </label>
                  <label style={{ marginBottom: '10px', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      First Name:
                      <br />
                      <input type="text" name="first_name" value={formState.first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  </label>
                  <label style={{ marginBottom: '10px', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      Last Name:
                      <br />
                      <input type="text" name="last_name" value={formState.last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  </label>
                  <label style={{ marginBottom: '20px', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      Email:
                      <br />
                      <input type="text" name="email" value={formState.email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  </label>
                  <label style={{ marginBottom: '20px', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      Password:
                      <br />
                      <input type="text" name="password" value={formState.password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  </label>
                  <input type="submit" value="Update Profile" class="bg-custom-blue rounded-md shadow-md px-2 py-2 hover:bg-custom-yellow" style={{ color: 'white', padding: '14px 20px', border: 'none', cursor: 'pointer', width: '80%', opacity: '0.9' }} />    
                </article>
              </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default EditProfile;