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
import Logout from 'components/Logout';
import ForgotPasswordPage from 'pages/ForgotPassword';
import AdDetailsPage from 'pages/AdDetailsPage';
import CreateAdForm from 'components/CreateAdForm';
import CreatePage from 'pages/CreatePage';
import { AuthProvider } from 'components/AuthProvider';
import { PrivateRoute } from 'components/PrivateRoute';
import GuestRoute from 'components/GuestRoute';
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
    <AuthProvider>
      <Routes>

        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="inbox/" element={<InboxPage />} />
        <Route path="inbox/:conversantId" element={<InboxPage />} />
        <Route path="filters" element={<Filters />} />
        <Route path="ad/:id" element={<AdDetailsPage />} /> 
        <Route path="ads" element={<AdsList ads={ads} searchQuery={searchQuery} />} />
        
        {/* Private Routes */}
        <Route path='profile' element={<PrivateRoute/>}>
          <Route index element={<ProfilePage />} />
        </Route>
        <Route path='edit-profile' element={<PrivateRoute/>}>
          <Route index element={<EditProfile />} />
        </Route>
        <Route path='create' element={<PrivateRoute/>}>
          <Route index element={<CreatePage />} />
        </Route>
        <Route path='logout' element={<PrivateRoute/>}>
          <Route index element={<Logout />} />
        </Route>

        {/* Guest Routes */}
        <Route path='login' element={<GuestRoute/>}>
          <Route index element={<LogInPage />} />
        </Route>
        <Route path='signup' element={<GuestRoute/>}>
          <Route index element={<SignUp />} />
        </Route>
        <Route path='forgotPassword' element={<GuestRoute/>}>
          <Route index element={<ForgotPasswordPage />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
