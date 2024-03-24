import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import EditProfile from 'pages/EditProfile';
import CategoriesPage from 'pages/CategoriesPage';
import InboxPage from 'pages/InboxPage';
import LogInPage from 'pages/LogInPage'; 
import SignUp from 'pages/SignUp';
import Filters from 'components/Filters'
import ForgotPasswordPage from 'pages/ForgotPassword';
import AdDetailsPage from 'pages/AdDetailsPage';
import CreateAdForm from 'components/CreateAdForm';
import CreatePage from 'pages/CreatePage';
import AdsList from 'components/AdsList';
import Header from './components/Header'; 


function App() {

  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Call this function from the Header component when the form is submitted
  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    //console.log('query: ',query);
  };

  const handleAdSubmit = (ad) => {
    setAds([...ads, ad]);
  };

  const [user, setUser] = React.useState({
    name: '',
    email: '',
    image: null,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="inbox/" element={<InboxPage />} />
        <Route path="inbox/:conversantId" element={<InboxPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="filters" element={<Filters />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="ad/:id" element={<AdDetailsPage />} /> 
        <Route path="create" element={<CreatePage />} />
        <Route path="create" element={<CreatePage onAdSubmit={handleAdSubmit} />} />
        <Route path="ads" element={<AdsList ads={ads} searchQuery={searchQuery} />} />
        {/*<Route path="ads" element={<AdsList ads={ads} />} /> {/* Pass ads as a prop here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
