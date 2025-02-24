import { loadLoginPage } from './scripts/login.js';
import { loadProfilePage } from './scripts/profile.js';
import { loadLevelsPage } from './scripts/levels.js';
import { loadLevelDetailPage } from './scripts/level_detail.js';

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.startsWith('/levels/')) {
        loadLevelDetailPage();
    } else if (path === '/levels') {
        loadLevelsPage();
    } else if (path === '/profile') {
        loadProfilePage();
    } else {
        loadLoginPage();
    }
});
