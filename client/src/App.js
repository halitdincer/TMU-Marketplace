import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import CategoriesPage from 'pages/CategoriesPage';
import InboxPage from 'pages/InboxPage';
import LogInPage from 'pages/LogInPage'; 
import SignUp from 'pages/SignUp';
import Filters from 'components/Filters'
import ForgotPasswordPage from 'pages/ForgotPassword';
import AdDetailsPage from 'pages/AdDetailsPage';
import CreateAdForm from 'components/CreateAdForm';
import CreatePage from 'pages/CreatePage';
import { AuthProvider } from 'components/AuthProvider';
import { PrivateRoute } from 'components/PrivateRoute';
import { GuestRoute } from 'components/GuestRoute';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="inbox/" element={<InboxPage />} />
        <Route path="inbox/:conversantId" element={<InboxPage />} />
        <Route path="filters" element={<Filters />} />
        <Route path="ad/:id" element={<AdDetailsPage />} /> 
        
        {/* Private Routes */}
        <Route exact path='profile' element={<PrivateRoute/>}>
          <Route exact path="profile" element={<ProfilePage />} />
        </Route>
        <Route exact path='create' element={<PrivateRoute/>}>
          <Route path="create" element={<CreatePage />} />
        </Route>

        {/* Guest Routes */}
        <Route exact path='login' element={<GuestRoute/>}>
          <Route path="login" element={<LogInPage />} />
        </Route>
        <Route exact path='signup' element={<GuestRoute/>}>
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route exact path='forgotPassword' element={<GuestRoute/>}>
          <Route path="forgotPassword" element={<ForgotPasswordPage />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
