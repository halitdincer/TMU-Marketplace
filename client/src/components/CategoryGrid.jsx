import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import Link

import Beauty from "../images/beauty.jpg";
import Clothing from "../images/clothes.jpg";
import Electronics from "../images/electronics.jpg";
import Gaming from "../images/gaming.jpg";
import Garden from "../images/garden.jpg";
import Home from "../images/home.jpg";
import LostAndFound from "../images/lost_and_found.jpg";
import Music from "../images/music.jpg";
import Others from "../images/other.jpg";
import Research from "../images/research.jpg";
import Sports from "../images/sports.jpg";
import StudyGroups from "../images/study_groups.jpg";
import Textbooks from "../images/textbooks.jpg";
import Tutoring from "../images/tutoring.jpg";

const callouts = [
  {
    name: "Beauty & Personal Care",
    imageSrc: Beauty, // Direct assignment of the imported image variable
    imageAlt: "Beauty & Personal Care",
    href: "/?category=BE",
    short: "BE",
  },
  {
    name: "Clothing",
    imageSrc: Clothing,
    imageAlt: "Clothing",
    href: "/?category=CL",
    short: "CL",
  },
  {
    name: "Electronics",
    imageSrc: Electronics,
    imageAlt: "Electronics",
    href: "/?category=EL",
    short: "EL",
  },
  {
    name: "Games & Hobbies",
    imageSrc: Gaming,
    imageAlt: "Games & Hobbies",
    href: "/?category=GH",
    short: "GH",
  },
  {
    name: "Garden",
    imageSrc: Garden,
    imageAlt: "Garden",
    href: "/?category=GA",
    short: "GA",
  },
  {
    name: "Furniture & Appliances",
    imageSrc: Home,
    imageAlt: "Furniture & Appliances",
    href: "/?category=FA",
    short: "FA",
  },
  {
    name: "Lost and Found",
    imageSrc: LostAndFound,
    imageAlt: "Lost and Found",
    href: "/?category=LO",
    short: "LO",
  },
  {
    name: "Music & Instruments",
    imageSrc: Music,
    imageAlt: "Music Instruments and Gear",
    href: "/?category=MU",
    short: "MU",
  },
  {
    name: "Others",
    imageSrc: Others,
    imageAlt: "Other Items",
    href: "/?category=OT",
    short: "OT",
  },
  {
    name: "Research & Surveys",
    imageSrc: Research,
    imageAlt: "Research & Surveys",
    href: "/?category=RS",
    short: "RS",
  },
  {
    name: "Sports & Outdoors",
    imageSrc: Sports,
    imageAlt: "Sports Equipment",
    href: "/?category=SP",
    short: "SP",
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
];

function CategoryGrid() {


  return (
    <div className="bg-white-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-2xl py-10 sm:py-24 lg:max-w-none lg:py-12 ">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 lg:grid-rows-2 lg:gap-y-6 sm:pb-30">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-w-1 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h2 className="mt-6 text-lg leading-6 font-medium space-y-1">
                  <button
                    className="text-gray-900"
                  >
                    {callout.name}
                  </button>
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












