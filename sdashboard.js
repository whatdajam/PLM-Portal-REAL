// ========================================
// DATABASE CONNECTION FUNCTIONS
// ========================================

async function fetchStudentData() {
    const response = await fetch('/api/student');
    if (!response.ok) throw new Error('Failed to fetch student data');
    return await response.json();
}

async function fetchEnrolledCourses() {
    const response = await fetch('/api/courses/enrolled');
    if (!response.ok) throw new Error('Failed to fetch enrolled courses');
    return await response.json();
}

async function fetchSchedule(schoolYear, semester) {
    // Sends the selected year and sem to the server
    const response = await fetch(`/api/schedule?schoolYear=${schoolYear}&semester=${semester}`);
    if (!response.ok) throw new Error('Failed to fetch schedule');
    return await response.json();
}

async function fetchAvailableCourses() {
    const response = await fetch('/api/courses/available');
    if (!response.ok) throw new Error('Failed to fetch available courses');
    return await response.json();
}

async function fetchGrades(schoolYear, semester) {
    const response = await fetch(`/api/grades?schoolYear=${schoolYear}&semester=${semester}`);
    if (!response.ok) throw new Error('Failed to fetch grades');
    return await response.json();
}

async function submitEnrollment(selectedCourses) {
    const response = await fetch('/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courses: selectedCourses })
    });
    if (!response.ok) throw new Error('Failed to submit enrollment');
    return await response.json();
}

async function updatePassword(currentPassword, newPassword) {
    const response = await fetch('/api/student/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
    });
    if (!response.ok) throw new Error('Failed to update password');
    return await response.json();
}

// ========================================
// UI POPULATION FUNCTIONS
// ========================================

function populateStudentInfo(data) {
    // Dashboard
    if(document.getElementById('student-first-name')) document.getElementById('student-first-name').textContent = data.firstName || 'Student';
    if(document.getElementById('student-full-name')) document.getElementById('student-full-name').textContent = data.fullName || 'N/A';
    if(document.getElementById('student-number')) document.getElementById('student-number').textContent = data.studentNumber || 'N/A';
    if(document.getElementById('student-program')) document.getElementById('student-program').textContent = data.program || 'N/A';
    if(document.getElementById('current-semester')) document.getElementById('current-semester').textContent = data.semester || 'N/A';
    if(document.getElementById('current-school-year')) document.getElementById('current-school-year').textContent = data.schoolYear || 'N/A';
    
    // Profile
    if(document.getElementById('profile-full-name')) document.getElementById('profile-full-name').textContent = data.fullName || 'N/A';
    if(document.getElementById('profile-degree')) document.getElementById('profile-degree').textContent = data.programName || data.program || 'N/A'; // Use programName if available
    if(document.getElementById('profile-year')) document.getElementById('profile-year').textContent = `Year ${data.year || '--'}`;
    if(document.getElementById('profile-student-number')) document.getElementById('profile-student-number').textContent = data.studentNumber || 'N/A';
    if(document.getElementById('profile-first-name')) document.getElementById('profile-first-name').value = data.firstName || '';
    if(document.getElementById('profile-middle-name')) document.getElementById('profile-middle-name').value = data.middleName || '';
    if(document.getElementById('profile-last-name')) document.getElementById('profile-last-name').value = data.lastName || '';
    if(document.getElementById('profile-email')) document.getElementById('profile-email').value = data.email || '';
    
    // Format Date for Input Field (YYYY-MM-DD)
    if(document.getElementById('profile-dob')) {
        let dob = data.dateOfBirth;
        if (dob && new Date(dob).toString() !== 'Invalid Date') {
            const d = new Date(dob);
            dob = d.toISOString().split('T')[0];
        }
        document.getElementById('profile-dob').value = dob || '';
    }

    if(document.getElementById('profile-phone')) document.getElementById('profile-phone').value = data.phone || '';
    if(document.getElementById('profile-address')) document.getElementById('profile-address').value = data.address || '';
}

function populateEnrolledCourses(courses) {
    const coursesGrid = document.getElementById('courses-grid');
    const courseCount = document.getElementById('course-count');
    
    if(!coursesGrid) return;

    coursesGrid.innerHTML = '';
    courseCount.textContent = courses.length;

    const statusColors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'];
    
    courses.forEach((course, index) => {
        const courseCard = document.createElement('div');
        // Only hide if index >= 4 AND view more button exists
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
    if(viewMoreBtn) viewMoreBtn.style.display = courses.length > 4 ? 'flex' : 'none';
    
    // Re-initialize View More in case it was clicked before reload
    initializeViewMore(); 
}

function populateProgress(data) {
    if(document.getElementById('overall-gwa')) document.getElementById('overall-gwa').textContent = data.gwa || '--';
    if(document.getElementById('academic-units')) document.getElementById('academic-units').textContent = data.academicUnits || '--';
    if(document.getElementById('non-academic-units')) document.getElementById('non-academic-units').textContent = data.nonAcademicUnits || '--';
    if(document.getElementById('total-units-earned')) document.getElementById('total-units-earned').textContent = data.totalUnits || '--';
    
    const percentage = data.progressPercentage || 0;
    if(document.getElementById('progress-percentage')) document.getElementById('progress-percentage').textContent = `${percentage}%`;
    if(document.getElementById('progress-label')) document.getElementById('progress-label').textContent = data.progressLabel || 'Keep going!';
    
    // Update progress circle
    const circle = document.getElementById('progress-circle');
    if (circle) {
        const circumference = 408;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
}

function populateScheduleTable(schedules) {
    const tbody = document.getElementById('schedule-table-body');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    if (schedules.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding: 20px;">No schedule found for this period.</td></tr>';
        return;
    }

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
            <td>${schedule.section || 'N/A'}</td>
            <td class="status ${schedule.status ? schedule.status.toLowerCase() : ''}">${schedule.status || 'Enrolled'}</td>
        `;
        tbody.appendChild(row);
    });
}

function populateWeeklySchedule(schedules) {
    const weeklySchedule = document.getElementById('weekly-schedule');
    if(!weeklySchedule) return;
    weeklySchedule.innerHTML = '';
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    if(!tbody) return;
    tbody.innerHTML = '';
    
    courses.forEach((course, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" id="course-${index}" name="${course.courseCode}" data-units="${course.units}"></td>
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
    if(!tbody) return;
    tbody.innerHTML = '';
    
    if (grades.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">No grades found for this period.</td></tr>';
        return;
    }

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
    // Helper to populate a select element
    const fillSelect = (selectId, items) => {
        const select = document.getElementById(selectId);
        if (!select) return;
        select.innerHTML = ''; // Clear existing
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.value || item; // Handle objects or strings
            option.textContent = item.label || item;
            select.appendChild(option);
        });
    };

    // Populate all dropdowns
    fillSelect('schoolYear', schoolYears);
    fillSelect('semester', semesters);
    fillSelect('gradesSchoolYear', schoolYears);
    fillSelect('gradesSemester', semesters);

    // Set Default Values to the latest (matches database data)
    const setDefaults = (ids) => {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if(el && el.options.length > 0) {
                // Default to 2025-2026 (index 0 based on loadDropdowns order)
                el.selectedIndex = 0; 
            }
        });
    };
    
    setDefaults(['schoolYear', 'semester', 'gradesSchoolYear', 'gradesSemester']);
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
            if(selectAllCheckbox) selectAllCheckbox.checked = Array.from(checkboxes).every(c => c.checked);
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
    
    const totalUnitsEl = document.getElementById('total-units');
    if(totalUnitsEl) totalUnitsEl.textContent = `Total Units: ${total}`;
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
        // Skip "No grades found" row
        if (row.cells.length < 4) return;

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
        // Remove old listeners to prevent duplicates
        const newBtn = viewMoreBtn.cloneNode(true);
        viewMoreBtn.parentNode.replaceChild(newBtn, viewMoreBtn);

        newBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            const hiddenCourses = document.querySelectorAll('.hidden-course');
            const btnText = document.getElementById('view-more-text');
            const btnIcon = document.getElementById('view-more-icon');
            
            if (isExpanded) {
                hiddenCourses.forEach(course => {
                    course.style.display = 'flex'; // Changed to flex to maintain layout
                });
                if(btnText) btnText.textContent = 'View Less';
                if(btnIcon) btnIcon.style.transform = 'rotate(180deg)';
            } else {
                hiddenCourses.forEach(course => {
                    course.style.display = 'none';
                });
                if(btnText) btnText.textContent = 'View More';
                if(btnIcon) btnIcon.style.transform = 'rotate(0deg)';
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

    const handleFilterChange = async (yearEl, semEl, type) => {
        const year = yearEl.value;
        const sem = semEl.value;
        if(year && sem) {
            if (type === 'schedule') {
                try {
                    const schedules = await fetchSchedule(year, sem);
                    populateScheduleTable(schedules.table || []);
                    populateWeeklySchedule(schedules.weekly || []);
                } catch (e) { console.error(e); }
            } else if (type === 'grades') {
                try {
                    const grades = await fetchGrades(year, sem);
                    populateGradesTable(grades || []);
                } catch (e) { console.error(e); }
            }
        }
    };

    if (schoolYearSelect && semesterSelect) {
        schoolYearSelect.addEventListener('change', () => handleFilterChange(schoolYearSelect, semesterSelect, 'schedule'));
        semesterSelect.addEventListener('change', () => handleFilterChange(schoolYearSelect, semesterSelect, 'schedule'));
    }

    if (gradesSchoolYear && gradesSemester) {
        gradesSchoolYear.addEventListener('change', () => handleFilterChange(gradesSchoolYear, gradesSemester, 'grades'));
        gradesSemester.addEventListener('change', () => handleFilterChange(gradesSchoolYear, gradesSemester, 'grades'));
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
        // UPDATED: Added your actual DB years
        const schoolYears = ['2025-2026', '2024-2025', '2023-2024'];
        const semesters = [
            { value: '1', label: 'First Semester' },
            { value: '2', label: 'Second Semester' }
        ];
        populateDropdowns(schoolYears, semesters);
    } catch (error) {
        console.error('Error loading dropdowns:', error);
    }
}

async function loadCurrentSchedule() {
    // Manually trigger the fetch for the default values (2025-2026 / 1st Sem)
    const year = document.getElementById('schoolYear').value;
    const sem = document.getElementById('semester').value;
    if(year && sem) {
        const schedules = await fetchSchedule(year, sem);
        populateScheduleTable(schedules.table || []);
        populateWeeklySchedule(schedules.weekly || []);
        
        const grades = await fetchGrades(year, sem);
        populateGradesTable(grades || []);
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
    
    // Load dropdowns FIRST, then load the schedule using those dropdown values
    await loadDropdowns(); 
    await loadCurrentSchedule();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProfileTabs();
    initializeViewMore();
    initializeEnrollmentListeners();
    initializeEnrollmentSubmission();
    initializePasswordUpdate();
    initializeFilters();
    
    loadInitialData();
});
