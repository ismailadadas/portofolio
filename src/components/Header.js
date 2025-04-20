import React from 'react';
import { Link } from 'gatsby';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Your Name
          </Link>
          <div className="flex space-x-4">
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              About
            </Link>
            <Link to="/work" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Work
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 