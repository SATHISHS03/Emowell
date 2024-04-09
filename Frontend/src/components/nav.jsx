import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../assets/custom.css'
import {jwtDecode} from 'jwt-decode';
function Nav() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const token = localStorage.getItem('token');
  let username = '';
  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.username; // Assuming the payload contains a 'username' field
  }

  const { logout } = useAuth(); // Destructure logout from useAuth
  const togglePopup = () => setIsPopupVisible(!isPopupVisible);
  const handleLogout = () => {
    logout();
    togglePopup(); // Optionally close the popup
    // Navigate to sign-in page, consider using useNavigate() here
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-white/90 backdrop-blur-md p-4 shadow-lg rounded-xl">
        <div className="flex items-center">
          <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="Emowell Logo" className="h-12 w-auto mr-3 rounded-full" />
          <span className="text-2xl font-bold text-black">Emowell</span>
        </div>
        <button onClick={togglePopup} className="text-xl font-semibold text-black focus:outline-none focus:shadow-outline">
          Hello,{username} 
          <i className="fas fa-chevron-down ml-2"></i>
        </button>
      </nav>

      {/* Popup and backdrop */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center animate-fadeIn">
          <div className="bg-white p-5 rounded-lg shadow-xl max-w-sm w-full mx-4 my-8 animate-scaleUp">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-lg font-medium text-gray-900">Account Settings</span>
              <button onClick={togglePopup} className="text-gray-600 text-lg font-bold hover:text-gray-900">&times;</button>
            </div>
            <div className="mt-3 text-sm">
              <a  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out">
                <button  >Update profile</button>
              </a>
              <a  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out">
                <button onClick={handleLogout} >
              Sign Out
            </button>
            </a>
            
               
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
