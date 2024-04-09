// MoodTrackerModal.jsx
import React from 'react';

const MoodTrackerModal = ({ isOpen, onClose, moodOptions, selectedMood, setSelectedMood, moodDetails, setMoodDetails, handleSubmitMood }) => {
  if (!isOpen) return null;

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" style={{backdropFilter: 'blur(10px)'}}>
      <div className={`bg-white p-5 rounded-xl shadow-2xl max-w-md w-full mx-4 my-8 ${selectedMood.label ? `bg-mood-${selectedMood.label.toLowerCase()}` : ''}`} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3">
          <span className="text-lg font-medium text-gray-900">How are you feeling?</span>
          <button onClick={onClose} className="text-gray-600 text-lg font-bold hover:text-gray-900">&times;</button>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          {moodOptions.map((mood) => (
            <button key={mood.label} onClick={() => handleMoodClick(mood)}
              className={`mood-btn p-2 rounded-xl transition-all duration-200 ease-in-out ${selectedMood.label === mood.label ? 'border-gradient' : 'hover:bg-gray-100'}`}>
              <div className="emoji text-4xl transition-transform">{mood.emoji}</div>
              <div>{mood.label}</div>
            </button>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={handleSubmitMood} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Submit Mood
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodTrackerModal;
