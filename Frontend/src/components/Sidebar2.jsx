import React , { useState } from "react";
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
function LogoutModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h4 className="font-bold text-lg text-black">Confirm Logout</h4>
                <p className="text-black">Are you sure you want to log out?</p>
                <div className="flex justify-end gap-4 mt-4 text-black">
                    <button className="px-4 py-2 rounded bg-red-500 text-white" onClick={onConfirm}>Logout</button>
                    <button className="px-4 py-2 rounded bg-gray-300" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}


function Sidebar() {
    const navigate = useNavigate();
    const size_prop = 23; // Icon size controlled via a single variable for consistency
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const mainIcons = [
        { Icon: GoHome, label: "Home", path: '/emowell/dashboard' },
        { Icon: BsJournalText, label: "Journal", path: '/emowell/Journal' },
        { Icon: LuListTodo, label: "Tasks", path: '/emowell/todo' },
        { Icon: GiNightSleep, label: "SleepTracker", path: '/emowell/Sleeptracker' },
        { Icon: GiMeditation, label: "Meditation", path: 'http://localhost:3001/chakra-app/' },
        { Icon: MdOutlineEmojiEmotions, label: "MoodTracker", path: '/emowell/Moodtracker' }
    ];

    const settingIcons = [
        { Icon: IoSettingsOutline, label: "Settings", path: '/emowell/settings' },
        { Icon: IoRemoveOutline, label: "" },
        { Icon: FiLogOut, label: "LogOut", path: '/logout' }
    ];

    const handleClick = (path) => {
        if (path === '/logout') {
            setIsLogoutModalOpen(true);
        } else if (path.startsWith('http')) {
            window.location.href = path;
        } else {
            navigate(path);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        navigate('/signin'); // Redirect to signin page
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
            <LogoutModal 
                isOpen={isLogoutModalOpen} 
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout} 
            />
        </div>
    );
}

export default Sidebar;

