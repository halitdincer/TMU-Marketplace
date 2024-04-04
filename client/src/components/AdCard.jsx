import { React, useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
function AdCard({ ad }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const shortDescription =
    ad.description.length > 100
      ? `${ad.description.slice(0, 70)}...`
      : ad.description;

  // Set custom image classes based on window width
  let imageClasses = "w-full h-56 object-cover object-center";
  if (windowWidth < 640) {
    imageClasses = "w-full h-75 object-cover object-center";
  }
  return (
    <article className="max-w-md mx-auto bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden my-5">
      <div className="max-h-80 overflow-hidden">
        <img
          src={
            ad.images && ad.images.length > 0
              ? ad.images[0].image_url
              : "https://placehold.co/600x400?text=No+Image"
          }
          alt={ad.title}
          className={imageClasses}
        />
      </div>

      <div className="pt-4 p-6 ">
        <div className="lg:text-xs flex items-center justify-between text-sm text-gray-600 mb-2">
          <time dateTime="2020-03-16">
            {formatDate(ad.created_at) || "Unknown date"}
          </time>
          <span className="rounded-full bg-gray-100 px-3 py-1">
            {ad.type || "No Category"}
          </span>
        </div>

        <div className="flex items-center">
          <FaMapMarkerAlt className="text-gray-400 mr-1 h-4 w-4" />
          <p className="text-sm  mt-1 text-gray-500 ">
            {ad.location || "Toronto, ON"}
          </p>
        </div>
        <h3 className="lg:text-xl text-2xl mt-3  font-bold text-custom-blue  transition-colors duration-200">
          ${ad.price}
        </h3>
        <h3 className="lg:text-md text-lg mt-1  font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-200 pb-2">
          <a href="#" className="stretched-link">
            {ad.title || "No Title"}
          </a>
        </h3>

        {/* <div className="h-20 overflow-hidden">
          <p className="text-base text-gray-600 mt-3">{shortDescription}</p>
        </div> */}
      </div>
    </article>
  );
}

export default AdCard;
