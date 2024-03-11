import React from 'react';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

function CategoriesPage(){
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

export default CategoriesPage;