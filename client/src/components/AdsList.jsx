import React, { useState, useEffect } from 'react';

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
    <div>
      <h2>Ads List</h2>
      {ads.length > 0 ? (
        <ul>
          {ads.map(ad => (
            <li key={ad.id}>{ad.title} - {ad.description}</li>
          ))}
        </ul>
      ) : (
        <p>No ads found.</p>
      )}
    </div>
  );
}

export default AdsList;
