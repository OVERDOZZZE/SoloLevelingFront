import '../styles/login.css';
import { login } from './auth.js';

const loginHtml = `
<div class="login-container">
    <form id="login-form" class="login-form">
        <h2>Login</h2>
        <p id="error-message" class="error-message"></p>
        <div class="form-group">
            <label for="username">Username:</label>
            <div class="input-wrapper">
                <input type="text" id="username" name="username" class="input-field" placeholder="Enter username" required>
            </div>
        </div>
        <div class="form-group password-group">
            <label for="password">Password:</label>
            <div class="input-wrapper">
                <input type="password" id="password" name="password" class="input-field" placeholder="Enter password" required>
                <button type="button" id="toggle-password" class="toggle-password">Show</button>
            </div>
        </div>
        <button type="submit" class="login-button">Login</button>
        <p class="register-link">
            No account? <a href="/register">Register here</a>
        </p>
    </form>
</div>
`;

export function loadLoginPage() {
    document.getElementById('root').innerHTML = loginHtml;

    let showPassword = false;

    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const togglePasswordBtn = document.getElementById('toggle-password');

    togglePasswordBtn.addEventListener('click', () => {
        showPassword = !showPassword;
        passwordInput.type = showPassword ? 'text' : 'password';
        togglePasswordBtn.textContent = showPassword ? 'Hide' : 'Show';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = ''; // Clear previous error
        errorMessage.classList.remove('active'); // Hide by default

        const username = usernameInput.value;
        const password = passwordInput.value;

        const success = await login(username, password);
        if (success) {
            window.location.pathname = '/profile';
        } else {
            errorMessage.textContent = 'Invalid credentials. Please try again.';
            errorMessage.classList.add('active'); // Show error
        }
    });
}