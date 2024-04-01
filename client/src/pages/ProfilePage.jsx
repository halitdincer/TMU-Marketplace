import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import AdCard from "components/AdCard"; // Import AdCard
import { Link } from "react-router-dom";
import { AuthContext } from "components/AuthProvider";
import { StarIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProfilePage() {
  const { userData } = useContext(AuthContext);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/ads/", {
          params: {
            owned_by: userData.username,
          },
        });
        setAds(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAds();
  }, [userData]);

  return (
    <div className="flex">
      <Sidebar />
      <div class="flex-1 sm:ml-28">
        <Header />
        <div className="bg-white py-6 sm:py-6">
          <div className="mx-auto lg:max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-4 p-4 rounded-md bg-custom-blue shadow-md px-2 py-2">
              <h1 className="text-5xl font-semibold" style={{ color: "white" }}>
                Profile
              </h1>
            </div>
            <article
              className="lg:max-w-md mx-auto bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden my-5"
              style={{
                width: "90%",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={userData.profile_picture}
                alt={userData.username}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "200px",
                  height: "200px",
                  boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              />
              <div className="p-6" style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "1.5em" }}>{userData.username}</h2>
                <div className="flex items-center justify-center text-lg text-gray-600 mb-1">
                  <p style={{ fontSize: "0.8em" }}>
                    {userData.first_name} {userData.last_name}
                  </p>
                </div>
                <div className="flex items-center justify-center text-lg text-gray-600 mb-1">
                  <p style={{ fontSize: "0.8em" }}>{userData.email}</p>
                </div>
                <div
                  className="flex items-center justify-center text-lg text-gray-600 mb-1"
                  style={{ fontSize: "1em" }}
                >
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          userData.averageRating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                    <p className="sr-only">
                      {userData.averageRating} out of 5 stars
                    </p>
                  </div>
                </div>
              </div>
            </article>
            <div className="flex justify-center mb-8">
              <Link
                to="/edit-profile"
                className="btn btn-primary"
                class="bg-custom-blue rounded-md shadow-md px-2 py-2 hover:bg-custom-yellow"
                style={{
                  color: "white",
                  padding: "14px 20px",
                  border: "none",
                  cursor: "pointer",
                  opacity: "0.9",
                }}
              >
                Edit Profile
              </Link>
            </div>
            <ul>
              <div className="bg-white py-6 sm:py-6">
                <div className="mx-auto lg:max-w-7xl px-6 lg:px-8">
                  <div className="text-center mb-4 p-4 rounded-md bg-custom-blue shadow-md px-2 py-2">
                    <h1
                      className="text-5xl font-semibold"
                      style={{ color: "white" }}
                    >
                      Listings
                    </h1>
                  </div>
                  <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-2 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {ads.map(
                      (ad) =>
                        ad.owned_by === userData.username && (
                          <AdCard key={ad.id} ad={ad} />
                        )
                    )}
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
