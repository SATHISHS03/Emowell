import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
import { Bar } from 'react-chartjs-2';
import { useRecoilState } from 'recoil';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import dayjs from 'dayjs'; // For handling dates
import { dateState } from '../store/atoms/state';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SentimentBarChart = () => {
  
  const [entries, setEntries] = useState([]);
  const [dates, setDates] = useRecoilState(dateState);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [view, setView] = useState('lastWeek'); // 'lastWeek' or 'lastMonth'

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/user/allentry', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const fetchedDates = response.data.entries.map(entry => new Date(entry.date));
      setDates(fetchedDates); // Update the Recoil state with the fetched dates
      setEntries(response.data.entries);
      console.log(dates)
    };

    fetchData();
  }, []);

  useEffect(() => {
    processChartData();
  }, [view, entries]);

  const processChartData = () => {
    const filteredData = view === 'lastWeek' ? filterLastWeek(entries) : filterLastMonth(entries);
    const labels = filteredData.map(entry => dayjs(entry.date).format('DD/MM/YYYY'));
    const posData = filteredData.map(entry => entry.sentiment === "Positive" ? 1 : 0);
    const neuData = filteredData.map(entry => entry.sentiment === "Neutral" ? 1 : 0);
    const negData = filteredData.map(entry => entry.sentiment === "Negative" ? 1 : 0);

    setChartData({
      labels,
      datasets: [
        { label: 'Positive', data: posData, backgroundColor: 'rgb(75, 192, 192)' },
        { label: 'Neutral', data: neuData, backgroundColor: 'rgb(54, 162, 235)' },
        { label: 'Negative', data: negData, backgroundColor: 'rgb(255, 99, 132)' }
      ]
    });
  };

  



  const filterLastWeek = (entries) => {
    const aWeekAgo = dayjs().subtract(1, 'week');
    return entries.filter(entry => dayjs(entry.date).isAfter(aWeekAgo));
  };

  const filterLastMonth = (entries) => {
    const aMonthAgo = dayjs().subtract(1, 'month');
    return entries.filter(entry => dayjs(entry.date).isAfter(aMonthAgo));
  };
  

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Sentiment Analysis Over Time</h2>
      <div className="mb-4">
        <button
          onClick={() => setView('lastWeek')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Last Week
        </button>
        <button
          onClick={() => setView('lastMonth')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Last Month
        </button>
      </div>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default SentimentBarChart;
