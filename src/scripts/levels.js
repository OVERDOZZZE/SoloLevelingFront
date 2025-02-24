import '../styles/levels.css';
import { getToken } from './auth.js';
import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000';
const API_URL = 'https://solo-leveling-api-ivory.vercel.app';


const levelsHtml = `
<div class="levels-container" id="levels-container">
    <h2>Levels</h2>
    <p id="error-message" class="error-message"></p>
    <div id="levels-list" class="levels-list"></div>
    <button id="back-btn" class="login-button">Back to Profile</button>
</div>
`;

async function fetchLevels() {
    const token = getToken();
    if (!token) {
        window.location.pathname = '/';
        return null;
    }

    try {
        const response = await axios.get(`${API_URL}/api/main/levels/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch levels:', error);
        return null;
    }
}

export function loadLevelsPage() {
    document.getElementById('root').innerHTML = levelsHtml;

    const levelsContainer = document.getElementById('levels-container');
    const errorMessage = document.getElementById('error-message');
    const levelsList = document.getElementById('levels-list');
    const backBtn = document.getElementById('back-btn');

    fetchLevels().then(levels => {
        if (!levels) {
            errorMessage.textContent = 'Failed to load levels. Please try again.';
            errorMessage.classList.add('active');
            return;
        }

        levelsList.innerHTML = levels.map(level => `
            <div class="level-card" data-id="${level.id}" style="background-image: url('${level.level_image}')">
                <div class="level-info">
                    <p><strong>Level ${level.level_number}:</strong> ${level.name}</p>
                    <p><strong>Required EXP:</strong> ${level.required_exp}</p>
                </div>
            </div>
        `).join('');

        // Add click event to each level card
        levelsList.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', () => {
                const levelId = card.getAttribute('data-id');
                window.location.pathname = `/levels/${levelId}`;
            });
        });
    });

    backBtn.addEventListener('click', () => {
        window.location.pathname = '/profile';
    });
}