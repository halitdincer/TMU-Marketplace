import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import LogoSmall from "../assets/LogoSmall.svg";
import axios from "axios";

function HeaderLoggedIn({ title, onSearchSubmit }) {
  const { userData } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust this value based on your mobile breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleSearchSubmit(event) {
    event.preventDefault(); // Prevents the default form submission
    const searchValue = event.target.elements.search.value; // Access the search input value
    onSearchSubmit(searchValue); // Pass the search value to the onSearchSubmit function
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    // Sending a request to your server
    try {
      const token = localStorage.getItem("authtoken");
      const response = await axios.post(
        "/api/users/logout/",
        JSON.stringify({ Authorization: "Token " + token }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      );

      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      localStorage.removeItem("authtoken");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <header className="bg-white border-gray-300">
        <nav
          className="mx-auto flex items-center justify-between p-4"
          aria-label="Global"
        >
          {isMobile ? (
            // Mobile menu toggle button
            <>
              <div className="w-auto h-20">
                <a href="/">
                  <img
                    className="w-full h-full rounded"
                    src={LogoSmall}
                    alt="Logo"
                  />
                </a>
              </div>

              <div className="flex-2">
                <form
                  className="pt-2 relative mx-auto text-gray-600 pr-2 pl-2"
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-3 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-5 mr-4"
                  >
                    <svg
                      className="text-gray-600 h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 56.966 56.966"
                      xmlSpace="preserve"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </form>
              </div>

              <button onClick={toggleMenu} className="lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <div className="flex-grow">
                <form
                  className="pt-2 relative mx-auto text-gray-600 w-full"
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-5  rounded-lg text-sm focus:outline-none w-full"
                    type="search"
                    name="search"
                    placeholder="Search"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-5 mr-4"
                  >
                    <svg
                      className="text-gray-600 h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 56.966 56.966"
                      xmlSpace="preserve"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </form>
              </div>

              <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                {/* Buttons for "Buy" and "Study Groups" */}

                <a
                  className="flex flex-col items-center px-3 py-2 text-custom-blue transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="/favorites"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </a>

                <button
                  type="button"
                  class="px-4 py-2 bg-custom-blue text-white rounded-md"
                >
                  Buy & Sell
                </button>
                <button
                  type="button"
                  class="px-4 py-2 bg-custom-blue text-white rounded-md"
                >
                  Academic Services
                </button>
                <p>{userData ? userData.username : ""}</p>
                <div className="relative">
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={toggleMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        userData && userData.profile_picture
                          ? userData.profile_picture
                          : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      }
                      alt="User"
                    />
                  </button>
                  {/* Dropdown menu */}
                  {isMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        My Profile{" "}
                      </a>
                      <a
                        href="/logout"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {isMenuOpen && isMobile && (
            // Mobile Menu
            <div className="absolute top-16 right-4 w-64 bg-white shadow-md rounded-lg py-2 z-50">
              {/* Mobile navigation items */}
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </a>
              <a
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </a>
              <a
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Buy & Sell
              </a>
              <a
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Academic Services
              </a>
              <a
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Out
              </a>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

export default HeaderLoggedIn;
