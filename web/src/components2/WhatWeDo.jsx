import React, { useState } from "react";

import img1 from "../assets/images/web.jpg";
import img2 from "../assets/images/word.png";
import img3 from "../assets/images/logo.jpg";

const servicesData = [
  {
    id: "web",
    title: "Customize Web Design",
    marqueeText: "Modern Websites",
    image: img1,
    description: "We create modern, responsive websites that engage users and drive results.",
    tags: ["UX/UI Design", "Responsive Layouts", "Web Development"],
  },
  {
    id: "Wordpress",
    title: "Wordpress Website Design",
    marqueeText: "Brand Identity",
    image: img2,
    description: "We craft engaging websites that leave a lasting impression on your visitors.",
    tags: ["Web Design", "Style Guides", "Visual Identity"],
  },
  {
    id: "logo",
    title: "Logo Design",
    marqueeText: "Unique Logos",
    image: img3,
    description: "Crafting unique and timeless logos that perfectly represent your brand's essence.",
    tags: ["Logotype", "Iconography", "Brand Marks"],
  },
];

const MarqueeText = ({ text }) => (
  <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
    <div className="animate-[marquee_40s_linear_infinite] flex min-w-full shrink-0 items-center justify-around">
      {[...Array(5)].map((_, i) => (
        <h1
          key={i}
          className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] sujoy2 font-bold text-orange-500/90 whitespace-nowrap mx-6"
        >
          {text}
        </h1>
      ))}
    </div>
  </div>
);

export default function WhatWeDo() {
  const [activeService, setActiveService] = useState(servicesData[0]);

  return (
    <section className="relative w-full py-12 font-sans overflow-hidden">
      <div className="mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <h2 className="text-6xl font-bold mb-12 sujoy text-center">
          What we do
        </h2>

        {/* Service Tabs */}
        <div className="flex flex-col sm:flex-row w-full justify-center sm:justify-between max-w-3xl gap-4 mb-16">
          {servicesData.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service)}
              className={`flex items-center sujoy gap-2 cursor-pointer text-2xl transition-colors ${
                activeService.id === service.id
                  ? "text-black font-semibold"
                  : "text-gray-400 hover:text-orange-400"
              }`}
            >
              {activeService.id === service.id && (
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              )}
              {service.title}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="relative w-full flex flex-col items-center">
          
          {/* Marquee Text (Background) */}
          <MarqueeText text={activeService.marqueeText} />

          {/* Main Image (Foreground) */}
          <div className="relative z-10 w-full max-w-3xl h-64 sm:h-80 md:h-96 lg:h-[500px] p-4 bg-white/30 backdrop-blur-sm rounded-3xl shadow-2xl">
            <img
              src={activeService.image}
              alt={`${activeService.title} preview`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Description */}
          <p className="relative sujoy3 z-10 max-w-xl text-center text-black mt-6 sm:mt-8 text-base sm:text-lg md:text-xl px-2">
            {activeService.description}
          </p>

          {/* Tags */}
          <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-6">
            {activeService.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-zinc-950 text-white px-4 py-2 sujoy3 rounded italic text-sm sm:text-base font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
