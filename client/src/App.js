import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import CategoriesPage from 'pages/CategoriesPage';
import InboxPage from 'pages/InboxPage';
import DetailedAdPage from 'pages/AdDetailsPage';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="inbox" element={<InboxPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="ad/:id" element={<DetailedAdPage />} /> {/* Route for DetailedAdPage */}
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
