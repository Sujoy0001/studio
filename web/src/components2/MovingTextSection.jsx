import React from "react";

import "../app.css"

export default function MovingTextSection () {
  return (
    <div className="relative flex flex-col justify-center w-full overflow-hidden h-52 p-2 items-center">
      {/* Text container */}
      <div className="p-0 bg-amber-600 w-screen rotate-5 md:absolute overflow-hidden z-10">
        <div className="animate-marquee whitespace-nowrap sujoy flex text-center gap-12 text-5xl font-bold text-white px-4 py-2">
          <span>Website Design</span><span> ✦ </span>
          <span>Brand Design</span><span> ✦ </span>
          <span>Logo Design</span><span> ✦ </span>
          <span>Website Design</span><span> ✦ </span>
          <span>Brand Design</span><span> ✦ </span>
          <span>Logo Design</span><span> ✦ </span>
          <span>Website Design</span><span> ✦ </span>
          <span>Brand Design</span><span> ✦ </span>
          <span>Logo Design</span><span> ✦ </span>
          <span>Website Design</span><span> ✦ </span>
          <span>Brand Design</span><span> ✦ </span>
          <span>Logo Design</span><span> ✦ </span>
        </div>
      </div>

      <div className="p-0 bg-zinc-950 w-screen -rotate-5 overflow-hidden">
        <div className="animate-marquee2 sujoy whitespace-nowrap flex text-center gap-12 text-5xl font-bold text-orange-400 px-4 py-2">
          <span>Over 20 Customers</span><span> ✦ </span>
          <span>Senior Designer</span><span> ✦ </span>
          <span>2 Years of Experience</span><span> ✦ </span>
          <span>Over 20 Customers</span><span> ✦ </span>
          <span>Senior Designer</span><span> ✦ </span>
          <span>2 Years of Experience</span><span> ✦ </span>
        </div>
      </div>
    </div>
  );
};
