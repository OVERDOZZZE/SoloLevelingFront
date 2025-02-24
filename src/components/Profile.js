// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:8000/api/users/users/1/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}` // Fixed template literal syntax
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json();
    })
    .then(data => setUser(data))
    .catch(err => setError('Failed to load profile. Please try again.'));
  }, [navigate]);

  if (error) {
    return <div className="profile-container"><p>{error}</p></div>;
  }

  if (!user) {
    return <div className="profile-container"><p>Loading...</p></div>;
  }

  if (!user.email) {
    user.email = 'No email';
  }

  if (!user.bio) {
    user.bio = 'No bio';
  }

  if (!user.date_of_birth) {
    user.date_of_birth = 'Not indicated';
  }
    
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <img src={user.user_image} alt="Profile" className="profile-image" />
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
      <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
      <p><strong>Overall Experience:</strong> {user.overall_exp} EXP</p>
      <div className="level-container" style={{ backgroundImage: `url(${user.level.level_image})` }}>
        <p className="level-text">
          <strong>Level:</strong> {user.level.level_number}. {user.level.name}
        </p>
      </div>
    </div>
    
  );
};

export default Profile;
