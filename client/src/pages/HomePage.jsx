import React from 'react';
import { useState } from 'react';
import AdsList from 'components/AdsList'
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Filters from 'components/Filters';
import HeaderLoggedIn from 'components/HeaderLoggedIn';

function HomePage({}){
  const [searchQuery, setSearchQuery] = useState('');

  // Call this function from the Header component when the form is submitted
  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    //console.log('query: ',query);
  };



  const loggedIn = false;
  return (
    <div className="flex">
      <Sidebar />
      <div class="flex-1">
        {loggedIn ? <HeaderLoggedIn onSearchSubmit={handleSearchSubmit} /> : <Header onSearchSubmit={handleSearchSubmit} />}
        <Filters />
        <AdsList searchQuery={searchQuery} />
      </div>

    </div>
  );
};

export default HomePage;