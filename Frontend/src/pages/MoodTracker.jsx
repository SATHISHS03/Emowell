import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  // Define mood options
  const moodOptions = [
    { label: 'Happy', emoji: '😊' },
    { label: 'Sad', emoji: '😢' },
    { label: 'Angry', emoji: '😠' },
    { label: 'Surprised', emoji: '😲' }
  ];

  // Handle mood selection
  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  // Handle submit mood
  const handleSubmitMood = async () => {
    const dateString = new Date().toISOString();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      await axios.post("http://localhost:3000/api/v1/moodtracker/addmoodtracker", {
        Date: dateString,
        Moodname: selectedMood.label,
        Moodemoji: selectedMood.emoji
      }, config);
      alert('Mood updated successfully');
      setSelectedMood(null);  // Reset the selection
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update mood');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-10">
        <div className="text-center p-6 bg-white rounded-xl shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">How are you feeling?</h2>
          <div className="grid grid-cols-3 gap-4 p-4">
            {moodOptions.map((mood) => (
              <button key={mood.label} onClick={() => handleMoodClick(mood)}
                className={`mood-btn flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ease-in-out border-2 ${selectedMood && selectedMood.label === mood.label ? 'border-blue-500 bg-blue-100' : 'border-transparent hover:bg-gray-100'}`}>
                <div className="emoji text-4xl">{mood.emoji}</div>
                <div className="text-sm">{mood.label}</div>
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmitMood}
            disabled={!selectedMood}
            className={`mt-4 w-full font-bold py-2 px-4 rounded ${selectedMood ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}
          >
            Submit Mood
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
