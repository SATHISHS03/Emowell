import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState } from 'recoil';
import Sidebar from '../components/Sidebar.jsx';
import { dateState } from '../store/atoms/state.js';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faEye, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
Modal.setAppElement('#root');

export default function Entries() {
  const [entries, setEntries] = useState([]);
  const [filterDate, setFilterDate] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [dates, setDates] = useRecoilState(dateState);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [currentEntryText, setCurrentEntryText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/api/v1/user/allentry', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEntries(response.data.entries);
      const fetchedDates = response.data.entries.map(entry => new Date(entry.date));
      setDates(fetchedDates); // Update the Recoil state with the fetched dates
    } catch (error) {
      console.error("Failed to fetch entries", error);
    }
  };

  const deleteEntry = async (entryId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/v1/user/dentry/${entryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchEntries(); // Refresh entries after deletion
    } catch (error) {
      console.error("Failed to delete entry", error);
    }
  };

  const openTextModal = (text) => {
    const sanitizedText = DOMPurify.sanitize(text);
    setCurrentEntryText(sanitizedText);
    setIsTextModalOpen(true);
  };

  const closeTextModal = () => {
    setIsTextModalOpen(false);
  };

  const analyzeText = async (text) => {
    try {
      const response = await axios.post('http://localhost:5000/analyze', { text }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setAnalysisResult(response.data);
      setIsAnalysisModalOpen(true);
      setIsTextModalOpen(false); // Optionally close the text modal if it was open
    } catch (error) {
      console.error("Failed to analyze text", error);
      setAnalysisResult({ error: "Failed to analyze text" });
    }
  };

  const closeAnalysisModal = () => {
    setIsAnalysisModalOpen(false);
  };

  
  
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="sticky top-0 h-full">
        <Sidebar />
      </div>
      <div className="flex-grow overflow-auto p-5">
        <div className="max-w-4xl mx-auto mt-10">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Journal Entries</h1>
          
          <div className="flex justify-between items-center mb-6">
            <DatePicker
              selected={filterDate}
              onChange={(date) => setFilterDate(date)}
              dateFormat="MMMM d, yyyy"
              isClearable
              placeholderText="Filter by date"
              className="form-input p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            >
              Sort {sortOrder === 'desc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
  
          {entries.length > 0 ? (
            entries
              .sort((a, b) => sortOrder === 'desc' ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime())
              .filter(entry => !filterDate || new Date(entry.date).setHours(0, 0, 0, 0) === new Date(filterDate).setHours(0, 0, 0, 0))
              .map((entry, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out mb-4">
                  <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-semibold text-gray-800">{format(new Date(entry.date), 'PPP')}</h2>
                    <div>
                      <button
                        className='bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded transition duration-300 ease-in-out mr-2'
                        onClick={() => openTextModal(entry.text)}
                      >
                        <FontAwesomeIcon icon={faEye} /> {/* View icon */}
                      </button>
                      <button
                        className='bg-green-500 mr-1 hover:bg-green-700 text-white px-3 py-1 rounded transition duration-300 ease-in-out'
                        onClick={() => analyzeText(entry.text)}
                      >
                        <FontAwesomeIcon icon={faSearch} /> {/* Analyze icon */}
                      </button>
                      <button
                        className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded transition duration-300 ease-in-out'
                        onClick={() => deleteEntry(entry._id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> {/* Delete icon */}
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center text-gray-500">No entries found.</div>
          )}
          <Modal
  isOpen={isAnalysisModalOpen}
  onRequestClose={closeAnalysisModal}
  contentLabel="Entry Text and Analysis"
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-8 bg-white rounded-lg shadow-xl outline-none"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
  <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-6">
    <span className="material-icons-outlined text-blue-500 mr-2">analytics</span>
    Analysis Results
  </h2>
  {analysisResult ? (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg shadow">
        <div className="flex items-center">
          <span className="material-icons-outlined text-blue-500 mr-2">sentiment_very_satisfied</span>
          <strong className="text-lg">Sentiment: </strong>
        </div>
        <span className={`${analysisResult.vader_sentiment === 'Positive' ? 'text-green-600' : 'text-red-600'} font-bold text-xl`}>
          {analysisResult.vader_sentiment}
        </span>
      </div>

      <div className="p-4 bg-orange-100 rounded-lg shadow">
        <h3 className="flex items-center mb-2 text-lg font-semibold">
          <span className="material-icons-outlined text-orange-500 mr-2">groups</span>
          Named Entities
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          {analysisResult.named_entities.map(entity => (
            <li key={entity.text} className="text-gray-700">{`${entity.text} (${entity.type})`}</li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-purple-100 rounded-lg shadow">
        <h3 className="flex items-center mb-2 text-lg font-semibold">
          <span className="material-icons-outlined text-purple-500 mr-2">auto_stories</span>
          Significant Words
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          {analysisResult.significant_words.map(word => (
            <li key={word.word} className="text-gray-700">{`${word.word}: ${word.significance} (${word.polarity.toFixed(2)})`}</li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="text-center p-4 bg-red-100 rounded-lg text-red-600">
      <span className="material-icons-outlined text-red-500 mr-2">error_outline</span>
      No analysis results.
    </div>
  )}
  <div className="mt-6">
    <button
      onClick={closeAnalysisModal}
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Close
    </button>
  </div>
</Modal>

<Modal
isOpen={isTextModalOpen}
onRequestClose={closeTextModal}
contentLabel="Entry Text"
className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-5 bg-white rounded-lg shadow-xl outline-none"
overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
<h2 className="text-xl font-semibold text-gray-800">Entry Text</h2>
<div className="mt-4 mb-6" dangerouslySetInnerHTML={{ __html: currentEntryText }}></div>
<button
  onClick={closeTextModal}
  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
  Close
</button>
</Modal>
<Modal
isOpen={isAnalysisModalOpen}
onRequestClose={closeAnalysisModal}
contentLabel="Entry Text and Analysis"
className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-5 bg-white rounded-lg shadow-xl outline-none"
overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
<h2 className="text-xl font-semibold text-gray-800">Analysis Results</h2>
{analysisResult ? (
  <div className="mt-2 mb-6">
    {console.log(analysisResult)}
    <div><strong>Sentiment:</strong> {analysisResult.vader_sentiment}</div>
    <div><strong>Named Entities:</strong> {JSON.stringify(analysisResult.named_entities)}</div>
    <div><strong>Significant Words:</strong> {JSON.stringify(analysisResult.significant_words)}</div>
  </div>
) : (
  <div className="text-red-500">No analysis results.</div>
)}
<button
  onClick={closeAnalysisModal}
  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
  Close
</button>
</Modal>

        </div>
      </div>
    </div>
  );
  
  
}  