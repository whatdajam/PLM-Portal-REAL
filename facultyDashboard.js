// ========================================
// DATABASE CONNECTION FUNCTIONS
// ========================================
// TODO: Replace these with your actual database API calls

async function fetchFacultyData() {
    // TODO: Implement API call to fetch faculty data
    // Example: return await fetch('/api/faculty').then(res => res.json());
    console.log('Fetch faculty data from database');
}

async function fetchDashboardStats() {
    // TODO: Implement API call to fetch dashboard statistics
    console.log('Fetch dashboard stats from database');
}

async function fetchFacultyCourses() {
    // TODO: Implement API call to fetch faculty courses
    console.log('Fetch faculty courses from database');
}

async function fetchCourseSchedule(schoolYear, semester, program) {
    // TODO: Implement API call to fetch course schedule
    console.log('Fetch course schedule from database', schoolYear, semester, program);
}

async function fetchStudents(schoolYear, semester, program, course, section) {
    // TODO: Implement API call to fetch students
    console.log('Fetch students from database', schoolYear, semester, program, course, section);
}

async function fetchGrades(schoolYear, semester, program, course, section) {
    // TODO: Implement API call to fetch grades
    console.log('Fetch grades from database', schoolYear, semester, program, course, section);
}

async function submitGradesToDB(gradesData) {
    // TODO: Implement API call to submit grades
    console.log('Submit grades to database', gradesData);
}

async function updatePassword(currentPassword, newPassword) {
    // TODO: Implement API call to update password
    console.log('Update password in database');
}

async function fetchDropdownOptions() {
    // TODO: Implement API call to fetch dropdown options
    // Should return: { schoolYears: [], semesters: [], programs: [], courses: [], sections: [] }
    console.log('Fetch dropdown options from database');
}

// ========================================
// UI POPULATION FUNCTIONS
// ========================================

function populateDashboardStats(stats) {
    document.getElementById('active-courses-count').textContent = stats.activeCourses || '--';
    document.getElementById('total-students-count').textContent = stats.totalStudents || '--';
    document.getElementById('courses-page-count').textContent = stats.activeCourses || '0';
}

function populateDashboardCourses(courses) {
    const grid = document.getElementById('dashboard-courses-grid');
    grid.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <span class="status-indicator ${course.status || 'green'}"></span>
            <div class="course-code">${course.code}</div>
            <div class="course-title">${course.title}</div>
            <div class="course-section">${course.section}</div>
            <div class="course-schedule">${course.schedule} · ${course.room}</div>
        `;
        grid.appendChild(courseCard);
    });
}

function populateCourseScheduleTable(schedules) {
    const tbody = document.getElementById('courseScheduleTable');
    tbody.innerHTML = '';
    
    schedules.forEach(schedule => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${schedule.courseName}</td>
            <td>${schedule.courseCode}</td>
            <td>${schedule.units}</td>
            <td>${schedule.schedule}</td>
            <td>${schedule.section}</td>
            <td>${schedule.room}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateStudentOverviewTable(students) {
    const tbody = document.getElementById('studentOverviewTable');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        const statusClass = student.status.toLowerCase() === 'active' ? 'passed-tag' : 'failed-tag';
        row.innerHTML = `
            <td>${student.studentId}</td>
            <td>${student.name}</td>
            <td><span class="${statusClass}">${student.status}</span></td>
            <td>${student.email}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateGradesTable(grades) {
    const tbody = document.getElementById('gradesTableBody');
    tbody.innerHTML = '';
    
    grades.forEach(grade => {
        const row = document.createElement('tr');
        const remarkClass = grade.remark.toLowerCase() === 'passed' ? 'passed-tag' : 'failed-tag';
        row.innerHTML = `
            <td>${grade.studentId}</td>
            <td>${grade.name}</td>
            <td class="grade-cell" data-student-id="${grade.studentId}">${grade.grade}</td>
            <td><span class="${remarkClass}">${grade.remark}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function populateFacultyProfile(data) {
    document.getElementById('profile-full-name').textContent = data.fullName || 'Loading...';
    document.getElementById('profile-first-name').value = data.firstName || '';
    document.getElementById('profile-middle-name').value = data.middleName || '';
    document.getElementById('profile-last-name').value = data.lastName || '';
    document.getElementById('profile-email').value = data.email || '';
    document.getElementById('profile-dob').value = data.dateOfBirth || '';
    document.getElementById('profile-phone').value = data.phone || '';
    document.getElementById('profile-address').value = data.address || '';
}

function populateDropdowns(options) {
    // Course Schedule Dropdowns
    populateSelectOptions('schoolYear', options.schoolYears || []);
    populateSelectOptions('semester', options.semesters || []);
    populateSelectOptions('program', options.programs || []);
    
    // Student Overview Dropdowns
    populateSelectOptions('studentSchoolYear', options.schoolYears || []);
    populateSelectOptions('studentSemester', options.semesters || []);
    populateSelectOptions('studentProgram', options.programs || []);
    populateSelectOptions('studentCourse', options.courses || []);
    populateSelectOptions('studentSection', options.sections || []);
    
    // Grades Dropdowns
    populateSelectOptions('gradesSchoolYear', options.schoolYears || []);
    populateSelectOptions('gradesSemester', options.semesters || []);
    populateSelectOptions('gradesProgram', options.programs || []);
    populateSelectOptions('gradesCourse', options.courses || []);
    populateSelectOptions('gradesSection', options.sections || []);
}

function populateSelectOptions(selectId, options) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    // Keep the first option (placeholder)
    const firstOption = select.options[0];
    select.innerHTML = '';
    select.appendChild(firstOption);
    
    options.forEach(option => {
        const opt = document.createElement('option');
        if (typeof option === 'string') {
            opt.value = option;
            opt.textContent = option;
        } else {
            opt.value = option.value;
            opt.textContent = option.label;
        }
        select.appendChild(opt);
    });
}

// ========================================
// NAVIGATION FUNCTIONS
// ========================================

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const page = this.getAttribute('data-page');
            
            if (page === 'logout') {
                if (confirm('Are you sure you want to logout?')) {
                    // TODO: Implement logout logic
                    window.location.href = 'faculty.html';
                }
                return;
            }
            
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.page-content').forEach(p => {
                p.classList.remove('active');
            });
            
            const selectedPage = document.getElementById(page + '-page');
            if (selectedPage) {
                selectedPage.classList.add('active');
            }
        });
    });
}

// ========================================
// PROFILE TAB FUNCTIONS
// ========================================

function initializeProfileTabs() {
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            const targetTab = document.getElementById(tabName + '-tab');
            if (targetTab) targetTab.classList.add('active');
        });
    });
}

// ========================================
// PASSWORD UPDATE FUNCTIONS
// ========================================

function initializePasswordUpdate() {
    const updateBtn = document.getElementById('update-password-btn');
    
    if (updateBtn) {
        updateBtn.addEventListener('click', async function() {
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validation
            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('Please fill in all password fields');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match!');
                return;
            }
            
            if (newPassword.length < 8) {
                alert('Password must be at least 8 characters long!');
                return;
            }
            
            try {
                await updatePassword(currentPassword, newPassword);
                alert('Password updated successfully!');
                
                // Clear form
                document.getElementById('current-password').value = '';
                document.getElementById('new-password').value = '';
                document.getElementById('confirm-password').value = '';
            } catch (error) {
                alert('Error updating password: ' + error.message);
            }
        });
    }
}

// ========================================
// GRADES MANAGEMENT FUNCTIONS
// ========================================

let editing = false;

function enableEditing() {
    const gradeCells = document.querySelectorAll('.grade-cell');
    gradeCells.forEach(cell => {
        const currentValue = cell.innerText;
        const studentId = cell.dataset.studentId;
        cell.innerHTML = `<input type='number' step='0.25' min='1' max='5' value='${currentValue}' 
                          data-student-id='${studentId}' 
                          style='width:60px; padding:4px; font-size:13px; border:1px solid #ccc; border-radius:4px;'>`;
    });
}

function saveEditing() {
    const gradeCells = document.querySelectorAll('.grade-cell');
    gradeCells.forEach(cell => {
        const input = cell.querySelector('input');
        if (input) {
            cell.innerHTML = input.value;
        }
    });
}

function initializeGradesManagement() {
    const editBtn = document.getElementById('editGrades');
    const submitBtn = document.getElementById('submitGrades');
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            if (!editing) {
                enableEditing();
                editBtn.innerText = "Save";
                editBtn.classList.remove('black-btn');
                editBtn.classList.add('blue-btn');
                editing = true;
            } else {
                saveEditing();
                editBtn.innerText = "Edit Grades";
                editBtn.classList.remove('blue-btn');
                editBtn.classList.add('black-btn');
                editing = false;
            }
        });
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            if (editing) {
                alert("Please save the grades before submitting.");
                return;
            }

            const confirmSubmit = confirm("Confirm submission?");
            if (!confirmSubmit) return;

            const rows = document.querySelectorAll('#gradesTable tbody tr');
            let gradesData = [];

            rows.forEach(row => {
                const studentId = row.children[0].innerText;
                const name = row.children[1].innerText;
                const grade = row.children[2].innerText;
                gradesData.push({ studentId, name, grade });
            });

            try {
                await submitGradesToDB(gradesData);
                console.log("Submitted Grades", gradesData);
                alert("Grades submitted successfully!");
            } catch (error) {
                alert("Error submitting grades: " + error.message);
            }
        });
    }
}

// ========================================
// FILTER HANDLERS
// ========================================

function initializeCourseScheduleFilters() {
    const schoolYear = document.getElementById('schoolYear');
    const semester = document.getElementById('semester');
    const program = document.getElementById('program');
    
    const loadSchedule = async () => {
        if (schoolYear.value && semester.value && program.value) {
            const schedules = await fetchCourseSchedule(
                schoolYear.value, 
                semester.value, 
                program.value
            );
            populateCourseScheduleTable(schedules || []);
        }
    };
    
    schoolYear.addEventListener('change', loadSchedule);
    semester.addEventListener('change', loadSchedule);
    program.addEventListener('change', loadSchedule);
}

function initializeStudentOverviewFilters() {
    const schoolYear = document.getElementById('studentSchoolYear');
    const semester = document.getElementById('studentSemester');
    const program = document.getElementById('studentProgram');
    const course = document.getElementById('studentCourse');
    const section = document.getElementById('studentSection');
    
    const loadStudents = async () => {
        if (schoolYear.value && semester.value && program.value && 
            course.value && section.value) {
            const students = await fetchStudents(
                schoolYear.value,
                semester.value,
                program.value,
                course.value,
                section.value
            );
            populateStudentOverviewTable(students || []);
        }
    };
    
    schoolYear.addEventListener('change', loadStudents);
    semester.addEventListener('change', loadStudents);
    program.addEventListener('change', loadStudents);
    course.addEventListener('change', loadStudents);
    section.addEventListener('change', loadStudents);
}

function initializeGradesFilters() {
    const schoolYear = document.getElementById('gradesSchoolYear');
    const semester = document.getElementById('gradesSemester');
    const program = document.getElementById('gradesProgram');
    const course = document.getElementById('gradesCourse');
    const section = document.getElementById('gradesSection');
    
    const loadGrades = async () => {
        if (schoolYear.value && semester.value && program.value && 
            course.value && section.value) {
            const grades = await fetchGrades(
                schoolYear.value,
                semester.value,
                program.value,
                course.value,
                section.value
            );
            populateGradesTable(grades || []);
        }
    };
    
    schoolYear.addEventListener('change', loadGrades);
    semester.addEventListener('change', loadGrades);
    program.addEventListener('change', loadGrades);
    course.addEventListener('change', loadGrades);
    section.addEventListener('change', loadGrades);
}

// ========================================
// LOAD FUNCTIONS
// ========================================

async function loadDashboard() {
    try {
        const stats = await fetchDashboardStats();
        populateDashboardStats(stats || {});
        
        const courses = await fetchFacultyCourses();
        populateDashboardCourses(courses || []);
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

async function loadFacultyProfile() {
    try {
        const data = await fetchFacultyData();
        populateFacultyProfile(data || {});
    } catch (error) {
        console.error('Error loading faculty profile:', error);
    }
}

async function loadDropdowns() {
    try {
        const options = await fetchDropdownOptions();
        populateDropdowns(options || {});
    } catch (error) {
        console.error('Error loading dropdowns:', error);
    }
}

// ========================================
// INITIALIZE ALL
// ========================================

async function loadInitialData() {
    await loadDashboard();
    await loadFacultyProfile();
    await loadDropdowns();
}

// ========================================
// PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeProfileTabs();
    initializePasswordUpdate();
    initializeGradesManagement();
    initializeCourseScheduleFilters();
    initializeStudentOverviewFilters();
    initializeGradesFilters();
    
    // Load data from database
    loadInitialData();
});