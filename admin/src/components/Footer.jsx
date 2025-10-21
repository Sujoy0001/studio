import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-black shadow-inner py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Revox Studio. All rights reserved.</p>
      </div>
    </footer>
  );
};

