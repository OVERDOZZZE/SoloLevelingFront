import '../styles/level_detail.css';
import { getToken } from './auth.js';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

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
        window.location.pathname = '/';
        return null;
    }

    try {
        const response = await axios.get(`${API_URL}/api/main/levels/${levelId}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch level details:', error);
        return null;
    }
}

export function loadLevelDetailPage() {
    document.getElementById('root').innerHTML = levelDetailHtml;

    const levelDetailContainer = document.getElementById('level-detail-container');
    const errorMessage = document.getElementById('error-message');
    const levelImage = document.getElementById('level-image');
    const levelNumber = document.getElementById('level-number');
    const levelName = document.getElementById('level-name');
    const requiredExp = document.getElementById('required-exp');
    const achievement = document.getElementById('achievement');
    const quests = document.getElementById('quests');
    const tips = document.getElementById('tips');
    const backBtn = document.getElementById('back-btn');

    const levelId = window.location.pathname.split('/levels/')[1];
    if (!levelId) {
        errorMessage.textContent = 'Invalid level ID';
        errorMessage.classList.add('active');
        return;
    }

    fetchLevelDetail(levelId).then(level => {
        if (!level) {
            errorMessage.textContent = 'Failed to load level details. Please try again.';
            errorMessage.classList.add('active');
            return;
        }

        levelImage.src = level.level_image || 'default-image-url.jpg';
        levelNumber.textContent = level.level_number || 'Not set';
        levelName.textContent = level.name || 'Unnamed';
        requiredExp.textContent = level.required_exp || '0';
        achievement.textContent = level.achievement ? level.achievement : 'None';
        quests.textContent = level.quests && level.quests.length ? level.quests.join(', ') : 'None';
        tips.textContent = level.tips && level.tips.length ? level.tips.join(', ') : 'None';
    });

    backBtn.addEventListener('click', () => {
        window.location.pathname = '/levels';
    });
}