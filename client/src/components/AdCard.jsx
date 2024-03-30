import React from "react";

function AdCard({ ad }) {
  const shortDescription =
    ad.description.length > 100
      ? `${ad.description.slice(0, 100)}...`
      : ad.description;

  return (
    <article className="max-w-md mx-auto bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden my-5">
      <img
        src={
          ad.images && ad.images.length > 0
            ? ad.images[0].image_url
            : "https://placehold.co/600x400?text=No+Image"
        }
        alt={ad.title}
        className="w-full h-56 object-cover object-center"
      />

      <div className="p-6">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <time dateTime="2020-03-16">{ad.date || "Unknown date"}</time>
          <span className="rounded-full bg-gray-100 px-3 py-1">
            {ad.category || "No Category"}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-200">
          <a href="#" className="stretched-link">
            {ad.title || "No Title"}
          </a>
        </h3>

        <p className="text-gray-600 mt-3 line-clamp-3">{shortDescription}</p>

        {/* <div className="mt-4">
          <a href="#" className="text-blue-600 hover:underline">Read more</a>
        </div> */}
      </div>
    </article>
  );
}

export default AdCard;
