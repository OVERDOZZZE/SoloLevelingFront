import '../styles/profile.css';
import { getToken, removeToken } from './auth.js';
import axios from 'axios';

// const API_URL = 'http://localhost:8000';
const API_URL = 'https://solo-leveling-api-ivory.vercel.app';


const profileHtml = `
<div class="profile-container" id="profile-container">
    <h2>Profile</h2>
    <img id="user-image" src="" alt="Profile" class="profile-image">
    <p><strong>Username:</strong> <span id="username"></span></p>
    <p><strong>Email:</strong> <span id="email"></span></p>
    <p><strong>Bio:</strong> <span id="bio"></span></p>
    <p><strong>Date of Birth:</strong> <span id="dob"></span></p>
    <p><strong>Overall Experience:</strong> <span id="exp"></span> EXP</p>
    <div id="level-container" class="level-container">
        <p id="level-text" class="level-text"><strong>Level:</strong> <span id="level"></span></p>
    </div>
    <button id="logout-btn" class="login-button">Logout</button>
</div>
`;

async function fetchProfile() {
    const token = getToken();
    if (!token) {
        window.location.pathname = '/';
        return null;
    }

    try {
        const response = await axios.get(`${API_URL}/api/users/users/me/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch profile:', error);
        removeToken();
        window.location.pathname = '/';
        return null;
    }
}

export function loadProfilePage() {
    document.getElementById('root').innerHTML = profileHtml;

    const profileContainer = document.getElementById('profile-container');
    const userImage = document.getElementById('user-image');
    const usernameSpan = document.getElementById('username');
    const emailSpan = document.getElementById('email');
    const bioSpan = document.getElementById('bio');
    const dobSpan = document.getElementById('dob');
    const expSpan = document.getElementById('exp');
    const levelContainer = document.getElementById('level-container');
    const levelText = document.getElementById('level');
    const logoutBtn = document.getElementById('logout-btn');

    fetchProfile().then(user => {
        if (!user) {
            profileContainer.innerHTML = '<p>Loading...</p>';
            return;
        }

        if (user.error) {
            const errorMessage = document.createElement('p');
            errorMessage.id = 'error-message';
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Failed to load profile. Please try again.';
            profileContainer.insertBefore(errorMessage, profileContainer.firstChild.nextSibling);
            return;
        }

        user.email = user.email || 'No email';
        user.bio = user.bio || 'No bio';
        user.date_of_birth = user.date_of_birth || 'Not indicated';

        userImage.src = user.user_image || 'default-image-url.jpg';
        usernameSpan.textContent = user.username || 'Unknown';
        emailSpan.textContent = user.email;
        bioSpan.textContent = user.bio;
        dobSpan.textContent = user.date_of_birth;
        expSpan.textContent = user.overall_exp || '0';

        if (user.level && user.level.level_image) {
            levelContainer.style.backgroundImage = `url(${user.level.level_image})`;
            levelText.textContent = user.level.level_number && user.level.name 
                ? `${user.level.level_number}. ${user.level.name}` 
                : 'Not set';
        } else {
            levelText.textContent = 'Not set';
        }
    });

    logoutBtn.addEventListener('click', () => {
        removeToken();
        window.location.pathname = '/';
    });
}