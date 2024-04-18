import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Sidebar from '../components/Sidebar.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import '../assets/custom.css';
import { FaList } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

const JournalEntry = () => {
  const [date, setDate] = useState(new Date());
  const [entry, setEntry] = useState('');
  const navigate = useNavigate(); 


  const addEntry = async () => {
    // Check if entry is null, undefined, or just empty (also trims any whitespace)
    if (!entry || entry.trim() === '') {
      alert('Entry is blank');
      return; // Exit the function if the entry is invalid
    }
  
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    };
  
    try {
      // Attempt to post the journal entry to the server
      await axios.post('http://localhost:3000/api/v1/user/addentry', {
        date: date, // Use the date state
        text: entry, // Use the entry state
      }, config);
  
      // Notify the user of success
      alert('Entry added successfully');
      // Reset the date and entry states
      setDate(new Date());
      setEntry('');
    } catch (error) {
      // Handle any errors during the post operation
      alert('Failed to add entry');
      console.error(error);
    }
  };
  
  const goToEntriesPage = () => {
    navigate('entries'); // Update with your actual path
  };
  

  return (
    <div className="flex h-screen">
      <Sidebar className="1/4"/> 
    <div className="w-1/3 p-8 flex flex-col justify-between" style={{ background: 'linear-gradient(to bottom, #ee7724, #d8363a)' }}>
    <div>
    <div className="flex items-center justify-between mb-8">
        <button onClick={goToEntriesPage} className=" hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          <FaList size={30}/>
        </button>
        <h1 className="font-inter text-4xl pr-1 md:text-5xl font-bold text-white leading-tight tracking-tight">
          Journal
        </h1>
    </div>
    <div className="relative mb-6">
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        maxDate={new Date()}
        inline
        calendarClassName="react-datepicker-custom"/>
      </div>
        </div>
        <button
        onClick={addEntry}
        className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50"
        aria-label="Add journal entry"
      >
        <IoIosAddCircleOutline className="mr-2 text-xl" /> Add Entry
      </button>
      </div>
      <div className="w-3/4 bg-[#c1eda6] flex flex-col">
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
