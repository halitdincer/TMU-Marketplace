import React, { useState } from 'react';

function Filters() {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');

  const categories = ['Books', 'Electronics', 'Clothing', 'Furniture', 'Toys', "Study Goods", "Sports Equipment", "Other"];
  const locations = ['Toronto', 'GTA', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Other'];

  return (
    <div className="bg-custom-blue shadow-md px-2 py-2">
      <div className="flex flex-wrap gap-10 justify-center items-center">

        {/* Categories Dropdown */}
        <div>
          <label htmlFor="category-select" className="pr-5 text-sm font-medium text-white mb-1">Category</label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="py-1 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-blue-500 text-gray-700"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
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
            onChange={(e) => setLocation(e.target.value)}
            className="py-1 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
