import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import Link

import StudyGroups from "../images/study_groups.jpg";
import Textbooks from "../images/textbooks.jpg";
import Tutoring from "../images/tutoring.jpg";
import LostAndFound from "../images/lost_and_found.jpg";
import Research from "../images/research.jpg";
import Others from "../images/other.jpg";


const callouts = [
  {
    name: "Research & Surveys",
    imageSrc: Research,
    imageAlt: "Research & Surveys",
    href: "/?category=RS",
    short: "RS",
  },

  {
    name: "Study Groups",
    imageSrc: StudyGroups,
    imageAlt: "Study Groups",
    href: "/?category=SG",
    short: "SG",
  },
  {
    name: "Textbooks",
    imageSrc: Textbooks,
    imageAlt: "Academic Textbooks",
    href: "/?category=TB",
    short: "TB",
  },
  {
    name: "Tutoring",
    imageSrc: Tutoring,
    imageAlt: "Tutoring Services",
    href: "/?category=TU",
    short: "TU",
  },
  {
    name: "Lost and Found",
    imageSrc: LostAndFound,
    imageAlt: "Lost and Found",
    href: "/?category=LO",
    short: "LO",
  },
  {
    name: "Others",
    imageSrc: Others,
    imageAlt: "Other Items",
    href: "/?category=OT",
    short: "OT",
  },
];




const CategoryGrid = () => {
  const navigate = useNavigate();


  const handleCategoryClick = (categoryShortCode) => {
    navigate(`/category/${categoryShortCode}`); // Navigate to the category route
  };


  return (
    <div className="bg-white-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-2xl py-10 sm:py-24 lg:max-w-none lg:py-12 ">
          <h2 className="text-2xl font-bold text-gray-900">Academic Services</h2>


          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 lg:grid-rows-2 lg:gap-y-6 sm:pb-30">
            {callouts.map((callout) => (
              <div key={callout.name} onClick={() => handleCategoryClick(callout.short)}>
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-w-1 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                    onClick={() => handleCategoryClick(callout.short)} // Adding click handler

                  />
                </div>
                <h2 className=" text-lg leading-6 font-medium">
                  <span className="inline-block bg-white text-black rounded-lg px-2 py-1">
                    {callout.name}
                  </span>
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default CategoryGrid;
