import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Moodtrackerchart = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // default to today
    const [chartData, setChartData] = useState({
        datasets: [{
            data: [],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#fb6340'],
        }],
        labels: []
    });
    const [hasData, setHasData] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/moodtracker/getmoodsfordate?date=${date}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const moodCounts = response.data.reduce((acc, mood) => {
                acc[mood.mood] = (acc[mood.mood] || 0) + 1;
                return acc;
            }, {});

            if (Object.keys(moodCounts).length > 0) {
                setChartData({
                    datasets: [{ ...chartData.datasets[0], data: Object.values(moodCounts) }],
                    labels: Object.keys(moodCounts)
                });
                setHasData(true);
            } else {
                setHasData(false);
            }
        } catch (error) {
            console.error('Failed to fetch mood data:', error);
            setHasData(false);
        }
    };

    // Fetch data on mount for the initial date
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Mood Tracker</h2>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="border-2 border-gray-300 rounded-md p-2"
                />
                <button onClick={fetchData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
            {hasData ? (
                <Pie data={chartData} />
            ) : (
                <p className="text-red-500">No mood entries found for this date.</p>
            )}
        </div>
    );
};

export default Moodtrackerchart;
