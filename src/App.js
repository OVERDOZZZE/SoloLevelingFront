// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
