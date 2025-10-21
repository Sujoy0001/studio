import React, { useState, useEffect } from 'react';
import logo from "../assets/revoxlogo.png";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <header className="w-full bg-black text-white border-b border-gray-800">
      <div className="container mx-auto px-6 py-2">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center p-1 space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={logo} />
            </div>
            <div>
              <h1 className="text-2xl sujoy4 font-bold text-white">
                Revox Studio
              </h1>
              <p className="text-xs sujoy4 text-yellow-400 mt-0">Creative Digital Solutions</p>
            </div>
          </div>

          <div className="text-center sm:text-right hidden md:block">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              {/* Date */}
              <div className="p-0">
                <div className="text-sm text-gray-200 font-semibold">
                  {time.toLocaleDateString('en-US', dateOptions)}
                </div>
              </div>
              
              {/* Time */}
              <div className="px-2 py-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-mono font-semibold text-white sujoy3">
                    {time.toLocaleTimeString('en-US', timeOptions)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}