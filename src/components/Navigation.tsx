import React, { useState } from "react";

const Navigation: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Logo</div>
        <div className="lg:hidden">
          {/* Hamburger menu icon/button */}
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-300 focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`lg:flex items-center space-x-4 ${
            isMenuOpen ? "hidden" : "hidden" // Apply "hidden" class if isMenuOpen is true
          }`}>
          {/* Regular navigation links for larger screens */}
          <a href="#" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Services
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Contact
          </a>
        </div>
        {/* Dropdown menu for smaller screens */}
        {isMenuOpen && (
          <div className="block lg:hidden">
            <a href="#" className="text-white hover:text-gray-300 block py-2">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-300 block py-2">
              About
            </a>
            <a href="#" className="text-white hover:text-gray-300 block py-2">
              Services
            </a>
            <a href="#" className="text-white hover:text-gray-300 block py-2">
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
