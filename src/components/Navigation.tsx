import {
  AiOutlineNotification,
  AiOutlineMessage,
  AiOutlineUser,
  AiOutlineHome,
} from "react-icons/ai";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 p-4 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white font-bold text-xl"
          title="Business Solution Center">
          Logo
        </Link>
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
          <Link
            to="/"
            className="text-white hover:text-gray-300 focus:outline-none"
            title="Home">
            <AiOutlineHome size={20} /> {/* Home icon */}
          </Link>
          <button
            className="text-white hover:text-gray-300 focus:outline-none"
            title="Notifications">
            <AiOutlineNotification size={20} /> {/* Notification icon */}
          </button>
          <button
            className="text-white hover:text-gray-300 focus:outline-none"
            title="Messages">
            <AiOutlineMessage size={20} /> {/* Chat icon */}
          </button>
          <button
            className="text-white hover:text-gray-300 focus:outline-none"
            title="Profile">
            <AiOutlineUser size={20} /> {/* Profile icon */}
          </button>
        </div>
        {/* Dropdown menu for smaller screens */}
        {isMenuOpen && (
          <div className="block lg:hidden">
            <button
              className="text-white hover:text-gray-300 focus:outline-none mr-3"
              title="Home">
              <AiOutlineHome size={20} /> {/* Home icon */}
            </button>
            <button
              className="text-white hover:text-gray-300 focus:outline-none mr-3"
              title="Notifications">
              <AiOutlineNotification size={20} /> {/* Notification icon */}
            </button>
            <button
              className="text-white hover:text-gray-300 focus:outline-none mr-3"
              title="messages">
              <AiOutlineMessage size={20} /> {/* Chat icon */}
            </button>
            <button
              className="text-white hover:text-gray-300 focus:outline-none mr-3"
              title="Profile">
              <AiOutlineUser size={20} /> {/* Profile icon */}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
