// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { 
  HiHome, 
  HiUser, 
  HiBriefcase, 
  HiPhotograph, 
  HiNewspaper,
  HiMenu,
  HiX,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/", icon: HiHome },
  { name: "About", href: "/about", icon: HiUser },
  { name: "Services", href: "/service", icon: HiBriefcase },
  { name: "Projects", href: "/project", icon: HiPhotograph },
  { name: "Post", href: "/post", icon: HiNewspaper },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "top-0" : "top-12"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 shadow-lg backdrop-blur-md max-w-full px-8 py-1"
            : "bg-transparent p-2"
        }`}
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-black hover:text-orange-400 font-bold text-2xl sm:text-3xl sujoy4 italic"
            >
              Revox Studio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 sm:space-x-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex sujoy3 text-2xl items-center gap-2 px-3 sm:px-4 py-2 rounded transition-all duration-300 group ${
                    isActive
                      ? "text-orange-600 bg-orange-100/60"
                      : "text-zinc-700 hover:text-orange-600 hover:bg-orange-100/50"
                  }`}
                >
                  <Icon
                    className={`text-lg transition-transform ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  <span className="text-sm sm:text-base">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <button className="w-auto rounded-full cursor-pointer bg-black py-2 px-12 text-center text-white hover:text-yellow-400 sujoy text-2xl">
                Contact
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-800 hover:bg-orange-100/50 focus:outline-none transition"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 pt-20 overflow-y-auto">
          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <HiX className="h-6 w-6 text-zinc-800" />
            </button>
          </div>

          <div className="px-5 pt-5 pb-8 space-y-4 text-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-semibold text-xl transition-all duration-300 group ${
                    isActive
                      ? "text-orange-600 bg-orange-100"
                      : "text-zinc-700 hover:text-orange-600 hover:bg-orange-100/50"
                  }`}
                >
                  <Icon className="text-2xl" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-6">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <button className="w-auto rounded-full bg-black py-4 px-16">
                  <span className="text-yellow-400 sujoy text-2xl">Contact</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
