import '../styles/level_detail.css';
import { getToken } from './auth.js';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // No trailing slash here

const levelDetailHtml = `
<div class="level-detail-container" id="level-detail-container">
    <h2>Level Details</h2>
    <p id="error-message" class="error-message"></p>
    <img id="level-image" src="" alt="Level Image" class="level-image">
    <p><strong>Level:</strong> <span id="level-number"></span></p>
    <p><strong>Name:</strong> <span id="level-name"></span></p>
    <p><strong>Required EXP:</strong> <span id="required-exp"></span></p>
    <p><strong>Achievement:</strong> <span id="achievement"></span></p>
    <p><strong>Quests:</strong> <span id="quests"></span></p>
    <p><strong>Tips:</strong> <span id="tips"></span></p>
    <button id="back-btn" class="login-button">Back to Levels</button>
</div>
`;

async function fetchLevelDetail(levelId) {
    const token = getToken();
    if (!token) {
        console.log('No token found, redirecting to login');
        window.location.pathname = '/';
        return null;
    }

    try {
        // Ensure no double slashes by constructing URL carefully
        const url = `${API_URL}/api/main/levels/${levelId}`; // Removed trailing slash after ${levelId}
        console.log('Fetching from:', url);
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch Error:', error.response ? error.response.data : error.message);
        return null;
    }
}

export function loadLevelDetailPage() {
    document.getElementById('root').innerHTML = levelDetailHtml;

    const path = window.location.pathname;
    console.log('Current Path:', path);
    const levelId = path.split('/levels/')[1]?.replace(/\/$/, ''); // Remove trailing slash if present
    console.log('Extracted Level ID:', levelId);

    if (!levelId || isNaN(levelId)) {
        console.log('Invalid level ID');
        document.getElementById('error-message').textContent = 'Invalid level ID';
        document.getElementById('error-message').classList.add('active');
        return;
    }

    fetchLevelDetail(levelId).then(level => {
        console.log('Fetched Level Data:', level);
        if (!level) {
            document.getElementById('error-message').textContent = 'Failed to load level details. Please try again.';
            document.getElementById('error-message').classList.add('active');
            return;
        }

        document.getElementById('level-image').src = level.level_image || 'default-image-url.jpg';
        document.getElementById('level-number').textContent = level.level_number || 'Not set';
        document.getElementById('level-name').textContent = level.name || 'Unnamed';
        document.getElementById('required-exp').textContent = level.required_exp || '0';
        document.getElementById('achievement').textContent = level.achievement ? level.achievement : 'None';
        document.getElementById('quests').textContent = level.quests && level.quests.length ? level.quests.join(', ') : 'None';
        document.getElementById('tips').textContent = level.tips && level.tips.length ? level.tips.join(', ') : 'None';
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        window.location.pathname = '/levels';
    });
}