import React, { useState, useEffect } from 'react';
import AdCard from './AdCard';
import { Link } from 'react-router-dom';
import DetailedAd from './DetailedAd';

function AdsList() {
  // State to store the ads
  const [ads, setAds] = useState([]);

  // State to store loading status
  const [isLoading, setIsLoading] = useState(true);

  // State to store any potential error from the fetch operation
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch ads data
    const fetchAds = async () => {
      try {
        const response = await fetch('/api/ads/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAds(data); // Set the ads data to state
        setIsLoading(false); // Set loading to false since the data is loaded
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchAds(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  // Conditional rendering based on the state
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    
    <div className="bg-white py-6 sm:py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-5xl font-semibold">Browse</h1>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-2 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {ads.length > 0 ? (
            ads.map(ad => (
              <Link to={`/ad/${ad.id}`}>
              <AdCard key={ad.id} ad={ad} />
              </Link>
              
            ))
          ) : (
            <p>No ads found.</p>
          )}
        </div>
      </div>
    </div>

    </>
  );
}

export default AdsList;
