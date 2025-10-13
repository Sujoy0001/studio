import { Link } from 'react-router-dom';
import React from 'react';
import { 
  FaFacebookF, FaInstagram, 
  FaTwitter, FaLinkedinIn
} from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';
import { IoIosArrowUp } from 'react-icons/io';

// --- Data for social links for easy management ---
const socialLinks = [
  { icon: <FaFacebookF />, href: '#', 'aria-label': 'Facebook page' },
  { icon: <FaInstagram />, href: '#', 'aria-label': 'Instagram profile' },
  { icon: <FaTwitter />, href: '#', 'aria-label': 'Twitter profile' },
  { icon: <FaLinkedinIn />, href: '#', 'aria-label': 'LinkedIn profile' },
];

export default function Footer() {
  
  // Function to scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="text-zinc-950 font-sans py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* --- Top Section: Heading --- */}
        <p className="text-gray-700 sujoy3">Your cup of tea?</p>
        <h2 className="text-6xl sujoy font-bold mt-2 mb-12">Let's start</h2>

        {/* --- Middle Section: Contact Info --- */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          
          {/* Email */}
          <a 
            href="mailto:revoxstudio.site@gmail.com" 
            className="text-2xl md:text-3xl font-medium border-b border-zinc-700 pb-2 hover:border-orange-500 transition-colors"
          >
            hello@gmail.com
          </a>
          
          {/* CTA Button */}
          <Link
            to="/contact" 
            className="text-lg font-semibold border border-zinc-800 rounded-full px-8 py-4 hover:bg-orange-500 hover:text-black transition-all duration-300"
          >
            Get a quote
          </Link>

          {/* Phone & Location */}
          <div className="flex items-center gap-4">
            <BiTimeFive className="text-4xl text-zinc-800" />
            <div>
              <p className="text-2xl font-semibold">+91 6294178990</p>
            </div>
          </div>

        </div>

        {/* --- Bottom Section: Socials & Scroll to Top --- */}
        <div className="w-full pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-8">
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                aria-label={link['aria-label']}
                className="w-12 h-12 flex items-center justify-center border-2 border-zinc-800 rounded-full text-zinc-950 hover:text-orange-500 hover:border-black transition-all"
              >
                {React.cloneElement(link.icon, { size: 20 })}
              </a>
            ))}
          </div>

          {/* Scroll to Top Button */}
          <button 
            onClick={scrollToTop}
            className="flex flex-col items-center gap-1 text-zinc-800 hover:text-orange-800 cursor-pointer transition-colors"
          >
            <p className="font-semibold text-sm">Top</p>
            <IoIosArrowUp size={24} />
          </button>

        </div>
      </div>
    </footer>
  );
}