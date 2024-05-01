import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary ChartJS components
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
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Hours Slept',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1 // Smooths the line
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/sleeptimer/getLatestSleepTime', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                console.log(response.data,"data");
                const dates = response.data.map(entry => new Date(entry.date).toLocaleDateString());
                const sleepTimes = response.data.map(entry => entry.sleepTime);

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
            } catch (error) {
                console.error('Error fetching sleep data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-center">Sleep Time Trends</h2>
            <Line data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
        </div>
    );
};

export default SleepDataLineChart;
