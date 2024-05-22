import React from 'react';
import { BsJournalText } from "react-icons/bs";
import { GiNightSleep } from "react-icons/gi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useRecoilValue } from 'recoil';
import { dateState, moodCountState, sleeptimeState } from '../store/atoms/state';

const Updatebar = () => {
    const sleeptime = useRecoilValue(sleeptimeState); // Direct use without destructuring
    const { total: moodEntries } = useRecoilValue(moodCountState);
    const dateArray = useRecoilValue(dateState);
    
    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Check if today's date is in the dateArray
    const sentiment = dateArray.some(date => new Date(date).toISOString().split('T')[0] === today);

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-5">Today's Update</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-indigo-500 rounded-lg p-4 text-white shadow-md flex items-center justify-start">
                        <BsJournalText size="2em" className="mr-4 text-white" />
                        <div className="flex-1">
                            <p className="text-white font-semibold">{sentiment ? "Entry completed!" : "Add your entry."}</p>
                        </div>
                    </div>
                    <div className="bg-purple-700 rounded-lg p-4 text-white shadow-md flex items-center justify-start">
                        <GiNightSleep size="2em" className="mr-4 text-white" />
                        <div className="flex-1">
                            <p className="text-white font-semibold">{sleeptime ? `${sleeptime} hours` : "Add your sleep data."}</p>
                        </div>
                    </div>
                    <div className="bg-blue-900 rounded-lg p-4 text-white shadow-md flex items-center justify-start">
                        <MdOutlineEmojiEmotions size="2em" className="mr-4 text-white" />
                        <div className="flex-1">
                            <p className="text-white font-semibold">{moodEntries > 0 ? `${moodEntries} entries today.` : "Update your mood entries."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Updatebar;
