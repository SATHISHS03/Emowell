import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JournalEntry from './pages/Journal';
import {ProtectedRoute} from './components/ProtectedRoute';
import Entries from './pages/Entries';
import Todo from './pages/Todo';
import Sleeptracker from './pages/SleepTracker';
import Moodtracker from './pages/MoodTracker'
import Recommendation from './pages/Recomadation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/emowell/signup" element={<Signup />} />
        <Route path="/emowell/signin" element={<Signin />} />
        <Route path="/emowell/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/emowell/journal" element={
          <ProtectedRoute>
            <JournalEntry />
          </ProtectedRoute>
        } />
        <Route path="/emowell/journal/entries" element={
          <ProtectedRoute>
            <Entries/>
          </ProtectedRoute>
        } />
        <Route path="/emowell/Todo" element={
          <ProtectedRoute>
            <Todo/>
          </ProtectedRoute>
        } />
        <Route path="/emowell/Sleeptracker" element={
          <ProtectedRoute>
            <Sleeptracker/>
          </ProtectedRoute>
        } />
        <Route path="/emowell/Moodtracker" element={
          <ProtectedRoute>
            <Moodtracker/>
          </ProtectedRoute>
        } />
        <Route path="/emowell/Reccomadaiton" element={
          <ProtectedRoute>
            <Recommendation/>
          </ProtectedRoute>
        } />
        {/* Redirect users trying to access an undefined route */}
        <Route path="*" element={<Signin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
