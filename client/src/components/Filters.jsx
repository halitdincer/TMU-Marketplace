import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Filters() {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');

  const categories = {
    'EL': 'Electronics',
    'CL': 'Clothing',
    'SP': 'Sports & Outdoors',
    'GA': 'Games & Hobbies',
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
  const locations = {
    'TE': 'Toronto & East York',
    'EB': 'Etobicoke',
    'NY': 'North York',
    'SC': 'Scarborough',
    'VA': 'Vaughan',
    'MK': 'Markham',
    'RH': 'Richmond Hill',
    'MV': 'Mississauga',
    'BR': 'Brampton',
    'AP': 'Ajax & Pickering',
    'OS': 'Whitby & Oshawa',
    'OK': 'Oakville & Milton',
    'OT': 'Other Locations',
  };

  const navigate = useNavigate();

  // Function to update the URL parameters
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (category) params.set('category', category);
    if (location) params.set('location', location);
    // Add more parameters here as needed, like minPrice and maxPrice

    // Update the URL without navigating to a new page
    navigate(`?${params.toString()}`, { replace: true });
  }, [category, location, navigate]);

  // Handlers for setting state
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="bg-custom-blue shadow-md px-2 py-2">
      <div className="flex flex-wrap gap-10 justify-center items-center">

        {/* Categories Dropdown */}
        <div>
          <label htmlFor="category-select" className="pr-5 text-sm font-medium text-white mb-1">Category</label>
          <select
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
            className="py-1 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-blue-500 text-gray-700"
          >
            <option value="">Select a category</option>
            {Object.entries(categories).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        {/* Min Price Input */}
        <div>
          <label htmlFor="min-price" className="pr-5 text-sm font-medium text-white mb-1">Min Price</label>
          <input
            type="number"
            id="min-price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="py-1 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            placeholder="0"
          />
        </div>

        {/* Max Price Input */}
        <div>
          <label htmlFor="max-price" className="pr-5 text-sm font-medium text-white mb-1">Max Price</label>
          <input
            type="number"
            id="max-price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="py-1 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            placeholder="1000"
          />
        </div>

        {/* Locations Dropdown */}
        <div>
          <label htmlFor="location-select" className="pr-5 text-sm font-medium text-white mb-1">Location</label>
          <select
            id="location-select"
            value={location}
            onChange={handleLocationChange}
            className="py-1 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            <option value="">Select a location</option>
            {Object.entries(locations).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}

export default Filters;
