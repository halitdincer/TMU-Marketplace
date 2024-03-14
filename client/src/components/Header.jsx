import React from 'react';
import { useState } from 'react';

function Header({ title }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header class="bg-white border- border-gray-300">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div class="flex-2">
            <div class="pt-2 relative mx-auto text-gray-600">
              <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-13 rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" />
              <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
                <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" xmlSpace="preserve">
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
            {/* Buttons for "Buy" and "Study Groups" */}
            <button type="button" class="px-4 py-2 bg-custom-blue text-white rounded-md">Buy & Sell</button>
            <button type="button" class="px-4 py-2 bg-custom-blue text-white rounded-md">Study Groups</button>

              
              <button type="button" class="px-4 py-2 bg-custom-yellow text-custom-blue hover:bg-custom-blue hover:text-white rounded-md">Log In</button>
              <p>or</p>
              <button type="button" class="px-4 py-2 bg-custom-yellow text-custom-blue hover:bg-custom-blue hover:text-white rounded-md">Sign Up</button>


          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;