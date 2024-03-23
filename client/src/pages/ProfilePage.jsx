import React, { useState, useEffect } from 'react';
import Sidebar from 'components/Sidebar';
import AdsList from 'components/AdsList';
import { Link } from 'react-router-dom';

function StarRating({rating}) {
  const stars = [...Array(5)].map((_, i) => i < rating ? '⭐' : '☆');
  return <div>{stars}</div>;
}

function ProfilePage(){
  // These are placeholders, replace with actual data
  const user = {
    name: 'Ekrem Yilmaz',
    email: 'eyilmaz@torontomu.ca',
    image: 'path/to/image.jpg',
    reviews: [5, 3],
  };

  const averageRating = user.reviews.reduce((a, b) => a + b, 0) / user.reviews.length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="bg-white py-6 sm:py-6">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="bg-white py-6 sm:py-6">
              <div className="text-center mb-4 p-4 rounded-md bg-custom-blue shadow-md px-2 py-2">
                <h1 className="text-5xl font-semibold" style={{color: 'white'}}>Profile</h1>              
              </div>              
              <article className="max-w-md mx-auto bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden my-5" style={{width: '400px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img src={"https://placehold.co/600x400"} alt={user.name} style={{borderRadius: '50%', objectFit: 'cover', width: '200px', height: '200px', overflow: 'hidden'}} />
                <div className="p-6" style={{textAlign: 'center'}}>
                  <h2 style={{fontSize: '1.5em'}}>{user.name}</h2>
                  <div className="flex items-center justify-center text-lg text-gray-600 mb-1">
                    <p style={{fontSize: '0.8em'}}>{user.email}</p>
                  </div>
                  <div className="flex items-center justify-center text-lg text-gray-600 mb-1" style={{fontSize: '1em'}}>
                    <StarRating rating={Math.round(averageRating)} />
                    <span>({user.reviews.length} reviews)</span>
                  </div>
                </div>
              </article>
              <div className="flex justify-center">
                <Link to="/edit-profile" className="btn btn-primary" class="bg-custom-blue rounded-md shadow-md px-2 py-2 hover:bg-custom-yellow" style={{ color: 'white', padding: '14px 20px', border: 'none', cursor: 'pointer', opacity: '0.9' }} >Edit Profile</Link>
              </div>              
              <ul>
                <div className="bg-white py-6 sm:py-6">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-4 p-4 rounded-md bg-custom-blue shadow-md px-2 py-2">
                      <h1 className="text-5xl font-semibold" style={{color: 'white'}}>Your Ads</h1>              
                    </div>
                    <div class="flex-1">
                      <AdsList />
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;