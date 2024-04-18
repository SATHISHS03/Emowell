import React from 'react';


import Sidebar from '../components/Sidebar.jsx';
 

function Dashboard() {


  
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 bg-opacity-90 bg-fixed bg-cover" style={{ backgroundImage: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)' }}>
    <Sidebar className="w-1/4"/> 
    <div className="w-3/4 p-8">
      Main content
    </div>
  </div>
);
}


export default Dashboard;