import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import '../assets/custom_todo.css';

const Todoadd = () => {
  return (
    <>
      

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
