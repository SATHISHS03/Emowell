import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import '../assets/custom_todo.css';

const Todoadd = () => {
  return (
    <>
      {/* Full-sized Navbar */}
      <nav className="bg-gradient-to-r from-pink-600 via-red-500 to-yellow-400 shadow-xl  p-4 flex justify-between items-center">
        {/* Home Button on the left */}
        <Link to="/" className="text-white text-lg font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </Link>
        
        {/* Placeholder for potential future navbar items */}
        <div></div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto  text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-yellow-400 p-4 rounded-lg shadow-xl animate-pulse">
          TO-DO List
        </h1>
        <p className="text-xl font-semibold text-gray-800 mt-4 animate-fadeInUp">
          Slide into your tasks and get things done with this interactive list.
        </p>
      </div>
    </>
  );
};

export default Todoadd;
