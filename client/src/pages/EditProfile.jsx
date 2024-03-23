import React, { useState } from 'react';
import Sidebar from 'components/Sidebar';

const updateProfile = (profile) => {
    console.log('Updating Profile:', profile);
  };

function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the function to update the profile here
    updateProfile({ name, email, image });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="bg-white py-6 sm:py-6">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-4 p-4 rounded-md bg-custom-blue shadow-md px-2 py-2">
                <h1 className="text-5xl font-semibold" style={{color: 'white'}}>Edit Profile</h1>              
              </div>                
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <article className="max-w-md mx-auto bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden my-5" style={{width: '400px', height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <label style={{ marginBottom: '10px', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      Image:
                      <br />
                      <input type="file" onChange={handleImageChange} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  </label>
                  <label style={{ marginBottom: '10px', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      Name:
                      <br />
                      <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
                  </label>
                  <label style={{ marginBottom: '20px', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      Email:
                      <br />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
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