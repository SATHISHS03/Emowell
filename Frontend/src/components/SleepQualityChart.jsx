import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { sleeptimeState } from '../store/atoms/state';
import { useRecoilState } from 'recoil';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const SleepDataLineChart = () => {
    const [sleeptime, setSleeptime] = useRecoilState(sleeptimeState);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Hours Slept',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/sleeptimer/getLatestSleepTime', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                console.log(response.data);
                const dates = response.data.map(entry => new Date(entry.date).toISOString().split('T')[0]);
                const sleepTimes = response.data.map(entry => parseFloat(entry.sleepTime));
    
                setChartData({
                    labels: dates,
                    datasets: [{
                        label: 'Hours Slept',
                        data: sleepTimes,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                });
    
                // Determine today's date in ISO format (YYYY-MM-DD)
                const today = new Date().toISOString().split('T')[0];
                const todayIndex = dates.findIndex(date => date === today);
                console.log(todayIndex)
    
                // If today's sleep time exists, update Recoil state
                if (todayIndex !== -1) {
                    setSleeptime(sleepTimes[todayIndex]);
                } else {
                    // Optionally, clear or set a default value if no entry for today
                    setSleeptime(null);
                }
    
            } catch (error) {
                console.error('Error fetching sleep data:', error);
            }
        };
    
        fetchData();
    }, [setSleeptime]);
    
    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">Sleep Time Trends</h2>
            <Line data={chartData} options={{
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 20,
                            font: {
                                size: 14
                            }
                        }
                    }
                }
            }} />
        </div>
    );
};

export default SleepDataLineChart;
