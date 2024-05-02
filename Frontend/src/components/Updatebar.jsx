import React, { useState, useEffect } from 'react';
import { BsJournalText } from "react-icons/bs";
import { GiNightSleep } from "react-icons/gi";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const Updatebar = () => {
    const [diaryEntries, setDiaryEntries] = useState({
        sentiment: false,
        sleep: null,
        moodEntries: 0
    });

    useEffect(() => {
        setDiaryEntries({
            sentiment: true,
            sleep: 7.5,
            moodEntries: 2
        });
    }, []);
  return (
    <>
         <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
                <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-5">Today's Update</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-indigo-500 rounded-lg p-4 text-white shadow-md flex items-center justify-start">
                            <BsJournalText size="2em" className="mr-4 text-white" />
                            <div className="flex-1">
                                {diaryEntries.sentiment ?
                                    <p className="text-white font-semibold">Entry completed!</p> :
                                    <p className="text-yellow-200 font-semibold shadow-md animate-pulse">Add your entry.</p>}
                            </div>
                        </div>
                        <div className="bg-purple-700 rounded-lg p-4 text-white shadow-md flex items-center justify-start">
                            <GiNightSleep size="2em" className="mr-4 text-white" />
                            <div className="flex-1">
                                {diaryEntries.sleep ?
                                    <p className="text-white font-semibold">{diaryEntries.sleep} hours</p> :
                                    <p className="text-yellow-200 font-semibold shadow-md animate-pulse">Add your sleep data.</p>}
                            </div>
                        </div>
                        <div className="bg-blue-900 rounded-lg p-4 text-white shadow-md flex items-center justify-start">
                            <MdOutlineEmojiEmotions size="2em" className="mr-4 text-white" />
                            <div className="flex-1">
                                {diaryEntries.moodEntries > 0 ?
                                    <p className="text-white font-semibold">{diaryEntries.moodEntries} entries today.</p> :
                                    <p className="text-yellow-200 font-semibold shadow-md animate-pulse">Update your mood entries.</p>}
                            </div>
                        </div>
                    </div>
                </div>
    </>
  )
}

export default Updatebar