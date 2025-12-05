// ============================================
// ADMIN DASHBOARD - MAIN JAVASCRIPT FILE
// ============================================

// ============================================
// NAVIGATION LOGIC
// ============================================
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        
        if (page === 'logout') {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'admin.html';
            }
            return;
        }
        
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
        const selectedPage = document.getElementById(page + '-page');
        if (selectedPage) selectedPage.classList.add('active');
    });
});

// ============================================
// PROFILE TABS (MAIN PAGE)
// ============================================
const tabBtns = document.querySelectorAll('.profile-tabs .tab-btn[data-tab]');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        this.classList.add('active');
        const activeTab = document.getElementById(tabName + '-tab');
        if (activeTab) activeTab.classList.add('active');
    });
});

// ============================================
// MODAL ELEMENTS
// ============================================
const userTypeModal = document.getElementById('userTypeModal');
const addStudentModal = document.getElementById('addStudentModal');
const addFacultyModal = document.getElementById('addFacultyModal');
const editModal = document.getElementById('editStudentModal');
const viewModal = document.getElementById('viewStudentModal');

const openModalBtn = document.getElementById('openModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const cancelFacultyBtn = document.getElementById('cancelFacultyBtn');
const closeViewModalBtn = document.getElementById('closeViewModalBtn');

const addStudentForm = document.getElementById('addStudentForm');
const addFacultyForm = document.getElementById('addFacultyForm');
const editStudentForm = document.getElementById('editStudentForm');

// ============================================
// USER TYPE SELECTION MODAL
// ============================================
let selectedUserType = 'student';

if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
        userTypeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

const userTypeCards = document.querySelectorAll('.user-type-card');

userTypeCards.forEach(card => {
    card.addEventListener('click', function() {
        selectedUserType = this.getAttribute('data-type');
        
        userTypeModal.classList.remove('active');
        
        if (selectedUserType === 'student') {
            addStudentModal.classList.add('active');
        } else if (selectedUserType === 'faculty') {
            addFacultyModal.classList.add('active');
        }
    });
});

// ============================================
// FACULTY COLLEGE AND COURSE SELECTION
// ============================================
const facultyCollege = document.getElementById('facultyCollege');
const facultyCourse1 = document.getElementById('facultyCourse1');
const facultyCourse2 = document.getElementById('facultyCourse2');

// Course data will be loaded from database
// This is a placeholder for the structure
const coursesByCollege = {
    // Data will be populated from database
};

if (facultyCollege) {
    facultyCollege.addEventListener('change', function() {
        const selectedCollege = this.value;
        
        facultyCourse1.innerHTML = '<option value="">Select Course</option>';
        facultyCourse2.innerHTML = '<option value="N/A">N/A</option>';
        
        // TODO: Fetch courses from database based on selectedCollege
        // Example AJAX call:
        // fetchCoursesFromDatabase(selectedCollege).then(courses => {
        //     populateCourseDropdowns(courses);
        // });
    });
}

// Prevent selecting the same course twice
if (facultyCourse1) {
    facultyCourse1.addEventListener('change', function() {
        const selectedCourse = this.value;
        
        Array.from(facultyCourse2.options).forEach(option => {
            if (option.value === selectedCourse && option.value !== 'N/A') {
                option.disabled = true;
            } else if (option.value !== 'N/A') {
                option.disabled = false;
            }
        });
    });
}

// ============================================
// CANCEL BUTTONS
// ============================================
if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        addStudentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        addStudentForm.reset();
    });
}

if (cancelFacultyBtn) {
    cancelFacultyBtn.addEventListener('click', () => {
        addFacultyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        addFacultyForm.reset();
        facultyCourse1.innerHTML = '<option value="">Select College First</option>';
        facultyCourse2.innerHTML = '<option value="N/A">N/A</option>';
    });
}

if (closeViewModalBtn) {
    closeViewModalBtn.addEventListener('click', () => {
        viewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// ============================================
// FORM SUBMISSIONS
// ============================================

// Add Student Form
addStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(addStudentForm);
    
    // TODO: Send data to database
    // Example AJAX call:
    // fetch('/api/students/create', {
    //     method: 'POST',
    //     body: formData
    // }).then(response => {
    //     if (response.ok) {
    //         alert('Student created successfully!');
    //         refreshStudentTable();
    //     }
    // });
    
    alert('Student created successfully!');
    addStudentModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    addStudentForm.reset();
});

// Add Faculty Form
addFacultyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(addFacultyForm);
    const course1 = formData.get('course1');
    const course2 = formData.get('course2');
    
    if (course1 === course2 && course2 !== 'N/A') {
        alert('Please select different courses for 1st and 2nd course!');
        return;
    }
    
    // TODO: Send data to database
    // fetch('/api/faculty/create', {
    //     method: 'POST',
    //     body: formData
    // }).then(response => {
    //     if (response.ok) {
    //         alert('Faculty created successfully!');
    //     }
    // });
    
    alert('Faculty created successfully!');
    addFacultyModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    addFacultyForm.reset();
    facultyCourse1.innerHTML = '<option value="">Select College First</option>';
    facultyCourse2.innerHTML = '<option value="N/A">N/A</option>';
});

// Edit Student Form
editStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(editStudentForm);
    const studentId = formData.get('studentIdHidden');
    
    // TODO: Send updated data to database
    // fetch(`/api/students/update/${studentId}`, {
    //     method: 'PUT',
    //     body: formData
    // }).then(response => {
    //     if (response.ok) {
    //         alert('Changes saved successfully!');
    //         refreshStudentTable();
    //     }
    // });
    
    alert('Changes saved successfully!');
    editModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// ============================================
// EDIT STUDENT MODAL
// ============================================
function openEditModal(studentId) {
    // TODO: Fetch student data from database
    // fetch(`/api/students/${studentId}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         populateEditForm(data);
    //     });
    
    editModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function populateEditForm(data) {
    const form = editStudentForm;
    form.elements['studentIdHidden'].value = data.studentId;
    form.elements['firstName'].value = data.firstName;
    form.elements['middleName'].value = data.middleName;
    form.elements['lastName'].value = data.lastName;
    form.elements['email'].value = data.email;
    form.elements['phone'].value = data.phone;
    form.elements['birthDate'].value = data.birthDate;
    form.elements['studentNumber'].value = data.studentNumber;
    form.elements['regStatus'].value = data.regStatus || 'Regular';
    form.elements['college'].value = data.college;
    form.elements['program'].value = data.program;
    form.elements['schoolYear'].value = data.yearLevel;
}

// Edit Modal Tabs
const btnDetails = document.getElementById('btn-edit-details');
const btnEnlistment = document.getElementById('btn-edit-enlistment');
const contentDetails = document.getElementById('edit-details-tab');
const contentEnlistment = document.getElementById('edit-enlistment-tab');

if (btnDetails) {
    btnDetails.addEventListener('click', function(e) {
        e.preventDefault();
        
        btnDetails.classList.add('active');
        btnEnlistment.classList.remove('active');
        
        contentDetails.classList.add('active');
        contentEnlistment.classList.remove('active');
    });
}

if (btnEnlistment) {
    btnEnlistment.addEventListener('click', function(e) {
        e.preventDefault();
        
        btnEnlistment.classList.add('active');
        btnDetails.classList.remove('active');
        
        contentEnlistment.classList.add('active');
        contentDetails.classList.remove('active');
    });
}

// ============================================
// VIEW STUDENT MODAL
// ============================================
function showStudentProfile(studentId) {
    // TODO: Fetch student data from database
    // fetch(`/api/students/${studentId}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         populateViewModal(data);
    //     });
    
    viewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function populateViewModal(student) {
    document.getElementById('profile-name').textContent = student.name;
    document.getElementById('profile-student-number').textContent = student.studentNumber;
    document.getElementById('profile-program').textContent = student.program;
    document.getElementById('profile-college').textContent = student.college;
    document.getElementById('profile-year-level').textContent = student.yearLevel;
    document.getElementById('profile-section').textContent = student.section;
    document.getElementById('profile-address').textContent = student.address;
    document.getElementById('profile-reg-status').textContent = student.regStatus || 'Regular';

    const statusSpan = `<span class="status-badge ${student.status.toLowerCase()}">${student.status}</span>`;
    document.getElementById('profile-status').innerHTML = statusSpan;

    const scheduleBody = document.getElementById('profile-class-schedule');
    scheduleBody.innerHTML = '';

    if (student.schedule && student.schedule.length > 0) {
        student.schedule.forEach(item => {
            const row = scheduleBody.insertRow();
            row.innerHTML = `
                <td>${item.code}</td>
                <td>${item.desc}</td>
                <td>${item.section}</td>
                <td>${item.schedule}</td>
                <td>${item.room}</td>
                <td>${item.units}</td>
            `;
        });
    } else {
        const row = scheduleBody.insertRow();
        row.innerHTML = `<td colspan="6" style="text-align: center; color: #999;">No classes scheduled.</td>`;
    }
}

// ============================================
// DELETE/DEACTIVATE STUDENT
// ============================================
function deleteStudent(studentId, studentName, buttonElement) {
    if (confirm(`Are you sure you want to deactivate student ${studentName} (ID: ${studentId})?`)) {
        // TODO: Send delete request to database
        // fetch(`/api/students/deactivate/${studentId}`, {
        //     method: 'POST'
        // }).then(response => {
        //     if (response.ok) {
        //         updateStudentStatus(studentId, buttonElement);
        //     }
        // });
        
        alert('Student deactivated successfully.');
    }
}

function updateStudentStatus(studentId, buttonElement) {
    const row = buttonElement.closest('tr');
    const statusBadge = row.querySelector('.status-badge');
    
    if (statusBadge) {
        statusBadge.textContent = 'Inactive';
        statusBadge.classList.remove('active');
        statusBadge.classList.add('inactive');
    }
    
    buttonElement.textContent = 'Deactivated';
    buttonElement.disabled = true;
    buttonElement.style.backgroundColor = '#ccc';
    buttonElement.style.cursor = 'not-allowed';
}

// ============================================
// ENLISTMENT SUBMISSION
// ============================================
const triggerSubmitBtn = document.getElementById('triggerEnlistmentSubmit');

if (triggerSubmitBtn) {
    triggerSubmitBtn.addEventListener('click', function() {
        const isConfirmed = confirm("Are you sure you want to submit the enlistment schedule for this student?");

        if (isConfirmed) {
            // TODO: Send enlistment data to database
            // fetch('/api/enlistment/submit', {
            //     method: 'POST',
            //     body: JSON.stringify(enlistmentData)
            // }).then(response => {
            //     if (response.ok) {
            //         alert("Enlistment submitted successfully!");
            //     }
            // });
            
            editModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            alert("Enlistment submitted successfully!");
        }
    });
}

// ============================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ============================================
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// EVENT DELEGATION FOR TABLE BUTTONS
// ============================================
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // View Button
    if (target.classList.contains('view-btn')) {
        const row = target.closest('tr');
        const studentId = row.getAttribute('data-student-id');
        showStudentProfile(studentId);
    }
    
    // Edit Button
    if (target.classList.contains('edit-btn')) {
        const row = target.closest('tr');
        const studentId = row.getAttribute('data-student-id');
        openEditModal(studentId);
    }
    
    // Delete Button
    if (target.classList.contains('delete-btn')) {
        const row = target.closest('tr');
        const studentId = row.getAttribute('data-student-id');
        const studentName = row.cells[1].textContent;
        deleteStudent(studentId, studentName, target);
    }
});

// ============================================
// DATA LOADING FUNCTIONS
// ============================================

// Load Dashboard Stats
function loadDashboardStats() {
    // TODO: Fetch stats from database
    // fetch('/api/stats/dashboard')
    //     .then(response => response.json())
    //     .then(data => {
    //         document.getElementById('total-users-count').textContent = data.totalUsers;
    //         document.getElementById('active-students-count').textContent = data.activeStudents;
    //         document.getElementById('active-students-count-page').textContent = data.activeStudents;
    //     });
}

// Load Recent Users
function loadRecentUsers() {
    // TODO: Fetch recent users from database
    // fetch('/api/users/recent')
    //     .then(response => response.json())
    //     .then(users => {
    //         const container = document.getElementById('recent-users-list');
    //         container.innerHTML = '';
    //         users.forEach(user => {
    //             container.innerHTML += createUserListItem(user);
    //         });
    //     });
}

// Load Students Table
function loadStudentsTable() {
    // TODO: Fetch students from database
    // fetch('/api/students/list')
    //     .then(response => response.json())
    //     .then(students => {
    //         const tbody = document.getElementById('students-table-body');
    //         tbody.innerHTML = '';
    //         students.forEach(student => {
    //             tbody.innerHTML += createStudentTableRow(student);
    //         });
    //     });
}

// Load Admin Profile
function loadAdminProfile() {
    // TODO: Fetch admin profile from database
    // fetch('/api/admin/profile')
    //     .then(response => response.json())
    //     .then(data => {
    //         document.getElementById('admin-profile-name').textContent = data.fullName;
    //         document.getElementById('admin-first-name').value = data.firstName;
    //         document.getElementById('admin-middle-name').value = data.middleName;
    //         document.getElementById('admin-last-name').value = data.lastName;
    //         document.getElementById('admin-email').value = data.email;
    //         document.getElementById('admin-birthdate').value = data.birthDate;
    //         document.getElementById('admin-phone').value = data.phone;
    //         document.getElementById('admin-address').value = data.address;
    //         document.getElementById('last-password-change').textContent = `Last changed: ${data.lastPasswordChange}`;
    //     });
}

// ============================================
// HTML GENERATION HELPERS
// ============================================

function createUserListItem(user) {
    return `
        <div class="user-item">
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
                <div class="user-role">${user.role}</div>
            </div>
            <div class="verified-badge">Verified</div>
        </div>
    `;
}

function createStudentTableRow(student) {
    return `
        <tr data-student-id="${student.studentId}">
            <td>${student.studentId}</td>
            <td>${student.name}</td>
            <td>${student.program}</td>
            <td><span class="status-badge ${student.status.toLowerCase()}">${student.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn">View</button>
                    <button class="action-btn edit-btn">Edit</button>
                    <button class="action-btn delete-btn">Delete</button>
                </div>
            </td>
        </tr>
    `;
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Load initial data
    loadDashboardStats();
    loadRecentUsers();
    loadStudentsTable();
    loadAdminProfile();
});
