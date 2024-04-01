import React, { useState, useEffect, useMemo } from 'react';
import AdCard from './AdCard';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function AdsList({ searchQuery }) {
  // State to store the ads
  const [ads, setAds] = useState([]);

  // State to store loading status
  const [isLoading, setIsLoading] = useState(true);

  // State to store any potential error from the fetch operation
  const [error, setError] = useState(null);

  const location = useLocation();
  
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


  const getQueryStringFromSearchParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.toString();
  };

  useEffect(() => {
    // Function to fetch ads data
    const fetchAds = async () => {
      try {
        const queryString = getQueryStringFromSearchParams();
        console.log(`/api/ads/?${queryString}`);
        const response = await fetch(`/api/ads/?${queryString}`);
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
  }, [location]); // Empty dependency array means this effect runs once on mount

  // Conditional rendering based on the state
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="bg-white py-6 sm:py-6 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-2 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {ads.length > 0 ? (
              filteredAds.map((ad) => (
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
