import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Dialog } from '@headlessui/react';
import { IoIosMoon } from 'react-icons/io';
import { FiCheckCircle } from 'react-icons/fi';

const SleepTracker = () => {
  const [sleepTime, setSleepTime] = useState(8); // Default sleep time set to 8 hours
  const [isOpen, setIsOpen] = useState(false); // For modal dialog

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSleepTimeChange = (event) => {
    setSleepTime(event.target.value);
  };

  const submitSleepTime = async () => {
    const dateString = new Date().toISOString();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      await axios.post("http://localhost:3000/api/v1/sleeptimer/sleeptimer", {
        Date: dateString,
        sleepTime
      }, config);
      openModal();
    } catch (error) {
      alert('Failed to update sleep cycle');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-10">
        <div className="text-center p-6 bg-white rounded-xl shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            <IoIosMoon className="text-blue-500 mr-2"/> How Sleep Connects With Our Emotions
          </h2>
          <p className="mb-6 text-gray-700">Good sleep can improve your mood and emotional resilience, while sleep deprivation can lead to emotional volatility and stress.</p>
          <input
            type="range"
            min="0"
            max="12"
            value={sleepTime}
            onChange={handleSleepTimeChange}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-lg font-medium text-gray-800 mt-4">
            Sleep Time: {sleepTime} hours
          </div>
          <button
            onClick={submitSleepTime}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Sleep Cycle Updated
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Your sleep cycle has been updated successfully!
            </p>
            <button
              onClick={closeModal}
              className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              <FiCheckCircle className="mr-2" /> Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SleepTracker;
