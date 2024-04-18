// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { NewspaperIcon, HeartIcon, ClipboardListIcon, ChartBarIcon, SunIcon, EmojiHappyIcon } from '@heroicons/react/outline'; 
// import SleepTimerModal from '../components/SleepTimerModal.jsx';
// import Nav from '../components/nav.jsx';
// import '../assets/customslider.css'
// import MoodTrackerModal from '../components/showMoodModal.jsx';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar.jsx';
 

// function Dashboard() {
//   const navigate = useNavigate();
//   const [showSleepTimerModal, setShowSleepTimerModal] = useState(false);
//   const [sleepTime, setSleepTime] = useState(8); // issue
//   const [showMoodModal, setShowMoodModal] = useState(false);
//   const [selectedMood, setSelectedMood] = useState({});
//   const [moodDetails, setMoodDetails] = useState('');
//   let date = new Date()
//   const dateString = date.toISOString();

//   const moodOptions = [
//     { label: 'Happy', emoji: '😊' },
//     { label: 'Sad', emoji: '😢' },
//     { label: 'Angry', emoji: '😠' },
//     { label: 'Surprised', emoji: '😮' },
//     { label: 'Relaxed', emoji: '😌' },
//     { label: 'Worried', emoji: '😪' },
//   ];



//   const handleSetSleepTimer = async () => {
//     setShowSleepTimerModal(false); // Close modal after setting time
//     const sleepTimeData = { sleepTime };
//     const token = localStorage.getItem('token'); 
//     const config = {
//       headers: {
//         'Authorization': `Bearer ${token}` 
//       }
//     };
  
//     try {
//       await axios.post("http://localhost:3000/api/v1/sleeptimer/sleeptimer",{
//           Date: dateString,
//           sleepTime: sleepTimeData.sleepTime
//       }, config)
//       alert('Sleep cycle updated successfully')
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  

//   const handleSubmitMood = async () => {
//     console.log("Selected Mood: ", selectedMood.label, "Emoji: ", selectedMood.emoji);
//     setShowMoodModal(false);
//     const token = localStorage.getItem('token'); 
//     const config = {
//       headers: {
//         'Authorization': `Bearer ${token}` 
//       }
//     };
//     try {
//       await axios.post("http://localhost:3000/api/v1/moodtracker/addmoodtracker", {
//         Date: dateString,
//         Moodname: selectedMood.label,
//         Moodemoji: selectedMood.emoji
//       }, config)
//       alert('Mood updated successfully');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to update mood');
//     }
//     setMoodDetails(''); 
//     setSelectedMood({}); 
//   };
  


  
//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 bg-opacity-90 bg-fixed bg-cover" style={{ backgroundImage: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)' }}>
//     <Sidebar className="w-1/4"/> 
//     <div className="w-3/4 p-8">
//       <SleepTimerModal
//         isOpen={showSleepTimerModal}
//         onClose={() => setShowSleepTimerModal(false)}
//         sleepTime={sleepTime}
//         setSleepTime={setSleepTime}
//         handleSetSleepTimer={handleSetSleepTimer}/>

//       <MoodTrackerModal
//         isOpen={showMoodModal}
//         onClose={() => setShowMoodModal(false)}
//         moodOptions={moodOptions}
//         selectedMood={selectedMood}
//         setSelectedMood={setSelectedMood}
//         moodDetails={moodDetails}
//         setMoodDetails={setMoodDetails}
//         handleSubmitMood={handleSubmitMood}
//       />

//     </div>
//   </div>
// );
// }


// export default Dashboard;