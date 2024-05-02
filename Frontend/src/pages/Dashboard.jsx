import React from 'react';
import Sidebar from '../components/Sidebar';
import SentimentChart from '../components/Sentimentchart';
import SleepQualityChart from '../components/SleepQualityChart';
import MoodTrackerChart from '../components/Moodtrackerchart';
import GaugeChart from '../components/Gauagechart'; // Ensure correct spelling and path
import Updatebar from '../components/Updatebar';

function Dashboard() {
    // Example stress level value
    const randomStressLevel = Math.round(Math.random() * 100);

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 bg-opacity-90 bg-fixed bg-cover overflow-hidden">
            <Sidebar />
            <div className="flex flex-col p-4 w-full ml-14">
                <div className="flex">
                    <div className="flex-auto p-2">
                        <Updatebar />
                    </div>
                </div>
                <div className="flex flex-grow overflow-hidden">
                    <div className="flex-1 p-4">
                        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
                            <SentimentChart />
                        </div>
                    </div>
                    <div className="flex-1 p-4">
                        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
                            <SleepQualityChart />
                        </div>
                    </div>
                </div>
                <div className="flex flex-grow overflow-hidden">
                    <div className="flex-1 p-4 ">
                        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg  p-6">
                            <MoodTrackerChart />
                        </div>
                    </div>
                    <div className="flex-1 flex-col h-64 p-4">
                        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
                        {/* <h1 className="font-bold text-2xl text-center">Stress level</h1> */}
                            {/* <GaugeChart value={randomStressLevel} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
