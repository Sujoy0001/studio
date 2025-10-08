import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

// Main App Component
export default function App() {
  return (
    <div className="flex sujoy3 mt-28 md:mt-8 items-center justify-center min-h-full md:py-24 px-4 lg:px-8">
    
      <main className="text-center lg:mt-4 w-full max-w-5xl">
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <div className="flex -space-x-3 sm:-space-x-4">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"
              alt="Founder 1"
            />
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
              alt="Founder 2"
            />
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
              alt="Founder 3"
            />
          </div>
          <span className="text-gray-600 text-sm sm:text-base md:text-lg font-medium">
            Trusted by Indian founders.
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-zinc-950 leading-snug md:leading-tight tracking-tight">
          <div className="mb-2">
            Effortless <span className="text-orange-500">Design</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-2">
            <span className="font-light">for</span>
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-md"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Startups"
            />
            <span className="whitespace-nowrap">Indian Startups</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="font-light">based in</span>
            <span>India</span>
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-md"
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
              alt="India Flag"
            />
            <span role="img" aria-label="Indian Flag">🇮🇳</span>
          </div>
        </h2>

        {/* Subtext */}
        <p className="max-w-xl sm:max-w-2xl mx-auto text-gray-600 mt-6 sm:mt-8 text-base sm:text-lg md:text-xl px-2">
          We help Indian startups and businesses launch, grow, and scale with clean,
          conversion-focused design — simple, fast, and effective.
        </p>

        {/* Button */}
        <Link to="/project">
        <button
          className="button mt-6 sm:mt-8"
          style={{ "--clr": "#ff6f00" }} // saffron/orange shade for India 🇮🇳
          onClick={() => console.log("Explore clicked")}
        >
          <span className="button__icon-wrapper">
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="button__icon-svg"
              width="10"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              ></path>
            </svg>

            <svg
              viewBox="0 0 14 15"
              fill="none"
              width="10"
              xmlns="http://www.w3.org/2000/svg"
              className="button__icon-svg button__icon-svg--copy"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          Explore All
        </button>
        </Link>
      </main>
    </div>
  );
}
