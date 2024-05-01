import React from 'react';
import Sidebar from '../components/Sidebar';
import SentimentChart from '../components/Sentimentchart'; // Make sure this path is correct based on your project structure
import SleepQualityChart from '../components/SleepQualityChart';
import MoodTrackerChart from '../components/Moodtrackerchart';

function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 bg-opacity-90 bg-fixed bg-cover overflow-hidden">
            <Sidebar className="w-1/4" />
            <div className="w-3/4 p-8 flex flex-col">
                <h1 className="text-xl font-bold text-white mb-4">Dashboard</h1>
                <div className="flex flex-grow overflow-hidden">
                    {/* Dividing the available space into three equal parts for each chart */}
                    <div className="flex-1 p-2">
                        <SentimentChart />
                    </div>
                    <div className="flex-1 p-2">
                        <SleepQualityChart />
                    </div>
                    <div className="flex-1 p-2">
                        <MoodTrackerChart />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
