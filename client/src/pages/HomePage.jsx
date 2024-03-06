import React from 'react';
import AdsList from 'components/AdsList'
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

function HomePage(){
  return (
    <div className="flex">
      <Sidebar />
      <div class="flex-1">
        <Header />
        <AdsList />
      </div>
    </div>
  );
};

export default HomePage;