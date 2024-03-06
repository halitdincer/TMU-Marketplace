import React from 'react';
import AdsList from 'components/AdsList'
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

function ProfilePage(){
  return (
    <div className="flex">
      <Sidebar />
      <div class="flex-1">
        <Header/>
        <div className="bg-white py-6 sm:py-6">
          {/* Page content here */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;