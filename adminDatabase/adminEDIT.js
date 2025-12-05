// ============================================
// ADMIN LOGIN - MAIN JAVASCRIPT FILE
// ============================================

// ============================================
// TOGGLE PASSWORD VISIBILITY
// ============================================
const passwordInput = document.getElementById('admin-password');
const eyeIcon = document.getElementById('admin-eye-icon');

if (eyeIcon) {
    eyeIcon.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.src = 'admin/passOff.svg';
        } else {
            passwordInput.type = 'password';
            eyeIcon.src = 'admin/passOn.svg';
        }
    });
}

// ============================================
// LOAD SAVED USERNAME ON PAGE LOAD
// ============================================
window.addEventListener('DOMContentLoaded', function() {
    const savedUsername = localStorage.getItem('adminRememberedUsername');
    const rememberChecked = localStorage.getItem('adminRememberMe');
    
    if (savedUsername && rememberChecked === 'true') {
        document.getElementById('admin-username').value = savedUsername;
        document.getElementById('admin-remember').checked = true;
    }
});

// ============================================
// HANDLE LOGIN FORM SUBMISSION
// ============================================
const loginForm = document.getElementById('admin-login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        const rememberMe = document.getElementById('admin-remember').checked;
        
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        
        // TODO: Send login request to database
        // Example:
        // fetch('/api/admin/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         // Handle remember me functionality
        //         if (rememberMe) {
        //             localStorage.setItem('adminRememberedUsername', username);
        //             localStorage.setItem('adminRememberMe', 'true');
        //         } else {
        //             localStorage.removeItem('adminRememberedUsername');
        //             localStorage.removeItem('adminRememberMe');
        //         }
        //         
        //         // Store session token or admin info
        //         localStorage.setItem('adminToken', data.token);
        //         localStorage.setItem('adminUsername', username);
        //         
        //         alert('Login successful! Welcome, ' + username);
        //         window.location.href = 'adminPage.html';
        //     } else {
        //         alert(data.message || 'Invalid username or password!');
        //     }
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('An error occurred during login. Please try again.');
        // });
        
        // Temporary alert for development
        alert('Login functionality will be connected to database');
    });
}

// ============================================
// BACK BUTTON
// ============================================
const backButton = document.getElementById('back-button');

if (backButton) {
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'mainpage.html';
    });
}

// ============================================
// FORGOT PASSWORD
// ============================================
const forgotPasswordLink = document.getElementById('forgot-password-link');

if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // TODO: Implement forgot password functionality
        // This could open a modal or redirect to a password reset page
        // For now, showing a simple alert
        alert('Please contact icto@plm.edu.ph to reset your password.');
        
        // Optional: Redirect to forgot password page
        // window.location.href = 'forgot-password.html';
    });
}

// ============================================
// ENTER KEY SUBMIT (Alternative to form submit)
// ============================================
if (passwordInput) {
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
}
