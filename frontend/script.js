const API_URL = 'http://localhost:5000/api';
let currentUser = null;
let currentUserType = 'student';
let studentData = null;

// Login functionality
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, userType: currentUserType })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            studentData = data.studentData;
            
            document.getElementById('loginPage').classList.remove('active');
            
            if (currentUserType === 'teacher') {
                document.getElementById('teacherName').textContent = currentUser.full_name;
                document.getElementById('teacherDashboard').classList.add('active');
                loadTeacherData();
            } else {
                document.getElementById('studentName').textContent = currentUser.full_name;
                document.getElementById('studentDashboard').classList.add('active');
                loadStudentData();
            }
        } else {
            errorDiv.innerHTML = 'Invalid credentials. <button onclick="retryLogin()" class="btn-retry">Retry</button>';
        }
    } catch (error) {
        errorDiv.innerHTML = 'Connection error. Please check if the server is running. <button onclick="retryLogin()" class="btn-retry">Retry</button>';
    }
});

function retryLogin() {
    document.getElementById('loginError').textContent = '';
    document.getElementById('username').focus();
}

// Clear error when user starts typing
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
    studentData = null;
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('loginForm').reset();
}

function showSection(sectionId) {
    document.querySelectorAll('#teacherDashboard .section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#teacherDashboard .section-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    if (sectionId === 'viewPerformance') {
        loadPerformanceData();
    } else if (sectionId === 'analytics') {
        loadAnalytics();
    } else if (sectionId === 'viewMarks') {
        document.getElementById('studentMarksTable').innerHTML = '';
        document.getElementById('viewStudentSelect').value = '';
    }
}

function showStudentSection(sectionId) {
    document.querySelectorAll('#studentDashboard .section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#studentDashboard .section-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    if (sectionId === 'myProgress') {
        loadStudentProgress();
    } else if (sectionId === 'cgpaPredictor') {
        loadCurrentCGPA();
    } else if (sectionId === 'myMarks') {
        loadStudentData();
    }
}

// Teacher functionality
async function loadTeacherData() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const students = await response.json();
        
        const select = document.getElementById('studentSelect');
        select.innerHTML = '<option value="">Select Student</option>';
        students.forEach(student => {
            select.innerHTML += `<option value="${student.student_id}">${student.full_name} (${student.roll_number})</option>`;
        });
        
        // Also populate view/delete dropdown
        const viewSelect = document.getElementById('viewStudentSelect');
        viewSelect.innerHTML = '<option value="">Select Student</option>';
        students.forEach(student => {
            viewSelect.innerHTML += `<option value="${student.student_id}">${student.full_name} (${student.roll_number})</option>`;
        });
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

async function loadStudentMarks() {
    const studentId = document.getElementById('viewStudentSelect').value;
    
    if (!studentId) {
        document.getElementById('studentMarksTable').innerHTML = '';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/marks/${studentId}`);
        const marks = await response.json();
        
        if (marks.length === 0) {
            document.getElementById('studentMarksTable').innerHTML = '<p style="text-align: center; padding: 40px; color: #64748B;">No marks found for this student.</p>';
        } else {
            let table = `
                <table>
                    <thead>
                        <tr>
                            <th>Semester</th>
                            <th>Subject</th>
                            <th>Internal</th>
                            <th>Practical</th>
                            <th>External</th>
                            <th>Total</th>
                            <th>Grade</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            marks.forEach(mark => {
                table += `
                    <tr>
                        <td>${mark.semester}</td>
                        <td>${mark.subject_name}</td>
                        <td>${mark.internal_marks}</td>
                        <td>${mark.practical_marks}</td>
                        <td>${mark.external_marks}</td>
                        <td>${mark.total_marks}</td>
                        <td>${mark.grade}</td>
                        <td class="status-${mark.status.toLowerCase()}">${mark.status}</td>
                        <td><button onclick="deleteMark(${mark.mark_id})" class="btn-delete">Delete</button></td>
                    </tr>
                `;
            });
            
            table += '</tbody></table>';
            document.getElementById('studentMarksTable').innerHTML = table;
        }
    } catch (error) {
        console.error('Error loading marks:', error);
    }
}

async function deleteMark(markId) {
    if (!confirm('Are you sure you want to delete this mark?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/marks/${markId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Mark deleted successfully!');
            loadStudentMarks(); // Reload the table
        } else {
            alert('Error deleting mark');
        }
    } catch (error) {
        alert('Error deleting mark');
    }
}

// Calculate total marks in real-time
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

document.getElementById('marksForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        student_id: document.getElementById('studentSelect').value,
        semester: document.getElementById('semester').value,
        subject_name: document.getElementById('subjectName').value,
        internal_marks: document.getElementById('internalMarks').value,
        practical_marks: document.getElementById('practicalMarks').value,
        external_marks: document.getElementById('externalMarks').value,
        credits: document.getElementById('credits').value,
        entered_by: currentUser.user_id
    };
    
    try {
        const response = await fetch(`${API_URL}/marks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Marks submitted successfully!');
            document.getElementById('marksForm').reset();
            updateTotal();
        }
    } catch (error) {
        alert('Error submitting marks');
    }
});

async function loadPerformanceData() {
    try {
        const response = await fetch(`${API_URL}/all-performance`);
        const data = await response.json();
        
        const categories = {
            excellent: [],
            good: [],
            average: [],
            belowAverage: [],
            poor: []
        };
        
        const studentMap = new Map();
        
        data.forEach(record => {
            if (!studentMap.has(record.student_id)) {
                studentMap.set(record.student_id, {
                    name: record.full_name,
                    roll: record.roll_number,
                    cgpa: record.cgpa || 0
                });
            } else {
                const existing = studentMap.get(record.student_id);
                if (record.cgpa > existing.cgpa) {
                    existing.cgpa = record.cgpa;
                }
            }
        });
        
        studentMap.forEach(student => {
            const cgpa = student.cgpa;
            if (cgpa >= 9) categories.excellent.push(student);
            else if (cgpa >= 8) categories.good.push(student);
            else if (cgpa >= 6.5) categories.average.push(student);
            else if (cgpa >= 5) categories.belowAverage.push(student);
            else categories.poor.push(student);
        });
        
        displayCategory('excellentStudents', categories.excellent);
        displayCategory('goodStudents', categories.good);
        displayCategory('averageStudents', categories.average);
        displayCategory('belowAverageStudents', categories.belowAverage);
        displayCategory('poorStudents', categories.poor);
    } catch (error) {
        console.error('Error loading performance data:', error);
    }
}

function displayCategory(elementId, students) {
    const element = document.getElementById(elementId);
    if (students.length === 0) {
        element.innerHTML = '<p style="opacity: 0.7;">No students in this category</p>';
    } else {
        element.innerHTML = students.map(s => 
            `<div class="student-item">
                <strong>${s.name}</strong> (${s.roll})<br>
                CGPA: ${s.cgpa.toFixed(2)}
            </div>`
        ).join('');
    }
}

async function loadAnalytics() {
    const chartContainer = document.getElementById('performanceChart').parentElement;
    
    try {
        const response = await fetch(`${API_URL}/all-performance`);
        const data = await response.json();
        
        const studentPerformance = new Map();
        
        data.forEach(record => {
            if (!studentPerformance.has(record.roll_number)) {
                studentPerformance.set(record.roll_number, {
                    name: record.full_name,
                    semesters: []
                });
            }
            if (record.sgpa) {
                studentPerformance.get(record.roll_number).semesters.push({
                    sem: record.semester,
                    sgpa: record.sgpa
                });
            }
        });
        
        const labels = [];
        const datasets = [];
        const colors = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
        
        let colorIndex = 0;
        studentPerformance.forEach((value, key) => {
            if (value.semesters.length > 0) {
                value.semesters.sort((a, b) => a.sem - b.sem);
                
                datasets.push({
                    label: value.name,
                    data: value.semesters.map(s => s.sgpa),
                    borderColor: colors[colorIndex % colors.length],
                    backgroundColor: colors[colorIndex % colors.length] + '20',
                    tension: 0.4
                });
                
                colorIndex++;
            }
        });
        
        if (datasets.length === 0) {
            chartContainer.innerHTML = '<p style="text-align: center; padding: 40px; color: #64748B;">No performance data available yet. Enter marks for students to see analytics.</p>';
            return;
        }
        
        // Recreate canvas if it was replaced
        if (!document.getElementById('performanceChart')) {
            chartContainer.innerHTML = '<canvas id="performanceChart"></canvas>';
        }
        
        const maxSem = Math.max(...Array.from(studentPerformance.values())
            .flatMap(v => v.semesters.map(s => s.sem)));
        
        for (let i = 1; i <= maxSem; i++) {
            labels.push(`Sem ${i}`);
        }
        
        const ctx = document.getElementById('performanceChart').getContext('2d');
        
        if (window.performanceChart) {
            window.performanceChart.destroy();
        }
        
        window.performanceChart = new Chart(ctx, {
            type: 'line',
            data: { labels, datasets },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Student Performance Trends',
                        font: { size: 18 }
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        title: {
                            display: true,
                            text: 'SGPA'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading analytics:', error);
        chartContainer.innerHTML = '<p style="text-align: center; padding: 40px; color: #64748B;">No performance data available yet. Enter marks for students to see analytics.</p>';
    }
}

// Student functionality
async function loadStudentData() {
    try {
        const response = await fetch(`${API_URL}/marks/${studentData.student_id}`);
        const marks = await response.json();
        
        if (marks.length === 0) {
            document.getElementById('marksTable').innerHTML = '<p>No marks available yet.</p>';
        } else {
            let table = `
                <table>
                    <thead>
                        <tr>
                            <th>Semester</th>
                            <th>Subject</th>
                            <th>Internal</th>
                            <th>Practical</th>
                            <th>External</th>
                            <th>Total</th>
                            <th>Grade</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            marks.forEach(mark => {
                table += `
                    <tr>
                        <td>${mark.semester}</td>
                        <td>${mark.subject_name}</td>
                        <td>${mark.internal_marks}</td>
                        <td>${mark.practical_marks}</td>
                        <td>${mark.external_marks}</td>
                        <td>${mark.total_marks}</td>
                        <td>${mark.grade}</td>
                        <td class="status-${mark.status.toLowerCase()}">${mark.status}</td>
                    </tr>
                `;
            });
            
            table += '</tbody></table>';
            document.getElementById('marksTable').innerHTML = table;
        }
        
        document.getElementById('currentSem').value = studentData.current_semester;
        document.getElementById('targetCGPA').value = studentData.target_cgpa || 8.0;
        
        // Load current CGPA automatically
        loadCurrentCGPA();
    } catch (error) {
        console.error('Error loading student data:', error);
    }
}

async function loadCurrentCGPA() {
    try {
        // First try to get from performance table
        const perfResponse = await fetch(`${API_URL}/performance/${studentData.student_id}`);
        const performance = await perfResponse.json();
        
        if (performance.length > 0) {
            const latest = performance[performance.length - 1];
            document.getElementById('predictionResult').innerHTML = `
                <div class="prediction-card">
                    <h4>Current CGPA</h4>
                    <div class="value">${latest.cgpa}</div>
                </div>
                <p style="text-align: center; color: #64748B; margin-top: 20px;">Click "Calculate Required SGPA" to see what you need to achieve your target CGPA.</p>
            `;
        } else {
            // If no performance data, check if marks exist and calculate manually
            const marksResponse = await fetch(`${API_URL}/marks/${studentData.student_id}`);
            const marks = await marksResponse.json();
            
            if (marks.length > 0) {
                // Calculate CGPA from marks
                let totalCredits = 0;
                let totalGradePoints = 0;
                
                marks.forEach(mark => {
                    const credits = mark.credits || 3;
                    const gradePoints = getGradePointsFromGrade(mark.grade);
                    totalCredits += credits;
                    totalGradePoints += gradePoints * credits;
                });
                
                const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
                
                document.getElementById('predictionResult').innerHTML = `
                    <div class="prediction-card">
                        <h4>Current CGPA</h4>
                        <div class="value">${cgpa}</div>
                    </div>
                    <p style="text-align: center; color: #64748B; margin-top: 20px;">Click "Calculate Required SGPA" to see what you need to achieve your target CGPA.</p>
                `;
            } else {
                document.getElementById('predictionResult').innerHTML = `
                    <div class="prediction-card">
                        <h4>Current CGPA</h4>
                        <div class="value">0.00</div>
                    </div>
                    <p style="text-align: center; color: #64748B; margin-top: 20px;">No marks entered yet. Your teacher needs to enter marks first.</p>
                `;
            }
        }
    } catch (error) {
        console.error('Error loading current CGPA:', error);
    }
}

function getGradePointsFromGrade(grade) {
    const gradeMap = { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'F': 0 };
    return gradeMap[grade] || 0;
}

async function predictSGPA() {
    const currentSem = parseInt(document.getElementById('currentSem').value);
    const targetCGPA = parseFloat(document.getElementById('targetCGPA').value);
    
    if (currentSem < 1 || currentSem > 8) {
        alert('Please enter a valid semester (1-8)');
        return;
    }
    
    if (targetCGPA < 0 || targetCGPA > 10) {
        alert('Please enter a valid CGPA (0-10)');
        return;
    }
    
    try {
        // Update target CGPA
        await fetch(`${API_URL}/student/target`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: studentData.student_id, target_cgpa: targetCGPA })
        });
        
        const response = await fetch(`${API_URL}/predict-sgpa`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                student_id: studentData.student_id,
                target_cgpa: targetCGPA,
                current_semester: currentSem
            })
        });
        
        const data = await response.json();
        
        const resultDiv = document.getElementById('predictionResult');
        resultDiv.innerHTML = `
            <div class="prediction-card">
                <h4>Current CGPA</h4>
                <div class="value">${data.current_cgpa}</div>
            </div>
            <div class="prediction-card">
                <h4>Target CGPA</h4>
                <div class="value">${targetCGPA.toFixed(2)}</div>
            </div>
            <div class="prediction-card">
                <h4>Required SGPA (Per Semester)</h4>
                <div class="value">${data.required_sgpa}</div>
            </div>
            <div class="prediction-card">
                <h4>Remaining Semesters</h4>
                <div class="value">${data.remaining_semesters}</div>
            </div>
            <div class="prediction-card">
                <h4>Status</h4>
                <div class="value ${data.achievable ? 'achievable' : 'not-achievable'}">
                    ${data.achievable ? '✓ Achievable' : '✗ Not Achievable'}
                </div>
            </div>
            ${!data.achievable ? '<p style="color: #ef4444; margin-top: 15px;">The required SGPA exceeds 10.0. Consider adjusting your target CGPA.</p>' : ''}
            ${data.achievable && data.required_sgpa > 9 ? '<p style="color: #f59e0b; margin-top: 15px;">You need to score very high in remaining semesters. Stay focused!</p>' : ''}
        `;
    } catch (error) {
        console.error('Error predicting SGPA:', error);
    }
}

async function loadStudentProgress() {
    try {
        const response = await fetch(`${API_URL}/performance/${studentData.student_id}`);
        const performance = await response.json();
        
        if (performance.length === 0) {
            document.getElementById('studentProgressChart').parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #64748B;">No performance data available yet. Your teacher needs to enter marks first.</p>';
            document.getElementById('performanceSummary').innerHTML = '<p style="text-align: center; padding: 40px; color: #64748B;">No data to display.</p>';
            return;
        }
        
        const labels = performance.map(p => `Semester ${p.semester}`);
        const sgpaData = performance.map(p => p.sgpa);
        const cgpaData = performance.map(p => p.cgpa);
        
        const ctx = document.getElementById('studentProgressChart').getContext('2d');
        
        if (window.studentChart) {
            window.studentChart.destroy();
        }
        
        window.studentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'SGPA',
                        data: sgpaData,
                        backgroundColor: '#2563eb',
                        borderColor: '#1e40af',
                        borderWidth: 2
                    },
                    {
                        label: 'CGPA',
                        data: cgpaData,
                        backgroundColor: '#10b981',
                        borderColor: '#059669',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'My Academic Progress',
                        font: { size: 18 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        title: {
                            display: true,
                            text: 'Grade Points'
                        }
                    }
                }
            }
        });
        
        // Display summary
        const latest = performance[performance.length - 1];
        const summaryDiv = document.getElementById('performanceSummary');
        summaryDiv.innerHTML = `
            <div class="performance-summary">
                <div class="summary-card">
                    <h4>Current CGPA</h4>
                    <div class="value">${latest.cgpa}</div>
                </div>
                <div class="summary-card">
                    <h4>Latest SGPA</h4>
                    <div class="value">${latest.sgpa}</div>
                </div>
                <div class="summary-card">
                    <h4>Performance</h4>
                    <div class="value" style="font-size: 20px;">${latest.performance_category}</div>
                </div>
                <div class="summary-card">
                    <h4>Semesters Completed</h4>
                    <div class="value">${performance.length}</div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading progress:', error);
        document.getElementById('studentProgressChart').parentElement.innerHTML = '<p style="text-align: center; padding: 40px; color: #EF4444;">Error loading progress data.</p>';
    }
}
