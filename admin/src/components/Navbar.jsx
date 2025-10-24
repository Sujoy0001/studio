import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userStore from "../store/userStore.js";

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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutUser, user } = userStore();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Call the logout API from the store
      await logoutUser();
      
      // Clear login state from localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loginTime');
      
      // Close mobile menu if open
      setIsOpen(false);
      
      // Redirect to login page
      navigate('/login'); 
      
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loginTime');
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-zinc-900 shadow-md sticky w-full top-0 left-0 z-50">
      <div className="mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* User info on the left */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-sm text-gray-300 hidden md:block">
                Welcome, <span className="font-semibold text-orange-400">{user.name || user.email}</span>
              </div>
            )}
          </div>
          
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
              disabled={isLoggingOut}
              className="px-3 py-2 sujoy3 cursor-pointer bg-red-600/50 rounded-md text-sm font-semibold text-gray-300 hover:bg-red-700 hover:text-white disabled:bg-red-600/30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoggingOut ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging out...
                </>
              ) : (
                'Logout'
              )}
            </button>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            {/* Mobile user info */}
            {user && (
              <div className="text-sm text-gray-300 md:hidden">
                <span className="font-semibold text-orange-400">{user.name || user.email?.split('@')[0]}</span>
              </div>
            )}
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
                  : "text-gray-300 hover:bg-zinc-800/70"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {/* Logout Button for mobile */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full cursor-pointer bg-red-600/50 text-left px-3 py-2 rounded-md text-base sujoy3 font-semibold text-gray-300 hover:bg-red-700 hover:text-white disabled:bg-red-600/30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoggingOut ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging out...
              </>
            ) : (
              'Logout'
            )}
          </button>
        </div>
      )}
    </nav>
  );
}