// LocalStorage-based Student Success System (No Backend Required)

let currentUser = null;
let currentUserType = 'student';

// Initialize data if not exists
function initializeData() {
    if (!localStorage.getItem('users')) {
        const users = {
            teacher1: { username: 'teacher1', password: 'teacher123', type: 'teacher', name: 'Dr. John Smith' },
            student1: { username: 'student1', password: 'student123', type: 'student', name: 'Rahul Sharma', id: 1, roll: 'CS2021001' },
            student2: { username: 'student2', password: 'student123', type: 'student', name: 'Priya Patel', id: 2, roll: 'CS2021002' },
            student3: { username: 'student3', password: 'student123', type: 'student', name: 'Arjun Kumar', id: 3, roll: 'CS2021003' },
            student4: { username: 'student4', password: 'student123', type: 'student', name: 'Sneha Reddy', id: 4, roll: 'CS2021004' },
            student5: { username: 'student5', password: 'student123', type: 'student', name: 'Vikram Singh', id: 5, roll: 'CS2021005' },
            student6: { username: 'student6', password: 'student123', type: 'student', name: 'Anjali Gupta', id: 6, roll: 'CS2021006' },
            student7: { username: 'student7', password: 'student123', type: 'student', name: 'Karthik Iyer', id: 7, roll: 'CS2021007' },
            student8: { username: 'student8', password: 'student123', type: 'student', name: 'Divya Nair', id: 8, roll: 'CS2021008' }
        };
        localStorage.setItem('users', JSON.stringify(users));
    }
    if (!localStorage.getItem('marks')) {
        localStorage.setItem('marks', JSON.stringify([]));
    }
    if (!localStorage.getItem('attendance')) {
        localStorage.setItem('attendance', JSON.stringify([]));
    }
    if (!localStorage.getItem('darkMode')) {
        localStorage.setItem('darkMode', 'false');
    }
}

initializeData();

// Dark Mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (users[username] && users[username].password === password && users[username].type === currentUserType) {
        currentUser = users[username];
        document.getElementById('loginPage').classList.remove('active');
        
        if (currentUserType === 'teacher') {
            document.getElementById('teacherName').textContent = currentUser.name;
            document.getElementById('teacherDashboard').classList.add('active');
            loadTeacherData();
        } else {
            document.getElementById('studentName').textContent = currentUser.name;
            document.getElementById('studentDashboard').classList.add('active');
            loadStudentData();
        }
    } else {
        document.getElementById('loginError').innerHTML = 'Invalid credentials. <button onclick="retryLogin()" class="btn-retry">Retry</button>';
    }
});

function retryLogin() {
    document.getElementById('loginError').textContent = '';
    document.getElementById('username').focus();
}

['username', 'password'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
        document.getElementById('loginError').textContent = '';
    });
});

function switchTab(type) {
    currentUserType = type;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('loginError').textContent = '';
}

function logout() {
    currentUser = null;
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('loginForm').reset();
}

function showSection(sectionId) {
    document.querySelectorAll('#teacherDashboard .section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#teacherDashboard .section-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    if (sectionId === 'viewPerformance') loadPerformanceData();
    else if (sectionId === 'analytics') loadAnalytics();
    else if (sectionId === 'attendance') loadAttendanceData();
    else if (sectionId === 'viewMarks') {
        document.getElementById('studentMarksTable').innerHTML = '';
        document.getElementById('viewStudentSelect').value = '';
    }
}

function showStudentSection(sectionId) {
    document.querySelectorAll('#studentDashboard .section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#studentDashboard .section-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    if (sectionId === 'myProgress') loadStudentProgress();
    else if (sectionId === 'cgpaPredictor') loadCurrentCGPA();
    else if (sectionId === 'myMarks') loadStudentData();
}

// Teacher functions
function loadTeacherData() {
    const users = JSON.parse(localStorage.getItem('users'));
    const students = Object.values(users).filter(u => u.type === 'student');
    
    const select = document.getElementById('studentSelect');
    select.innerHTML = '<option value="">Select Student</option>';
    students.forEach(s => {
        select.innerHTML += `<option value="${s.id}">${s.name} (${s.roll})</option>`;
    });
    
    const viewSelect = document.getElementById('viewStudentSelect');
    viewSelect.innerHTML = '<option value="">Select Student</option>';
    students.forEach(s => {
        viewSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.roll})</option>`;
    });
    
    const attSelect = document.getElementById('attendanceStudentSelect');
    attSelect.innerHTML = '<option value="">Select Student</option>';
    students.forEach(s => {
        attSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.roll})</option>`;
    });
    
    const viewAttSelect = document.getElementById('viewAttendanceSelect');
    viewAttSelect.innerHTML = '<option value="">Select Student</option>';
    students.forEach(s => {
        viewAttSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.roll})</option>`;
    });
    
    document.getElementById('attendanceDate').valueAsDate = new Date();
}

function loadStudentMarks() {
    const studentId = parseInt(document.getElementById('viewStudentSelect').value);
    if (!studentId) {
        document.getElementById('studentMarksTable').innerHTML = '';
        return;
    }
    
    const marks = JSON.parse(localStorage.getItem('marks')).filter(m => m.studentId === studentId);
    
    if (marks.length === 0) {
        document.getElementById('studentMarksTable').innerHTML = '<p style="text-align: center; padding: 40px; color: #64748B;">No marks found.</p>';
    } else {
        let table = '<table><thead><tr><th>Semester</th><th>Subject</th><th>Internal</th><th>Practical</th><th>External</th><th>Total</th><th>Grade</th><th>Status</th><th>Action</th></tr></thead><tbody>';
        marks.forEach((m, i) => {
            table += `<tr><td>${m.semester}</td><td>${m.subject}</td><td>${m.internal}</td><td>${m.practical}</td><td>${m.external}</td><td>${m.total}</td><td>${m.grade}</td><td class="status-${m.status.toLowerCase()}">${m.status}</td><td><button onclick="deleteMark(${i})" class="btn-delete">Delete</button></td></tr>`;
        });
        table += '</tbody></table>';
        document.getElementById('studentMarksTable').innerHTML = table;
    }
}

function deleteMark(index) {
    if (confirm('Delete this mark?')) {
        const marks = JSON.parse(localStorage.getItem('marks'));
        marks.splice(index, 1);
        localStorage.setItem('marks', JSON.stringify(marks));
        loadStudentMarks();
    }
}

['internalMarks', 'practicalMarks', 'externalMarks'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateTotal);
});

function updateTotal() {
    const internal = parseFloat(document.getElementById('internalMarks').value) || 0;
    const practical = parseFloat(document.getElementById('practicalMarks').value) || 0;
    const external = parseFloat(document.getElementById('externalMarks').value) || 0;
    const total = internal + practical + external;
    
    document.getElementById('totalMarks').textContent = total.toFixed(2);
    document.getElementById('status').textContent = total >= 50 ? 'Pass' : 'Fail';
    document.getElementById('status').className = total >= 50 ? 'status-pass' : 'status-fail';
}

document.getElementById('marksForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const internal = parseFloat(document.getElementById('internalMarks').value);
    const practical = parseFloat(document.getElementById('practicalMarks').value);
    const external = parseFloat(document.getElementById('externalMarks').value);
    const total = internal + practical + external;
    
    const mark = {
        studentId: parseInt(document.getElementById('studentSelect').value),
        semester: parseInt(document.getElementById('semester').value),
        subject: document.getElementById('subjectName').value,
        credits: parseInt(document.getElementById('credits').value),
        internal, practical, external, total,
        grade: total >= 90 ? 'O' : total >= 80 ? 'A+' : total >= 70 ? 'A' : total >= 60 ? 'B+' : total >= 50 ? 'B' : 'F',
        status: total >= 50 ? 'Pass' : 'Fail'
    };
    
    const marks = JSON.parse(localStorage.getItem('marks'));
    marks.push(mark);
    localStorage.setItem('marks', JSON.stringify(marks));
    
    alert('Marks submitted successfully!');
    document.getElementById('marksForm').reset();
    updateTotal();
});

function loadPerformanceData() {
    const users = JSON.parse(localStorage.getItem('users'));
    const marks = JSON.parse(localStorage.getItem('marks'));
    const students = Object.values(users).filter(u => u.type === 'student');
    
    const categories = { excellent: [], good: [], average: [], belowAverage: [], poor: [] };
    
    students.forEach(s => {
        const studentMarks = marks.filter(m => m.studentId === s.id);
        if (studentMarks.length > 0) {
            let totalCredits = 0, totalGradePoints = 0;
            studentMarks.forEach(m => {
                const gp = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, F: 0 }[m.grade] || 0;
                totalCredits += m.credits;
                totalGradePoints += gp * m.credits;
            });
            const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
            const student = { name: s.name, roll: s.roll, cgpa };
            
            if (cgpa >= 9) categories.excellent.push(student);
            else if (cgpa >= 8) categories.good.push(student);
            else if (cgpa >= 6.5) categories.average.push(student);
            else if (cgpa >= 5) categories.belowAverage.push(student);
            else categories.poor.push(student);
        }
    });
    
    displayCategory('excellentStudents', categories.excellent);
    displayCategory('goodStudents', categories.good);
    displayCategory('averageStudents', categories.average);
    displayCategory('belowAverageStudents', categories.belowAverage);
    displayCategory('poorStudents', categories.poor);
}

function displayCategory(elementId, students) {
    const element = document.getElementById(elementId);
    if (students.length === 0) {
        element.innerHTML = '<p style="opacity: 0.7;">No students in this category</p>';
    } else {
        element.innerHTML = students.map(s => `<div class="student-item"><strong>${s.name}</strong> (${s.roll})<br>CGPA: ${s.cgpa.toFixed(2)}</div>`).join('');
    }
}

function loadAnalytics() {
    const marks = JSON.parse(localStorage.getItem('marks'));
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (marks.length === 0) {
        document.getElementById('performanceChart').parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #64748B;">No data available yet.</p>';
        return;
    }
    
    // Calculate insights
    const studentData = {};
    marks.forEach(m => {
        if (!studentData[m.studentId]) studentData[m.studentId] = { credits: 0, gp: 0, subjects: 0 };
        const gp = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, F: 0 }[m.grade] || 0;
        studentData[m.studentId].credits += m.credits;
        studentData[m.studentId].gp += gp * m.credits;
        studentData[m.studentId].subjects++;
    });
    
    const cgpas = Object.values(studentData).map(d => d.credits > 0 ? d.gp / d.credits : 0);
    const avgCGPA = (cgpas.reduce((a, b) => a + b, 0) / cgpas.length).toFixed(2);
    const topCGPA = Math.max(...cgpas).toFixed(2);
    const totalStudents = Object.keys(studentData).length;
    const passRate = ((cgpas.filter(c => c >= 5).length / cgpas.length) * 100).toFixed(1);
    
    document.getElementById('analyticsInsights').innerHTML = `
        <div class="insight-card"><h4>Total Students</h4><div class="value">${totalStudents}</div></div>
        <div class="insight-card"><h4>Average CGPA</h4><div class="value">${avgCGPA}</div></div>
        <div class="insight-card"><h4>Top CGPA</h4><div class="value">${topCGPA}</div></div>
        <div class="insight-card"><h4>Pass Rate</h4><div class="value">${passRate}%</div></div>
    `;
    
    const semesterData = {};
    marks.forEach(m => {
        if (!semesterData[m.studentId]) semesterData[m.studentId] = {};
        if (!semesterData[m.studentId][m.semester]) semesterData[m.studentId][m.semester] = { credits: 0, gp: 0 };
        const gp = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, F: 0 }[m.grade] || 0;
        semesterData[m.studentId][m.semester].credits += m.credits;
        semesterData[m.studentId][m.semester].gp += gp * m.credits;
    });
    
    const datasets = [];
    const colors = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#14b8a6'];
    let colorIndex = 0;
    
    Object.keys(semesterData).forEach(sid => {
        const student = Object.values(users).find(u => u.id === parseInt(sid));
        const semesters = Object.keys(semesterData[sid]).sort();
        const sgpaData = semesters.map(sem => {
            const d = semesterData[sid][sem];
            return d.credits > 0 ? d.gp / d.credits : 0;
        });
        
        datasets.push({
            label: student.name,
            data: sgpaData,
            borderColor: colors[colorIndex % colors.length],
            backgroundColor: colors[colorIndex % colors.length] + '20',
            tension: 0.4
        });
        colorIndex++;
    });
    
    const ctx = document.getElementById('performanceChart').getContext('2d');
    if (window.performanceChart) window.performanceChart.destroy();
    
    window.performanceChart = new Chart(ctx, {
        type: 'line',
        data: { labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'], datasets },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Student Performance Trends', font: { size: 18 } }, legend: { position: 'bottom' } },
            scales: { y: { beginAtZero: true, max: 10, title: { display: true, text: 'SGPA' } } }
        }
    });
}

// Student functions
function loadStudentData() {
    const marks = JSON.parse(localStorage.getItem('marks')).filter(m => m.studentId === currentUser.id);
    
    if (marks.length === 0) {
        document.getElementById('marksTable').innerHTML = '<p>No marks available yet.</p>';
    } else {
        let table = '<table><thead><tr><th>Semester</th><th>Subject</th><th>Internal</th><th>Practical</th><th>External</th><th>Total</th><th>Grade</th><th>Status</th></tr></thead><tbody>';
        marks.forEach(m => {
            table += `<tr><td>${m.semester}</td><td>${m.subject}</td><td>${m.internal}</td><td>${m.practical}</td><td>${m.external}</td><td>${m.total}</td><td>${m.grade}</td><td class="status-${m.status.toLowerCase()}">${m.status}</td></tr>`;
        });
        table += '</tbody></table>';
        document.getElementById('marksTable').innerHTML = table;
    }
    
    // Load attendance
    const attendance = JSON.parse(localStorage.getItem('attendance')).filter(a => a.studentId === currentUser.id);
    if (attendance.length === 0) {
        document.getElementById('myAttendance').innerHTML = '<p>No attendance records yet.</p>';
    } else {
        const total = attendance.length;
        const present = attendance.filter(a => a.status === 'Present').length;
        const absent = attendance.filter(a => a.status === 'Absent').length;
        const late = attendance.filter(a => a.status === 'Late').length;
        const percentage = ((present + late * 0.5) / total * 100).toFixed(1);
        
        document.getElementById('myAttendance').innerHTML = `
            <div class="attendance-summary">
                <div class="attendance-stat"><h4>Total Days</h4><div class="value">${total}</div></div>
                <div class="attendance-stat"><h4>Present</h4><div class="value">${present}</div></div>
                <div class="attendance-stat"><h4>Absent</h4><div class="value">${absent}</div></div>
                <div class="attendance-stat"><h4>Late</h4><div class="value">${late}</div></div>
                <div class="attendance-stat"><h4>Percentage</h4><div class="value">${percentage}%</div></div>
            </div>
        `;
    }
    
    loadCurrentCGPA();
}

function loadCurrentCGPA() {
    const marks = JSON.parse(localStorage.getItem('marks')).filter(m => m.studentId === currentUser.id);
    
    if (marks.length === 0) {
        document.getElementById('predictionResult').innerHTML = '<div class="prediction-card"><h4>Current CGPA</h4><div class="value">0.00</div></div><p style="text-align: center; color: #64748B; margin-top: 20px;">No marks entered yet.</p>';
        return;
    }
    
    let totalCredits = 0, totalGradePoints = 0;
    marks.forEach(m => {
        const gp = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, F: 0 }[m.grade] || 0;
        totalCredits += m.credits;
        totalGradePoints += gp * m.credits;
    });
    
    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
    document.getElementById('predictionResult').innerHTML = `<div class="prediction-card"><h4>Current CGPA</h4><div class="value">${cgpa}</div></div><p style="text-align: center; color: #64748B; margin-top: 20px;">Click "Calculate Required SGPA" to see what you need.</p>`;
}

function predictSGPA() {
    const currentSem = parseInt(document.getElementById('currentSem').value);
    const targetCGPA = parseFloat(document.getElementById('targetCGPA').value);
    
    // Validation
    if (currentSem < 1 || currentSem > 8) {
        alert('Current semester must be between 1 and 8');
        return;
    }
    
    if (targetCGPA < 0 || targetCGPA > 10) {
        alert('Target CGPA must be between 0 and 10');
        return;
    }
    
    // Get all marks
    const marks = JSON.parse(localStorage.getItem('marks')).filter(m => m.studentId === currentUser.id);
    
    if (marks.length === 0) {
        alert('No marks found. Please complete at least one semester first.');
        return;
    }
    
    // Find the LOWEST semester with marks (this is the current semester)
    const semestersWithMarks = [...new Set(marks.map(m => m.semester))].sort((a, b) => a - b);
    const lowestSemWithMarks = semestersWithMarks[0];
    
    // Current semester must match the lowest semester with marks
    if (currentSem !== lowestSemWithMarks) {
        alert(`Error! You have marks entered for semester ${lowestSemWithMarks}. Current semester must be ${lowestSemWithMarks}.`);
        return;
    }
    
    // Calculate current CGPA from all marks
    let totalCredits = 0, totalGradePoints = 0;
    marks.forEach(m => {
        const gp = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, F: 0 }[m.grade] || 0;
        totalCredits += m.credits;
        totalGradePoints += gp * m.credits;
    });
    
    const currentCGPA = totalCredits > 0 ? (totalGradePoints / totalCredits) : 0;
    
    // Check if current CGPA already exceeds target
    if (currentCGPA >= targetCGPA) {
        document.getElementById('predictionResult').innerHTML = `
            <div class="prediction-card"><h4>Current CGPA</h4><div class="value">${currentCGPA.toFixed(2)}</div></div>
            <div class="prediction-card"><h4>Target CGPA</h4><div class="value">${targetCGPA.toFixed(2)}</div></div>
            <div class="prediction-card"><h4>Status</h4><div class="value achievable">✓ Already Achieved!</div></div>
            <p style="color: #10b981; margin-top: 15px; text-align: center; font-weight: 600;">Congratulations! Your current CGPA (${currentCGPA.toFixed(2)}) is already ${currentCGPA > targetCGPA ? 'higher than' : 'equal to'} your target CGPA (${targetCGPA.toFixed(2)}).</p>
        `;
        return;
    }
    
    // Find highest semester with marks
    const highestSemWithMarks = semestersWithMarks[semestersWithMarks.length - 1];
    
    // Check if all semesters completed
    if (highestSemWithMarks === 8) {
        alert('You have already completed all 8 semesters!');
        return;
    }
    
    // Calculate required SGPA for remaining semesters
    const remainingSemesters = 8 - highestSemWithMarks;
    const creditsPerSem = 20;
    const totalFutureCredits = remainingSemesters * creditsPerSem;
    const requiredFutureGP = targetCGPA * (totalCredits + totalFutureCredits) - totalGradePoints;
    const requiredSGPA = (requiredFutureGP / totalFutureCredits);
    const achievable = requiredSGPA <= 10 && requiredSGPA >= 0;
    
    document.getElementById('predictionResult').innerHTML = `
        <div class="prediction-card"><h4>Current CGPA</h4><div class="value">${currentCGPA.toFixed(2)}</div></div>
        <div class="prediction-card"><h4>Target CGPA</h4><div class="value">${targetCGPA.toFixed(2)}</div></div>
        <div class="prediction-card"><h4>Required SGPA</h4><div class="value">${requiredSGPA.toFixed(2)}</div></div>
        <div class="prediction-card"><h4>Remaining Semesters</h4><div class="value">${remainingSemesters}</div></div>
        <div class="prediction-card"><h4>Status</h4><div class="value ${achievable ? 'achievable' : 'not-achievable'}">${achievable ? '✓ Achievable' : '✗ Not Achievable'}</div></div>
        ${!achievable ? '<p style="color: #ef4444; margin-top: 15px; text-align: center; font-weight: 600;">Required SGPA exceeds 10.0. Please lower your target CGPA.</p>' : '<p style="color: #10b981; margin-top: 15px; text-align: center; font-weight: 600;">You need to score an average SGPA of ' + requiredSGPA.toFixed(2) + ' in remaining semesters!</p>'}
    `;
}

function loadStudentProgress() {
    const marks = JSON.parse(localStorage.getItem('marks')).filter(m => m.studentId === currentUser.id);
    
    if (marks.length === 0) {
        document.getElementById('studentProgressChart').parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #64748B;">No data available yet.</p>';
        document.getElementById('performanceSummary').innerHTML = '<p style="text-align: center; padding: 40px; color: #64748B;">No data to display.</p>';
        return;
    }
    
    const semesterData = {};
    marks.forEach(m => {
        if (!semesterData[m.semester]) semesterData[m.semester] = { credits: 0, gp: 0 };
        const gp = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, F: 0 }[m.grade] || 0;
        semesterData[m.semester].credits += m.credits;
        semesterData[m.semester].gp += gp * m.credits;
    });
    
    const semesters = Object.keys(semesterData).sort();
    const sgpaData = semesters.map(sem => {
        const d = semesterData[sem];
        return d.credits > 0 ? d.gp / d.credits : 0;
    });
    
    let cumulativeCredits = 0, cumulativeGP = 0;
    const cgpaData = semesters.map(sem => {
        const d = semesterData[sem];
        cumulativeCredits += d.credits;
        cumulativeGP += d.gp;
        return cumulativeCredits > 0 ? cumulativeGP / cumulativeCredits : 0;
    });
    
    const ctx = document.getElementById('studentProgressChart').getContext('2d');
    if (window.studentChart) window.studentChart.destroy();
    
    window.studentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: semesters.map(s => `Semester ${s}`),
            datasets: [
                { label: 'SGPA', data: sgpaData, backgroundColor: '#2563eb', borderColor: '#1e40af', borderWidth: 2 },
                { label: 'CGPA', data: cgpaData, backgroundColor: '#10b981', borderColor: '#059669', borderWidth: 2 }
            ]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'My Academic Progress', font: { size: 18 } } },
            scales: { y: { beginAtZero: true, max: 10, title: { display: true, text: 'Grade Points' } } }
        }
    });
    
    const latestCGPA = cgpaData[cgpaData.length - 1].toFixed(2);
    const latestSGPA = sgpaData[sgpaData.length - 1].toFixed(2);
    const category = latestCGPA >= 9 ? 'Excellent' : latestCGPA >= 8 ? 'Good' : latestCGPA >= 6.5 ? 'Average' : latestCGPA >= 5 ? 'Below Average' : 'Poor';
    
    document.getElementById('performanceSummary').innerHTML = `
        <div class="performance-summary">
            <div class="summary-card"><h4>Current CGPA</h4><div class="value">${latestCGPA}</div></div>
            <div class="summary-card"><h4>Latest SGPA</h4><div class="value">${latestSGPA}</div></div>
            <div class="summary-card"><h4>Performance</h4><div class="value" style="font-size: 20px;">${category}</div></div>
            <div class="summary-card"><h4>Semesters Completed</h4><div class="value">${semesters.length}</div></div>
        </div>
    `;
}


// Attendance Management
function loadAttendanceData() {
    const users = JSON.parse(localStorage.getItem('users'));
    const students = Object.values(users).filter(u => u.type === 'student');
    
    const attSelect = document.getElementById('attendanceStudentSelect');
    attSelect.innerHTML = '<option value="">Select Student</option>';
    students.forEach(s => {
        attSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.roll})</option>`;
    });
    
    const viewAttSelect = document.getElementById('viewAttendanceSelect');
    viewAttSelect.innerHTML = '<option value="">Select Student</option>';
    students.forEach(s => {
        viewAttSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.roll})</option>`;
    });
}

document.getElementById('attendanceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const attendance = JSON.parse(localStorage.getItem('attendance'));
    const record = {
        studentId: parseInt(document.getElementById('attendanceStudentSelect').value),
        date: document.getElementById('attendanceDate').value,
        status: document.getElementById('attendanceStatus').value
    };
    
    attendance.push(record);
    localStorage.setItem('attendance', JSON.stringify(attendance));
    
    alert('Attendance marked successfully!');
    document.getElementById('attendanceForm').reset();
    document.getElementById('attendanceDate').valueAsDate = new Date();
});

function loadAttendanceRecords() {
    const studentId = parseInt(document.getElementById('viewAttendanceSelect').value);
    if (!studentId) {
        document.getElementById('attendanceTable').innerHTML = '';
        return;
    }
    
    const attendance = JSON.parse(localStorage.getItem('attendance')).filter(a => a.studentId === studentId);
    
    if (attendance.length === 0) {
        document.getElementById('attendanceTable').innerHTML = '<p style="text-align: center; padding: 40px; color: #64748B;">No attendance records found.</p>';
    } else {
        const total = attendance.length;
        const present = attendance.filter(a => a.status === 'Present').length;
        const absent = attendance.filter(a => a.status === 'Absent').length;
        const late = attendance.filter(a => a.status === 'Late').length;
        const percentage = ((present + late * 0.5) / total * 100).toFixed(1);
        
        let html = `<div class="attendance-summary">
            <div class="attendance-stat"><h4>Total Days</h4><div class="value">${total}</div></div>
            <div class="attendance-stat"><h4>Present</h4><div class="value">${present}</div></div>
            <div class="attendance-stat"><h4>Absent</h4><div class="value">${absent}</div></div>
            <div class="attendance-stat"><h4>Late</h4><div class="value">${late}</div></div>
            <div class="attendance-stat"><h4>Percentage</h4><div class="value">${percentage}%</div></div>
        </div>`;
        
        html += '<table style="margin-top: 30px;"><thead><tr><th>Date</th><th>Status</th></tr></thead><tbody>';
        attendance.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(a => {
            html += `<tr><td>${new Date(a.date).toLocaleDateString()}</td><td class="status-${a.status.toLowerCase()}">${a.status}</td></tr>`;
        });
        html += '</tbody></table>';
        
        document.getElementById('attendanceTable').innerHTML = html;
    }
}

// Search/Filter Students
function filterStudents() {
    const search = document.getElementById('studentSearch').value.toLowerCase();
    const categories = document.querySelectorAll('.category-card');
    
    categories.forEach(cat => {
        const students = cat.querySelectorAll('.student-item');
        let visibleCount = 0;
        
        students.forEach(student => {
            const text = student.textContent.toLowerCase();
            if (text.includes(search)) {
                student.style.display = 'block';
                visibleCount++;
            } else {
                student.style.display = 'none';
            }
        });
        
        if (visibleCount === 0 && search) {
            cat.style.opacity = '0.5';
        } else {
            cat.style.opacity = '1';
        }
    });
}

// PDF Export Functions
function exportPerformancePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Student Performance Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    
    const users = JSON.parse(localStorage.getItem('users'));
    const marks = JSON.parse(localStorage.getItem('marks'));
    const students = Object.values(users).filter(u => u.type === 'student');
    
    let y = 45;
    students.forEach(s => {
        const studentMarks = marks.filter(m => m.studentId === s.id);
        if (studentMarks.length > 0) {
            let totalCredits = 0, totalGradePoints = 0;
            studentMarks.forEach(m => {
                const gp = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, F: 0 }[m.grade] || 0;
                totalCredits += m.credits;
                totalGradePoints += gp * m.credits;
            });
            const cgpa = (totalGradePoints / totalCredits).toFixed(2);
            
            doc.text(`${s.name} (${s.roll}): CGPA ${cgpa}`, 20, y);
            y += 10;
            
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        }
    });
    
    doc.save('performance-report.pdf');
}

function exportChartPDF() {
    const canvas = document.getElementById('performanceChart');
    const imgData = canvas.toDataURL('image/png');
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');
    
    doc.setFontSize(20);
    doc.text('Performance Analytics', 20, 20);
    doc.addImage(imgData, 'PNG', 10, 30, 270, 150);
    
    doc.save('analytics-chart.pdf');
}

function exportMyMarksPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('My Academic Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Student: ${currentUser.name}`, 20, 30);
    doc.text(`Roll No: ${currentUser.roll}`, 20, 38);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 46);
    
    const marks = JSON.parse(localStorage.getItem('marks')).filter(m => m.studentId === currentUser.id);
    
    let y = 60;
    marks.forEach(m => {
        doc.text(`Sem ${m.semester} - ${m.subject}: ${m.total}/100 (${m.grade})`, 20, y);
        y += 8;
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });
    
    doc.save('my-marks.pdf');
}

function exportProgressPDF() {
    const canvas = document.getElementById('studentProgressChart');
    const imgData = canvas.toDataURL('image/png');
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('My Progress Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Student: ${currentUser.name}`, 20, 30);
    doc.addImage(imgData, 'PNG', 10, 40, 190, 120);
    
    doc.save('my-progress.pdf');
}
