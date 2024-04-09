import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Entries() {
  const [entries, setEntries] = useState([]);
  const [filterDate, setFilterDate] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc'); // New state for sort order

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/allentry', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEntries(response.data.entries);
      } catch (error) {
        console.error("Failed to fetch entries", error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Journal Entries</h1>
      
      {/* Sort Order Toggle */}
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
        >
          Sort {sortOrder === 'desc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      {/* DatePicker for filtering entries */}
      <div className="flex justify-center mb-8">
        <DatePicker
          selected={filterDate}
          onChange={(date) => setFilterDate(date)}
          dateFormat="MMMM d, yyyy"
          isClearable
          placeholderText="Filter by date"
          className="p-2 border rounded"
        />
      </div>

      <div className="flex flex-col gap-6">
        {entries.length > 0 ? (
          entries
            .sort((a, b) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            })
            .filter(entry => {
              if (!filterDate) return true;
              const entryDate = new Date(entry.date).setHours(0, 0, 0, 0);
              const selectedFilterDate = new Date(filterDate).setHours(0, 0, 0, 0);
              return entryDate === selectedFilterDate;
            })
            .map((entry, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">{format(new Date(entry.date), 'PPP')}</h2>
                </div>
                <div className="text-gray-600 mt-4" dangerouslySetInnerHTML={{ __html: entry.text }}></div>
              </div>
            ))
        ) : (
          <div className="text-center text-gray-500">No entries found.</div>
        )}
      </div>
    </div>
  );
}
