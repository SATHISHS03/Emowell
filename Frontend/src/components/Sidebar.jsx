import React from "react";
import { useNavigate } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { BsJournalText } from "react-icons/bs";
import { LuListTodo } from "react-icons/lu";
import { GiNightSleep, GiMeditation } from "react-icons/gi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoSettingsOutline, IoRemoveOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

function Tooltip({ children, label }) {
    return (
        <div className="relative flex items-center">
            <div className="group">
                {children}
                <span className="absolute left-full bottom-3/4 translate-y-1/2 ml-2 px-3 py-1 text-md font-medium text-white bg-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out" style={{ zIndex: 50 }}>
                    {label}
                </span>
            </div>
        </div>
    );
}


function Sidebar() {
    const navigate = useNavigate();
    const size_prop = 23; // Icon size controlled via a single variable for consistency

    const mainIcons = [
        { Icon: GoHome, label: "Home", path: '/emowell/home' },
        { Icon: BsJournalText, label: "Journal", path: '/emowell/Journal' },
        { Icon: LuListTodo, label: "Tasks", path: '/emowell/todo' },
        { Icon: GiNightSleep, label: "SleepTracker", path: '' }, // Assuming no path set
        { Icon: GiMeditation, label: "Meditation", path: 'http://localhost:3001/chakra-app/' },
        { Icon: MdOutlineEmojiEmotions, label: "MoodTracker", path: '' } // Assuming no path set
    ];

    const settingIcons = [
        { Icon: IoSettingsOutline, label: "Settings", path: '/emowell/settings' },
        { Icon: IoRemoveOutline, label: "" }, // Set label to empty for IoRemoveOutline
        { Icon: FiLogOut, label: "LogOut", path: '/logout' } // Assuming a logout path
    ];

    const handleClick = (path) => {
        if (path.startsWith('http')) {
            window.location.href = path;
        } else {
            navigate(path);
        }
    };

    return (
        <div className="h-screen w-14 bg-gray-800 text-white flex flex-col justify-between">
            <div className="mt-1 mb-5">
                <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="Emowell Logo" className="h-12 w-auto mb-3 rounded-full" />
            </div>
            <div className="flex flex-col h-full items-center">  
                {mainIcons.map(({ Icon, label, path }) => (
                    <Tooltip label={label} key={label}>
                        <Icon size={size_prop} className="mb-6 hover:text-gray-600 cursor-pointer" onClick={() => handleClick(path)} />
                    </Tooltip>
                ))}
            </div>
            <div className="flex flex-col items-center mb-5">  
                {settingIcons.map(({ Icon, label, path }) => (
                    label ? (
                        <Tooltip label={label} key={label}>
                            <Icon size={size_prop} className="mb-2 hover:text-gray-600  cursor-pointer" onClick={() => handleClick(path)} />
                        </Tooltip>
                    ) : (
                        <Icon size={size_prop} className="mb-2 cursor-pointer" key={label} onClick={() => handleClick(path)} />
                    )
                ))}
            </div>
        </div>
    );
}

export default Sidebar;