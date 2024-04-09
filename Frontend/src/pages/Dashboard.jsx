import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewspaperIcon, HeartIcon, ClipboardListIcon, ChartBarIcon, SunIcon, EmojiHappyIcon } from '@heroicons/react/outline'; 
import SleepTimerModal from '../components/SleepTimerModal.jsx';
import Nav from '../components/nav.jsx';
import '../assets/customslider.css'
import MoodTrackerModal from '../components/showMoodModal.jsx';
import axios from 'axios';


function Dashboard() {
  const navigate = useNavigate();
  const [showSleepTimerModal, setShowSleepTimerModal] = useState(false);
  const [sleepTime, setSleepTime] = useState(8); // issue
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState({});
  const [moodDetails, setMoodDetails] = useState('');
  let date = new Date()
  const dateString = date.toISOString();

  const moodOptions = [
    { label: 'Happy', emoji: '😊' },
    { label: 'Sad', emoji: '😢' },
    { label: 'Angry', emoji: '😠' },
    { label: 'Surprised', emoji: '😮' },
    { label: 'Relaxed', emoji: '😌' },
    { label: 'Worried', emoji: '😪' },
  ];

  const handleFeatureClick = (feature) => {
    if (feature.name === 'SleepTimer') {
      setShowSleepTimerModal(true);
    } else if (feature.name === 'MoodTracker') {
      setShowMoodModal(true);
    } else if (feature.path.startsWith('http')) {
      window.location.href = feature.path;
    } else {
      navigate(feature.path);
    }
  };

  const handleSetSleepTimer = async () => {
    setShowSleepTimerModal(false); // Close modal after setting time
    const sleepTimeData = { sleepTime };
    const token = localStorage.getItem('token'); 
    const config = {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    };
  
    try {
      await axios.post("http://localhost:3000/api/v1/sleeptimer/sleeptimer",{
          Date: dateString,
          sleepTime: sleepTimeData.sleepTime
      }, config)
      alert('Sleep cycle updated successfully')
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleSubmitMood = async () => {
    console.log("Selected Mood: ", selectedMood.label, "Emoji: ", selectedMood.emoji);
    setShowMoodModal(false);
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
      }, config)
      alert('Mood updated successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update mood');
    }
    setMoodDetails(''); 
    setSelectedMood({}); 
  };
  

  const features = [
    { name: 'Journal', Icon: NewspaperIcon, path: '/emowell/Journal' },
    { name: 'SleepTimer', Icon: HeartIcon, path: '' },
    { name: 'Todo', Icon: ClipboardListIcon, path: '/emowell/todo' },
    { name: 'Analytics', Icon: ChartBarIcon, path: '/emowell/analytics' },
    { name: 'Meditation', Icon: SunIcon, path: 'http://localhost:3001/chakra-app/' },
    { name: 'MoodTracker', Icon: EmojiHappyIcon, path: '' }, // New feature: Mood Tracker
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 bg-opacity-90 bg-fixed bg-cover" style={{backgroundImage: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'}}>
      <Nav />       
       <SleepTimerModal
        isOpen={showSleepTimerModal}
        onClose={() => setShowSleepTimerModal(false)}
        sleepTime={sleepTime}
        setSleepTime={setSleepTime}
        handleSetSleepTimer={handleSetSleepTimer}/>

      <MoodTrackerModal
        isOpen={showMoodModal}
        onClose={() => setShowMoodModal(false)}
        moodOptions={moodOptions}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        moodDetails={moodDetails}
        setMoodDetails={setMoodDetails}
        handleSubmitMood={handleSubmitMood}
      />

      <div className="pt-8 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="transform hover:scale-105 transition duration-500 rounded-xl overflow-hidden shadow-xl bg-white/70 hover:bg-opacity-90 backdrop-blur-lg cursor-pointer" onClick={() => handleFeatureClick(feature)}>
            <div className="flex flex-col items-center justify-center p-10">
              <feature.Icon className="h-20 w-20 mb-4 text-blue-500 transition duration-500 ease-in-out hover:text-blue-700" aria-hidden="true" />
              <div className="font-bold text-2xl text-gray-800">{feature.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;