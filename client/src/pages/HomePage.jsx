import React from 'react';
import AdsList from 'components/AdsList'
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Filters from 'components/Filters';
import HeaderLoggedIn from 'components/HeaderLoggedIn';

function HomePage(){
  const loggedIn = true;
  return (
    <div className="flex">
      <Sidebar />
      <div class="flex-1">
        {loggedIn ? <HeaderLoggedIn /> : <Header />}
        <Filters />
        <AdsList />
      </div>
    </div>
  );
};

export default HomePage;