// ========================================
// DATABASE CONNECTION FUNCTIONS
// ========================================
// TODO: Replace these with your actual database API calls

async function fetchStudentData() {
    // TODO: Implement API call to fetch student data
    // Example: return await fetch('/api/student').then(res => res.json());
    console.log('Fetch student data from database');
}

async function fetchEnrolledCourses() {
    // TODO: Implement API call to fetch enrolled courses
    console.log('Fetch enrolled courses from database');
}

async function fetchSchedule(schoolYear, semester) {
    // TODO: Implement API call to fetch schedule
    console.log('Fetch schedule from database', schoolYear, semester);
}

async function fetchAvailableCourses() {
    // TODO: Implement API call to fetch available courses for enrollment
    console.log('Fetch available courses from database');
}

async function fetchGrades(schoolYear, semester) {
    // TODO: Implement API call to fetch grades
    console.log('Fetch grades from database', schoolYear, semester);
}

async function submitEnrollment(selectedCourses) {
    // TODO: Implement API call to submit enrollment
    console.log('Submit enrollment to database', selectedCourses);
}

async function updatePassword(currentPassword, newPassword) {
    // TODO: Implement API call to update password
    console.log('Update password in database');
}

// ========================================
// UI POPULATION FUNCTIONS
// ========================================

function populateStudentInfo(data) {
    // Dashboard
    document.getElementById('student-first-name').textContent = data.firstName || 'Student';
    document.getElementById('student-full-name').textContent = data.fullName || 'N/A';
    document.getElementById('student-number').textContent = data.studentNumber || 'N/A';
    document.getElementById('student-program').textContent = data.program || 'N/A';
    document.getElementById('current-semester').textContent = data.semester || 'N/A';
    document.getElementById('current-school-year').textContent = data.schoolYear || 'N/A';
    
    // Profile
    document.getElementById('profile-full-name').textContent = data.fullName || 'N/A';
    document.getElementById('profile-degree').textContent = data.program || 'N/A';
    document.getElementById('profile-year').textContent = `Year ${data.year || '--'}`;
    document.getElementById('profile-student-number').textContent = data.studentNumber || 'N/A';
    document.getElementById('profile-first-name').value = data.firstName || '';
    document.getElementById('profile-middle-name').value = data.middleName || '';
    document.getElementById('profile-last-name').value = data.lastName || '';
    document.getElementById('profile-email').value = data.email || '';
    document.getElementById('profile-dob').value = data.dateOfBirth || '';
    document.getElementById('profile-phone').value = data.phone || '';
    document.getElementById('profile-address').value = data.address || '';
}

function populateEnrolledCourses(courses) {
    const coursesGrid = document.getElementById('courses-grid');
    const courseCount = document.getElementById('course-count');
    coursesGrid.innerHTML = '';
    courseCount.textContent = courses.length;

    const statusColors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'];
    
    courses.forEach((course, index) => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card' + (index >= 4 ? ' hidden-course' : '');
        courseCard.innerHTML = `
            <span class="status-indicator status-${statusColors[index % statusColors.length]}"></span>
            <div class="course-code">${course.code}</div>
            <div class="course-title">${course.title}</div>
            <div class="course-instructor">${course.instructor}</div>
            <div class="course-details">${course.schedule} · ${course.room}</div>
        `;
        coursesGrid.appendChild(courseCard);
    });

    // Show/hide view more button
    const viewMoreBtn = document.getElementById('view-more-btn');
    viewMoreBtn.style.display = courses.length > 4 ? 'flex' : 'none';
}

function populateProgress(data) {
    document.getElementById('overall-gwa').textContent = data.gwa || '--';
    document.getElementById('academic-units').textContent = data.academicUnits || '--';
    document.getElementById('non-academic-units').textContent = data.nonAcademicUnits || '--';
    document.getElementById('total-units-earned').textContent = data.totalUnits || '--';
    
    const percentage = data.progressPercentage || 0;
    document.getElementById('progress-percentage').textContent = `${percentage}%`;
    document.getElementById('progress-label').textContent = data.progressLabel || 'Keep going!';
    
    // Update progress circle
    const circle = document.getElementById('progress-circle');
    const circumference = 408;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

function populateScheduleTable(schedules) {
    const tbody = document.getElementById('schedule-table-body');
    tbody.innerHTML = '';
    
    schedules.forEach(schedule => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${schedule.courseName}</td>
            <td>${schedule.courseCode}</td>
            <td>${schedule.lecture}</td>
            <td>${schedule.lab}</td>
            <td>${schedule.units}</td>
            <td>${schedule.schedule}</td>
            <td>${schedule.room}</td>
            <td>${schedule.section}</td>
            <td class="status ${schedule.status.toLowerCase()}">${schedule.status}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateWeeklySchedule(schedules) {
    const weeklySchedule = document.getElementById('weekly-schedule');
    weeklySchedule.innerHTML = '';
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const scheduleByDay = {};
    
    // Group schedules by day
    schedules.forEach(schedule => {
        const day = schedule.day;
        if (!scheduleByDay[day]) {
            scheduleByDay[day] = [];
        }
        scheduleByDay[day].push(schedule);
    });
    
    // Create day columns
    days.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.className = 'day-column';
        dayColumn.innerHTML = `<h3>${day}</h3>`;
        
        if (scheduleByDay[day]) {
            scheduleByDay[day].forEach(schedule => {
                const classCard = document.createElement('div');
                classCard.className = 'class-card';
                classCard.innerHTML = `
                    <div class="class-title">${schedule.courseName}</div>
                    <div class="class-details">${schedule.time} - ${schedule.room}</div>
                `;
                dayColumn.appendChild(classCard);
            });
        }
        
        weeklySchedule.appendChild(dayColumn);
    });
}

function populateRegistrationTable(courses) {
    const tbody = document.getElementById('registration-table-body');
    tbody.innerHTML = '';
    
    courses.forEach((course, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" id="course-${index}" name="course-${index}" data-units="${course.units}"></td>
            <td>${course.courseName}</td>
            <td>${course.courseCode}</td>
            <td>${course.lecture}</td>
            <td>${course.lab}</td>
            <td>${course.units}</td>
            <td>${course.schedule}</td>
            <td>${course.room}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Reinitialize checkbox listeners
    initializeEnrollmentListeners();
}

function populateGradesTable(grades) {
    const tbody = document.getElementById('grades-table-body');
    tbody.innerHTML = '';
    
    grades.forEach(grade => {
        const row = document.createElement('tr');
        const remarkClass = grade.remark.toLowerCase() === 'passed' ? 'passed' : 'failed';
        row.innerHTML = `
            <td>${grade.courseName}</td>
            <td>${grade.courseCode}</td>
            <td>${grade.units}</td>
            <td>${grade.grade}</td>
            <td><span class="remark-badge ${remarkClass}">${grade.remark}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    calculateSemesterGWA();
}

function populateDropdowns(schoolYears, semesters) {
    // Schedule dropdowns
    const schoolYearSelect = document.getElementById('schoolYear');
    const semesterSelect = document.getElementById('semester');
    
    schoolYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        schoolYearSelect.appendChild(option);
    });
    
    semesters.forEach(sem => {
        const option = document.createElement('option');
        option.value = sem.value;
        option.textContent = sem.label;
        semesterSelect.appendChild(option);
    });
    
    // Grades dropdowns (clone the same options)
    const gradesSchoolYear = document.getElementById('gradesSchoolYear');
    const gradesSemester = document.getElementById('gradesSemester');
    
    schoolYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        gradesSchoolYear.appendChild(option);
    });
    
    semesters.forEach(sem => {
        const option = document.createElement('option');
        option.value = sem.value;
        option.textContent = sem.label;
        gradesSemester.appendChild(option);
    });
}

// ========================================
// ENROLLMENT FUNCTIONS
// ========================================

function initializeEnrollmentListeners() {
    const selectAllCheckbox = document.getElementById('select-all-bottom');
    const checkboxes = document.querySelectorAll('#registration-table-body input[type="checkbox"]');

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', () => {
            checkboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
            updateTotalUnits();
        });
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            selectAllCheckbox.checked = Array.from(checkboxes).every(c => c.checked);
            updateTotalUnits();
        });
    });
}

function updateTotalUnits() {
    const checkboxes = document.querySelectorAll('#registration-table-body input[type="checkbox"]');
    let total = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseInt(checkbox.dataset.units) || 0;
        }
    });
    
    document.getElementById('total-units').textContent = `Total Units: ${total}`;
}

// ========================================
// GRADES FUNCTIONS
// ========================================

function calculateSemesterGWA() {
    const tbody = document.getElementById('grades-table-body');
    if (!tbody) return;
    
    const rows = tbody.querySelectorAll('tr');
    let totalWeightedGrade = 0;
    let totalUnits = 0;
    
    rows.forEach(row => {
        const units = parseInt(row.cells[2].textContent);
        const grade = parseFloat(row.cells[3].textContent);
        
        if (!isNaN(units) && !isNaN(grade)) {
            totalWeightedGrade += (grade * units);
            totalUnits += units;
        }
    });
    
    const gwa = totalUnits > 0 ? (totalWeightedGrade / totalUnits).toFixed(2) : 0;
    
    const gwaDisplay = document.getElementById('semester-gwa-display');
    if (gwaDisplay) {
        gwaDisplay.textContent = `Semester GWA: ${gwa}`;
    }
}

// ========================================
// VIEW MORE FUNCTIONALITY
// ========================================

function initializeViewMore() {
    const viewMoreBtn = document.getElementById('view-more-btn');
    const viewMoreText = document.getElementById('view-more-text');
    const viewMoreIcon = document.getElementById('view-more-icon');
    let isExpanded = false;

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            const hiddenCourses = document.querySelectorAll('.hidden-course');
            
            if (isExpanded) {
                hiddenCourses.forEach(course => {
                    course.style.display = 'block';
                });
                viewMoreText.textContent = 'View Less';
                viewMoreIcon.style.transform = 'rotate(180deg)';
            } else {
                hiddenCourses.forEach(course => {
                    course.style.display = 'none';
                });
                viewMoreText.textContent = 'View More';
                viewMoreIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
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
            
            // Handle logout
            if (page === 'logout') {
                if (confirm('Are you sure you want to logout?')) {
                    // TODO: Implement logout logic
                    window.location.href = 'student.html';
                }
                return;
            }
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(p => {
                p.classList.remove('active');
            });
            
            // Show selected page
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
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            const activeTab = document.getElementById(tabName + '-tab');
            if (activeTab) {
                activeTab.classList.add('active');
            }
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
// ENROLLMENT SUBMISSION
// ========================================

function initializeEnrollmentSubmission() {
    const submitBtn = document.getElementById('submit-enrollment');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', async function() {
            const checkboxes = document.querySelectorAll('#registration-table-body input[type="checkbox"]:checked');
            
            if (checkboxes.length === 0) {
                alert('Please select at least one course');
                return;
            }
            
            const selectedCourses = Array.from(checkboxes).map(cb => ({
                id: cb.id,
                name: cb.name
            }));
            
            if (confirm(`Are you sure you want to enroll in ${checkboxes.length} course(s)?`)) {
                try {
                    await submitEnrollment(selectedCourses);
                    alert('Enrollment submitted successfully!');
                    // Reload courses
                    loadEnrolledCourses();
                } catch (error) {
                    alert('Error submitting enrollment: ' + error.message);
                }
            }
        });
    }
}

// ========================================
// FILTER HANDLERS
// ========================================

function initializeFilters() {
    const schoolYearSelect = document.getElementById('schoolYear');
    const semesterSelect = document.getElementById('semester');
    const gradesSchoolYear = document.getElementById('gradesSchoolYear');
    const gradesSemester = document.getElementById('gradesSemester');

    if (schoolYearSelect && semesterSelect) {
        schoolYearSelect.addEventListener('change', async function() {
            const schoolYear = this.value;
            const semester = semesterSelect.value;
            if (schoolYear && semester) {
                const schedules = await fetchSchedule(schoolYear, semester);
                populateScheduleTable(schedules.table || []);
                populateWeeklySchedule(schedules.weekly || []);
            }
        });

        semesterSelect.addEventListener('change', async function() {
            const schoolYear = schoolYearSelect.value;
            const semester = this.value;
            if (schoolYear && semester) {
                const schedules = await fetchSchedule(schoolYear, semester);
                populateScheduleTable(schedules.table || []);
                populateWeeklySchedule(schedules.weekly || []);
            }
        });
    }

    if (gradesSchoolYear && gradesSemester) {
        gradesSchoolYear.addEventListener('change', async function() {
            const schoolYear = this.value;
            const semester = gradesSemester.value;
            if (schoolYear && semester) {
                const grades = await fetchGrades(schoolYear, semester);
                populateGradesTable(grades || []);
            }
        });

        gradesSemester.addEventListener('change', async function() {
            const schoolYear = gradesSchoolYear.value;
            const semester = this.value;
            if (schoolYear && semester) {
                const grades = await fetchGrades(schoolYear, semester);
                populateGradesTable(grades || []);
            }
        });
    }
}

// ========================================
// LOAD FUNCTIONS
// ========================================

async function loadStudentInfo() {
    try {
        const data = await fetchStudentData();
        populateStudentInfo(data);
    } catch (error) {
        console.error('Error loading student info:', error);
    }
}

async function loadEnrolledCourses() {
    try {
        const courses = await fetchEnrolledCourses();
        populateEnrolledCourses(courses || []);
    } catch (error) {
        console.error('Error loading enrolled courses:', error);
    }
}

async function loadProgress() {
    try {
        const data = await fetchStudentData();
        populateProgress(data.progress || {});
    } catch (error) {
        console.error('Error loading progress:', error);
    }
}

async function loadAvailableCourses() {
    try {
        const courses = await fetchAvailableCourses();
        populateRegistrationTable(courses || []);
    } catch (error) {
        console.error('Error loading available courses:', error);
    }
}

async function loadDropdowns() {
    try {
        // TODO: Fetch from database
        const schoolYears = ['2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025'];
        const semesters = [
            { value: '1', label: 'First Semester' },
            { value: '2', label: 'Second Semester' }
        ];
        populateDropdowns(schoolYears, semesters);
    } catch (error) {
        console.error('Error loading dropdowns:', error);
    }
}

// ========================================
// INITIALIZE ALL
// ========================================

async function loadInitialData() {
    await loadStudentInfo();
    await loadEnrolledCourses();
    await loadProgress();
    await loadAvailableCourses();
    await loadDropdowns();
}

// ========================================
// PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeProfileTabs();
    initializeViewMore();
    initializeEnrollmentListeners();
    initializeEnrollmentSubmission();
    initializePasswordUpdate();
    initializeFilters();
    
    // Load data from database
    loadInitialData();
});