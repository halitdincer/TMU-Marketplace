import React, { useState, useEffect } from 'react';


function AdCard({ad}) {

  const short_description = ad.description.length > 50 ? `${ad.description.slice(0, 50)}...` : ad.description;

  return (


    <article className="flex max-w-xl flex-col items-start justify-between">

      <img src="https://placehold.co/600x400" alt="Description of the image" className="w-full h-auto" />

      <div className="flex items-center gap-x-4 text-xs">
        <time datetime="2020-03-16" class="text-gray-500">Mar 16, 2020</time>
        <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Items Wanted</a>
      </div>

      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href="#">
            <span className="absolute inset-0"></span>
            {ad.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{short_description}</p>
      </div>

    </article>

  );
}

export default AdCard;
