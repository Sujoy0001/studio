import React from "react";
import { Link } from "react-router-dom"; // Or next/link if using Next.js
import errorImg from "../assets/not.gif"; // Replace with your 404 illustration
import { useEffect } from "react";

export default function NotFoundPage() {

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Illustration */}
      <img
        src={errorImg}
        alt="404 Not Found"
        className="w-64 h-64 sm:w-96 sm:h-96 object-contain"
      />

      {/* Subheading */}
      <h2 className="text-6xl font-semibold text-zinc-950 sujoy mb-4">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-zinc-800 sujoy3 mb-8 max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-orange-500 text-white rounded sujoy3 font-semibold hover:bg-orange-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
