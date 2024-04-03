import { useState, useEffect, useContext } from "react";
import {
  StarIcon,
  ArrowUturnLeftIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { FaMapMarkerAlt } from "react-icons/fa";

import ImageCarousel from "./ImageCarousel";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAdDetails from "./useAdDetails";
import { AuthContext } from "./AuthProvider";

const reviews = { href: "#", average: 4, totalCount: 117 };

// Define the classNames function
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DetailedAd() {
  const { ad } = useAdDetails();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { apiToken, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const sendMessage = async () => {
    // Ensure ad details and apiToken are available
    if (!ad || !apiToken) {
      console.error("Ad details or API token is missing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/messages/send/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${apiToken}`, // Assuming the token is used as a Bearer token
        },
        body: JSON.stringify({
          sender: userData.id,
          receiver: ad.owned_by_id,
          text: `Interested in: ${ad.title} - ${ad.description}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Message sent successfully:", data);
      navigate(`/inbox/${ad.owned_by_id}`);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Effect for mobile responsiveness
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="bg-white">
      <div>
        <div className="px-4 py-4">
          {/* If using react-router */}
          <Link
            to="/"
            className="flex items-center text-black-600 hover:text-indigo-500"
          >
            <div className="rounded-full bg-gray-200 p-1">
              <XMarkIcon className="h-5 w-5 " />
            </div>
          </Link>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-28 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-20">
          {/* Options */}
          {isMobile && ad.images && ad.images.length > 0 && (
            <div>
              <ImageCarousel images={ad.images} />
            </div>
          )}
          <div className="mt-10 lg:row-span-3 lg:mt-0  lg:col-start-3">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
              {ad.title}
            </h1>
            <h2 className="sr-only">Product information</h2>
            <p className="text-lg tracking-tight text-gray-900">${ad.price}</p>
            <p className="mt-2 text-xs text-gray-500">
              Posted on {formatDate(ad.created_at)}
            </p>
            {/* Reviews */}
            <div className="mt-4">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <img
                  className=" mr-4 h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <div>
              <h3 className=" sr-only">Description</h3>

              <div className="mt-6 space-y-6">
                <p className="text-base text-gray-900">{ad.description}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li key={ad.location} className="text-gray-400 ">
                    <span className="text-gray-600">{ad.location}</span>
                  </li>
                  <li key={ad.type} className="text-gray-400">
                    {" "}
                    <span className="text-gray-600">{ad.type}</span>
                  </li>
                  <li key={ad.category} className="text-gray-400">
                    {" "}
                    <span className="text-gray-600">{ad.category}</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={sendMessage}
              className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-custom-blue px-8 py-3 text-base font-medium text-white hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Message
            </button>
          </div>

          {!isMobile && ad.images && ad.images.length > 0 && (
            <div className="hidden lg:block lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8">
              <ImageCarousel images={ad.images} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailedAd;
