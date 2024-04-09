import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import '../assets/custom.css';


const JournalEntry = () => {
  const [date, setDate] = useState(new Date());
  const [entry, setEntry] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const addEntry = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const config = {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    };
  
  
    try {
      await axios.post('http://localhost:3000/api/v1/user/addentry', {
        date: date,
        text: entry,
      }, config); // Pass config as the third argument to include headers
      alert('Entry added successfully');
      // Reset form or redirect as needed
      // Optionally, clear the state to reset the form fields
      setDate(new Date());
      setEntry('');
    } catch (error) {
      alert('Failed to add entry');
      console.error(error);
    }
  };
  const goToEntriesPage = () => {
    navigate('entries'); // Update with your actual path
  };
  

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-1/3 p-8 flex flex-col justify-between" style={{ background: 'linear-gradient(to bottom, #ee7724, #d8363a)' }}>
  <div>
    {/* Flex container for aligning icon and text */}
    <div className="flex items-center justify-around mb-8">
      {/* Wrapped home icon in Link with larger size */}
      <Link to="/emowell/dashboard" className="inline-flex mr-4"> {/* Adjust the margin as needed */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-white"> {/* Increased size */}
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </Link>
      
      <h1 className="font-inter text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
        Journal
      </h1>
      <button onClick={goToEntriesPage} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Entries
            </button>
        
    </div>

    <div className="relative mb-6">
      {/* Calendar Component */}
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        inline
        calendarClassName="react-datepicker-custom"
      />
          </div>
        </div>
        <button onClick={addEntry} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Add Entry
        </button>
      </div>

      {/* Right Panel */}
      <div className="w-2/3 bg-[#c1eda6] flex flex-col">
        <div className="bg-[#a8e063] px-8 py-4 border-b-4 border-green-900 flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-green-900">
            "Your Day, Your Words, Your World."
          </h2>
          <span className="text-sm font-bold text-green-900 bg-white py-1 px-2 rounded-lg shadow">
            "Capture your Day, Unleash Your Potential."
          </span>
        </div>
        <div className="flex-grow p-8 overflow-hidden">
          <ReactQuill
            theme="snow"
            value={entry}
            onChange={setEntry}
            modules={JournalEntry.modules}
            formats={JournalEntry.formats}
            placeholder='Enter a journal entry'
            className="h-full react-quill-custom"
            style={{ backgroundColor: '#fffffe' }}
          />
        </div>
        <div className="bg-[#a8e063] p-2 text-sm italic text-right text-green-900">
          SUGGESTED DURATION: 20 MINS
        </div>
      </div>
    </div>
  );
};

/* React Quill modules and formats */
JournalEntry.modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],   
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
  ]
};

JournalEntry.formats = [
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'header', 'list', 'bullet', 'script', 'indent',
  'size', 'header', 'color', 'align',
  'link'
];

export default JournalEntry;
