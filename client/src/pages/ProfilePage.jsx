import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import AdCard from "components/AdCard"; // Import AdCard
import { Link } from "react-router-dom";
import { AuthContext } from "components/AuthProvider";
import { StarIcon } from "@heroicons/react/20/solid";
import ReviewCard from "components/ReviewCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProfilePage() {
  const { userData } = useContext(AuthContext);
  const [ads, setAds] = useState([]);

  const Mreviews = [
    {
      name: "John Doe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "https://via.placeholder.com/150", // Example image URL, replace with your actual image URL
      rating: 5,
      date: "March 25, 2024",
    },
    {
      name: "Jane Smith",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl: "https://via.placeholder.com/150", // Example image URL, replace with your actual image URL
      rating: 4,
      date: "April 1, 2024",
    },
  ];
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

  const reviews = { href: "#", average: 4, totalCount: 117 };
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 sm:ml-28 lg:pb-0 pb-24">
        <Header />

        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg shadow ">
          <div className="flex justify-end px-4 pt-4">
            <Link
              to="/edit-profile"
              className="flex items-center font-semibold text-custom-blue  hover:text-gray-700 "
            >
              <h2 className="text-md font-medium mr-2">Edit Profile</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Link>
          </div>

          <div className="flex items-center flex-col pb-10">
            <img
              className="w-40 h-40 mb-3 rounded-full shadow-lg"
              src={userData.profile_picture}
              alt={userData.username}
            />
            <h5 className="mb-1 text-2xl font-medium text-gray-900 ">
              @{userData.username}
            </h5>
            <p className="text-sm text-gray-500">
              {userData.first_name} {userData.last_name}
            </p>
            <p className="text-sm text-gray-500 ">{userData.email}</p>
            <div className="mt-4 flex items-center">
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
              <p className="sr-only">{userData.averageRating} out of 5 stars</p>
              <a
                href={reviews.href}
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {reviews.totalCount} reviews
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <h4 className="mt-3 mb-1 text-2xl font-semibold text-gray-900 ">
            Your Listings
          </h4>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-2 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {ads.map(
              (ad) =>
                ad.owned_by === userData.username && (
                  <AdCard key={ad.id} ad={ad} />
                )
            )}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <h4 className="mt-3 mb-1 text-2xl font-semibold text-gray-900 ">
            Your Reviews
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            {Mreviews.map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                description={review.description}
                imageUrl={review.imageUrl}
                rating={review.rating}
                date={review.date}
              />
            ))}
          </div>
        </div>

        {/* <div className="bg-white py-6 sm:py-6">
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
            </div> */}
        {/* <ul>
          <div className="bg-white py-6 sm:py-6">
            <div className="mx-auto lg:max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-4 rounded-md bg-custom-blue shadow-md px-2 py-2">
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
        </ul> */}
      </div>
    </div>
  );
}

export default ProfilePage;
