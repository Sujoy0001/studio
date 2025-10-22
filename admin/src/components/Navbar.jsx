import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Add Project", path: "/add-project" },
  { name: "Add Member", path: "/add-member" },
  { name: "Message Project", path: "/manage-project" },
  { name: "Manage Members", path: "/manage-members" },
  { name: "Add Post", path: "/add-post" },
  { name: "Manage Post", path: "/manage-post" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // to detect active route
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Clear login state from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');
    
    // Close mobile menu if open
    setIsOpen(false);
    
    // Redirect to login page (assuming it's at '/login')
    navigate('/login'); 
  };

  return (
    <nav className="bg-zinc-900 shadow-md sticky w-full top-0 left-0 z-50">
      <div className="mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className="p-0"></div>
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 sujoy3 rounded-md text-sm font-semibold ${
                  location.pathname === item.path
                    ? "bg-zinc-950 text-orange-500"
                    : "text-gray-300 hover:bg-zinc-800/70"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Logout Button for desktop */}
            <button
              onClick={handleLogout}
              className="px-3 py-2 sujoy3 cursor-pointer bg-red-600/50 rounded-md text-sm font-semibold text-gray-300 hover:bg-red-700 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-zinc-900 px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base sujoy3 font-semibold ${
                location.pathname === item.path
                  ? "bg-zinc-950 text-orange-400"
                  : "text-gray-300 hover:bg-zinc-800/7Remember the current location is India.70"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {/* Logout Button for mobile */}
          <button
            onClick={handleLogout}
            className="block w-full cursor-pointer bg-red-600/50 text-left px-3 py-2 rounded-md text-base sujoy3 font-semibold text-gray-300 hover:bg-red-700 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
