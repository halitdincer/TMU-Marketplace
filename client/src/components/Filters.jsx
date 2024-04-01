import React, { useState, useEffect } from 'react';

function Filters() {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  const [isMobile, setIsMobile] = useState(false); // State to track if the view is mobile
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust this value based on your mobile breakpoint
    };

    // Call handleResize on component mount to set initial state
    handleResize();

    // Add event listener for resize to adjust isMobile state as necessary
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = ['Books', 'Electronics', 'Clothing', 'Furniture', 'Toys', "Study Goods", "Sports Equipment", "Other"];
  const locations = ['Toronto', 'GTA', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Other'];

  // Toggle for showing/hiding filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      {isMobile ? (
        // Mobile menu toggle button
        <>
          <div className="bg-custom-blue shadow-md px-3 py-3 text-center cursor-pointer" >
            <div
              className="inline-block bg-gray-400 bg-opacity-20 rounded-full py-2 px-4 text-white cursor-pointer font-medium"
              onClick={toggleFilters}

            >
              Select Filters: Price, Location, Category
            </div>
          </div>
          {showFilters && (
            <div className="top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-start ">
              <div className="absolute rounded-lg p-4 shadow-md w-full bg-custom-blue bg-opacity-80 max-w-md mx-auto grid grid-cols-1 gap-4">
                {/* Filters Content */}
                <div className="flex flex-col space-y-4"> {/* Add a container to manage layout */}
                  {/* Categories Dropdown */}
                  <div>
                    <label htmlFor="category-select" className="block text-sm font-medium text-white mb-1">Category</label>
                    <select
                      id="category-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full py-1 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-blue-500 text-gray-700"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Min Price Input */}
                  <div>
                    <label htmlFor="min-price" className="block text-sm font-medium text-white mb-1">Min Price</label>
                    <input
                      type="number"
                      id="min-price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full py-1 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                      placeholder="0"
                    />
                  </div>

                  {/* Max Price Input */}
                  <div>
                    <label htmlFor="max-price" className="block text-sm font-medium text-white mb-1">Max Price</label>
                    <input
                      type="number"
                      id="max-price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full py-1 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                      placeholder="1000"
                    />
                  </div>

                  {/* Locations Dropdown */}
                  <div>
                    <label htmlFor="location-select" className="block text-sm font-medium text-white mb-1">Location</label>
                    <select
                      id="location-select"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full py-1 px-3 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    >
                      <option value="">Select a location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>
            </div>
          )}
        </>

      ) : (
        <>
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
        </>
      )}
    </>

  );
}

export default Filters;
