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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="inbox/" element={<InboxPage />} />
        <Route path="inbox/:conversantId" element={<InboxPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="filters" element={<Filters />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="ad/:id" element={<AdDetailsPage />} /> 
        <Route path="create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
