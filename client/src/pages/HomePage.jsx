
import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import AdsList from 'components/AdsList'
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Filters from 'components/Filters';
import HeaderLoggedIn from 'components/HeaderLoggedIn';
import { AuthContext } from 'components/AuthProvider';

function HomePage({}){
  const [searchQuery, setSearchQuery] = useState('');
  const { userData } = useContext(AuthContext);

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
        {userData ? <HeaderLoggedIn onSearchSubmit={handleSearchSubmit} /> :  <Header onSearchSubmit={handleSearchSubmit} />}
        <Filters />
        <AdsList searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default HomePage;
