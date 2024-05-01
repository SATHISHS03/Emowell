import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
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
      setEntries(response.data.entries);
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
      <h2>Sentiment Analysis Over Time</h2>
      <div>
        <button onClick={() => setView('lastWeek')}>Last Week</button>
        <button onClick={() => setView('lastMonth')}>Last Month</button>
      </div>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default SentimentBarChart;
