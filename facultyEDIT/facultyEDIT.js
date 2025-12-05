// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('faculty-password');
    const eyeIcon = document.getElementById('faculty-eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = 'faculty/passOff.svg';
    } else {
        passwordInput.type = 'password';
        eyeIcon.src = 'faculty/passOn.svg';
    }
}

// Load saved username on page load
window.addEventListener('DOMContentLoaded', function() {
    const savedUsername = localStorage.getItem('facultyRememberedUsername');
    const rememberChecked = localStorage.getItem('facultyRememberMe');
    
    if (savedUsername && rememberChecked === 'true') {
        document.getElementById('faculty-username').value = savedUsername;
        document.getElementById('faculty-remember').checked = true;
    }
});

// Handle login submission
async function handleLogin() {
    const username = document.getElementById('faculty-username').value;
    const password = document.getElementById('faculty-password').value;
    const rememberMe = document.getElementById('faculty-remember').checked;
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }

    try {
        // TODO: Replace with your actual API endpoint
        const response = await fetch('/api/faculty/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                facultyNumber: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Handle remember me functionality
            if (rememberMe) {
                localStorage.setItem('facultyRememberedUsername', username);
                localStorage.setItem('facultyRememberMe', 'true');
            } else {
                localStorage.removeItem('facultyRememberedUsername');
                localStorage.removeItem('facultyRememberMe');
            }
            
            // Store authentication token if provided
            if (data.token) {
                localStorage.setItem('facultyAuthToken', data.token);
            }
            
            // Store faculty info if provided
            if (data.facultyName) {
                localStorage.setItem('facultyName', data.facultyName);
            }
            
            // Redirect to faculty page
            window.location.href = 'facultyPage.html';
        } else {
            alert(data.message || 'Invalid username or password!');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    }
}

// Navigate back to main page
function BackButton() {
    window.location.href = 'mainpage.html';
}

// Handle forgot password
function forgotPassword() {
    alert('Please contact icto@plm.edu.ph to reset your password.');
}

// Enable Enter key to submit
document.getElementById('faculty-password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleLogin();
    }
});
