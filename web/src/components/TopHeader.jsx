import React from "react";
import "../app.css";

export default function TopHeader() {
  return (
    <div className="flex justify-center items-center w-full px-2 sm:px-4 md:px-6">
      <div className="mx-auto text-xs md:text-base lg:text-lg italic font-semibold bg-zinc-950 px-3 py-2 text-center rounded-b-lg shadow-md sm:shadow-lg shadow-yellow-900/50 w-auto">
        <p className="text-yellow-400 drop-shadow-md">
          🚀 Available for New Projects
        </p>
      </div>
    </div>
  );
}
