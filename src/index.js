import { loadLoginPage } from './scripts/login.js';
import { loadProfilePage } from './scripts/profile.js';

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/profile') {
        loadProfilePage();
    } else {
        loadLoginPage();
    }
});