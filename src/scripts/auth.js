import axios from 'axios';

const API_URL = 'http://localhost:8000';

function setToken(token) {
    localStorage.setItem('token', token);
}

function getToken() {
    return localStorage.getItem('token');
}

function removeToken() {
    localStorage.removeItem('token');
}

async function login(username, password) {
    try {
        const response = await axios.post(`${API_URL}/auth/login/`, {
            username,
            password
        });
        setToken(response.data.key);
        return true;
    } catch (error) {
        console.error('Login failed:', error);
        return false;
    }
}

export { login, getToken, removeToken };
