import React from 'react';
// Import the image
import backgroundImage from '../assets/cover.jpg'; // Adjust the path as necessary

const App = () => {
  return (
    <div
      className="h-screen w-full bg-contain bg-center bg-no-repeat"
      // Use the imported image as the background image
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Other components will go here */}
    </div>
  );
};

export default App;
