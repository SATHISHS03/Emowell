import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { moodCountState } from '../store/atoms/state';
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
    const [moodCount, setMoodCount] = useRecoilState(moodCountState);
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
            // console.log(moodCounts)
            const moodCounts = response.data.reduce((acc, mood) => {
                acc[mood.mood] = (acc[mood.mood] || 0) + 1;
                return acc;
            }, {});
            
            const totalEntries = Object.values(moodCounts).reduce((sum, num) => sum + num, 0);

        // Update the Recoil state with the new counts and the total
        setMoodCount({
          date,
          counts: moodCounts,
          total: totalEntries
        });
            

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

    useEffect(() => {
        fetchData();
    }, []);

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14 // Adjust if necessary
                    },
                    padding: 20
                }
            }
        }
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Mood Tracker</h2>
            <div className="flex items-center justify-center gap-4 mb-4">
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button onClick={fetchData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
                    Submit
                </button>
            </div>
            {hasData ? (
                <div style={{ height: '300px' }}>
                    <Pie data={chartData} options={options} />
                </div>
            ) : (
                <p className="text-red-500">No mood entries found for this date.</p>
            )}
        </div>
    );
};

export default Moodtrackerchart;