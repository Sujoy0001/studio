import React from "react";
import bgImage from "../assets/aboutimg.png";
import { FaStar, FaGlobe, FaPaintBrush, FaBullseye } from "react-icons/fa";
import { IoCodeSlash, IoColorPalette } from "react-icons/io5";

export default function HeroSection() {
  const services = [
    { icon: <FaStar />, text: "Branding" },
    { icon: <IoColorPalette />, text: "Logo" },
    { icon: <FaGlobe />, text: "Website" },
    { icon: <FaPaintBrush />, text: "Illustration" },
    { icon: <IoCodeSlash />, text: "Interface" },
    { icon: <FaBullseye />, text: "SEO" },
  ];

  return (
    <section
      className="min-h-[700px] md:m-8 py-16 px-4 md:px-12 md:rounded-4xl bg-blend-saturation bg-black/70 flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Subheading */}
      <p className="text-orange-500 text-xl sm:text-3xl mb-4 italic sujoy2">
        ( hello )
      </p>

      {/* Main Heading */}
      <h1 className="text-3xl sujoy sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight">
        We help ambitious startups and growing businesses launch sharper brands
        and websites with{" "}
        <span className="text-orange-500 font-semibold italic">clarity</span>,{" "}
        <span className="text-orange-500 font-semibold italic">speed</span>, and{" "}
        <span className="text-orange-500 font-semibold italic">no drama.</span>
      </h1>

      {/* Services / Icons */}
      <div className="flex flex-wrap justify-center max-w-2xl gap-4 mt-8 sm:mt-10">
        {services.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-orange-400 cursor-pointer rounded-full text-orange-400 backdrop-blur-md hover:bg-orange-400 hover:text-white transition-colors duration-300"
          >
            <span className="text-white sm:text-orange-400">{item.icon}</span>
            <span className="text-white sm:text-base sujoy3">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
