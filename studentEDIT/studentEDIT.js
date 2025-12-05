// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('student-password');
    const eyeIcon = document.getElementById('student-eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = 'student/passOff.svg';
    } else {
        passwordInput.type = 'password';
        eyeIcon.src = 'student/passOn.svg';
    }
}

// Load saved student number on page load
window.addEventListener('DOMContentLoaded', function() {
    const savedStudentNumber = localStorage.getItem('studentRememberedNumber');
    const rememberChecked = localStorage.getItem('studentRememberMe');
    
    if (savedStudentNumber && rememberChecked === 'true') {
        document.getElementById('student-number').value = savedStudentNumber;
        document.getElementById('student-remember').checked = true;
    }
});

// Handle login submission
async function handleLogin() {
    if (!validateStudentNumber()) {
        return;
    }

    const studentNumber = document.getElementById('student-number').value;
    const password = document.getElementById('student-password').value;
    const rememberMe = document.getElementById('student-remember').checked;
    
    if (!studentNumber || !password) {
        alert('Please enter both student number and password');
        return;
    }

    try {
        // TODO: Replace with your actual API endpoint
        const response = await fetch('/api/student/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentNumber: studentNumber,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Handle remember me functionality
            if (rememberMe) {
                localStorage.setItem('studentRememberedNumber', studentNumber);
                localStorage.setItem('studentRememberMe', 'true');
            } else {
                localStorage.removeItem('studentRememberedNumber');
                localStorage.removeItem('studentRememberMe');
            }
            
            // Store authentication token if provided
            if (data.token) {
                localStorage.setItem('studentAuthToken', data.token);
            }
            
            // Redirect to dashboard
            window.location.href = 'studentdashboard.html';
        } else {
            alert(data.message || 'Invalid student number or password!');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    }
}

// Validate student number format
function validateStudentNumber() {
    const studentNumber = document.getElementById('student-number').value;
    
    if (studentNumber.length > 0 && !/^\d+$/.test(studentNumber)) {
        alert('Student number must contain only numbers!');
        return false;
    }
    
    return true;
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
document.getElementById('student-password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleLogin();
    }
});
