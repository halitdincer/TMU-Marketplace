import React, { useState, useEffect, useContext } from 'react';
import AdCard from './AdCard';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import Header from "components/Header";
import Sidebar from "components/Sidebar";
import HeaderLoggedIn from "components/HeaderLoggedIn";
import { AuthContext } from "components/AuthProvider";


const categories = {
  'EL': 'Electronics',
  'CL': 'Clothing',
  'SP': 'Sports & Outdoors',
  'GH': 'Games & Hobbies',
  'MU': 'Music & Instruments',
  'FA': 'Furniture & Appliances',
  'BE': 'Beauty & Personal Care',
  'GA': 'Garden',
  'TB': 'Textbooks',
  'LO': 'Lost & Found',
  'SG': 'Study Groups',
  'TU': 'Tutoring',
  'RS': 'Research & Surveys',
  'OT': 'Others',
};

const Category = () => {
  // State to store the ads
  const { userData } = useContext(AuthContext);
  const { category } = useParams(); // This extracts the category from the URL


  const [ads, setAds] = useState([]);


  // State to store loading status
  const [isLoading, setIsLoading] = useState(true);


  // State to store any potential error from the fetch operation
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchAdsByCategory = async () => {
      setIsLoading(true);
      try {
        // Adjust the URL to include the category parameter for filtering
        const response = await fetch(`/api/ads/?category=${category}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAds(data); // Set the ads data to state
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false); // Set loading to false since the data is loaded or failed
      }
    };


    fetchAdsByCategory(); // Call the fetch function
  }, [category]); // Dependency array with category to refetch when category changes

  const filteredAds = useMemo(
    () =>
      ads.filter((ad) => {
        const lowerSearchQuery = searchQuery ? searchQuery.toLowerCase() : "";
        return (
          (ad.title
            ? ad.title.toLowerCase().includes(lowerSearchQuery)
            : false) ||
          (ad.description
            ? ad.description.toLowerCase().includes(lowerSearchQuery)
            : false)
        );
      }),
    [ads, searchQuery]
  );


  const categoryName = categories[category] || "Category";

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 sm:ml-28">

        {/* Display the appropriate header based on user authentication status */}
        {userData ? (
          <HeaderLoggedIn onSearchSubmit={handleSearchSubmit} />
        ) : (
          <Header onSearchSubmit={handleSearchSubmit} />
        )}
        <div className="bg-custom-blue pl-6 p-2">
          <h1 className="text-xl text-white font-bold">{categoryName}</h1>
        </div>
        {/* Conditional rendering based on loading, error, and ads state */}
        <div className={`mx-auto mt-10 pt-2 ${isLoading || error || ads.length === 0 ? 'p-12' : "grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 p-8 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-4"}`}>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : ads.length > 0 ? (
            ads.map((ad) => (
              <Link key={ad.id} to={`/ad/${ad.id}`}>
                <AdCard ad={ad} />
              </Link>
            ))
          ) : (
            <div>No ads fit this category.</div>
          )}
        </div>
      </div>
    </div>
  );

}

export default Category;