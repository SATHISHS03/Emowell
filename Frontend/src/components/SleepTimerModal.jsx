// SleepTimerModal.jsx
import React from 'react';

const SleepTimerModal = ({ isOpen, onClose, sleepTime, setSleepTime, handleSetSleepTimer }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Check if the click is on the backdrop; if yes, close the modal
    if (e.target.id === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div id="modal-backdrop" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={handleBackdropClick}>
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 my-8 relative animate-scaleUp" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b-2 border-blue-500 pb-3">
          <span className="text-2xl font-bold text-blue-500">Sleep Tracker</span>
          <button onClick={onClose} className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition duration-150 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-xl font-medium text-gray-800 mt-5">Set Your Sleep Time</div>
        <div className="slider-container">
          <input type="range" min="1" max="10" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} className="slider" />
        </div>
        <div className="time-display">Time: {sleepTime} Hours</div>
        <button onClick={handleSetSleepTimer} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Set Timer
        </button>
      </div>
    </div>
  );
};

export default SleepTimerModal;
