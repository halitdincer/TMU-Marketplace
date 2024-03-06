import React from 'react';
import AdsList from 'components/AdsList'
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

function CategoriesPage(){
  return (
    <div className="flex">
      <Sidebar />
      <div class="flex-1">
        <Header />
        <div className="bg-white py-6 sm:py-6">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="text-5xl font-semibold">Categories</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;