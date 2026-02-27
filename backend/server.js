const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'kamali_kasthuri',
    database: process.env.DB_NAME || 'student_success_system'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password, userType } = req.body;
    
    const query = 'SELECT * FROM users WHERE username = ? AND password = ? AND user_type = ?';
    db.query(query, [username, password, userType], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length > 0) {
            const user = results[0];
            if (userType === 'student') {
                const studentQuery = 'SELECT * FROM students WHERE user_id = ?';
                db.query(studentQuery, [user.user_id], (err, studentData) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ success: true, user, studentData: studentData[0] });
                });
            } else {
                res.json({ success: true, user });
            }
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// Get all students (for teacher)
app.get('/api/students', (req, res) => {
    const query = `
        SELECT s.*, u.full_name, u.email 
        FROM students s 
        JOIN users u ON s.user_id = u.user_id
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add marks (teacher)
app.post('/api/marks', (req, res) => {
    const { student_id, semester, subject_name, internal_marks, practical_marks, external_marks, credits, entered_by } = req.body;
    
    const total = parseFloat(internal_marks) + parseFloat(practical_marks) + parseFloat(external_marks);
    const status = total >= 50 ? 'Pass' : 'Fail';
    const grade = calculateGrade(total);
    
    const query = `
        INSERT INTO marks (student_id, semester, subject_name, internal_marks, practical_marks, external_marks, total_marks, grade, status, credits, entered_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(query, [student_id, semester, subject_name, internal_marks, practical_marks, external_marks, total, grade, status, credits, entered_by], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // Update semester performance
        updateSemesterPerformance(student_id, semester);
        res.json({ success: true, message: 'Marks added successfully' });
    });
});

// Get marks for a student
app.get('/api/marks/:studentId', (req, res) => {
    const query = 'SELECT * FROM marks WHERE student_id = ? ORDER BY semester, subject_name';
    db.query(query, [req.params.studentId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get semester performance
app.get('/api/performance/:studentId', (req, res) => {
    const query = 'SELECT * FROM semester_performance WHERE student_id = ? ORDER BY semester';
    db.query(query, [req.params.studentId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get all students performance (for teacher)
app.get('/api/all-performance', (req, res) => {
    const query = `
        SELECT s.student_id, s.roll_number, u.full_name, sp.semester, sp.sgpa, sp.cgpa, sp.performance_category
        FROM students s
        JOIN users u ON s.user_id = u.user_id
        LEFT JOIN semester_performance sp ON s.student_id = sp.student_id
        ORDER BY sp.cgpa DESC, s.roll_number
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Predict required SGPA
app.post('/api/predict-sgpa', (req, res) => {
    const { student_id, target_cgpa, current_semester } = req.body;
    
    const query = 'SELECT * FROM semester_performance WHERE student_id = ? AND semester < ?';
    db.query(query, [student_id, current_semester], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        let totalCredits = 0;
        let totalGradePoints = 0;
        
        results.forEach(sem => {
            totalCredits += sem.total_credits || 20;
            totalGradePoints += (sem.sgpa * (sem.total_credits || 20));
        });
        
        const remainingSemesters = 8 - current_semester + 1;
        const creditsPerSemester = 20;
        const totalFutureCredits = remainingSemesters * creditsPerSemester;
        const totalRequiredGradePoints = target_cgpa * (totalCredits + totalFutureCredits);
        const requiredFutureGradePoints = totalRequiredGradePoints - totalGradePoints;
        const requiredSGPA = requiredFutureGradePoints / totalFutureCredits;
        
        res.json({
            current_cgpa: totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0,
            required_sgpa: Math.max(0, requiredSGPA).toFixed(2),
            remaining_semesters: remainingSemesters,
            achievable: requiredSGPA <= 10 && requiredSGPA >= 0
        });
    });
});

// Update student target CGPA
app.put('/api/student/target', (req, res) => {
    const { student_id, target_cgpa } = req.body;
    const query = 'UPDATE students SET target_cgpa = ? WHERE student_id = ?';
    db.query(query, [target_cgpa, student_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Delete marks
app.delete('/api/marks/:markId', (req, res) => {
    const markId = req.params.markId;
    
    // Get mark details before deleting to update performance
    const getMarkQuery = 'SELECT student_id, semester FROM marks WHERE mark_id = ?';
    db.query(getMarkQuery, [markId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length > 0) {
            const { student_id, semester } = results[0];
            
            // Delete the mark
            const deleteQuery = 'DELETE FROM marks WHERE mark_id = ?';
            db.query(deleteQuery, [markId], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                
                // Update semester performance
                updateSemesterPerformance(student_id, semester);
                res.json({ success: true, message: 'Mark deleted successfully' });
            });
        } else {
            res.status(404).json({ error: 'Mark not found' });
        }
    });
});

// Helper function to calculate grade
function calculateGrade(marks) {
    if (marks >= 90) return 'O';
    if (marks >= 80) return 'A+';
    if (marks >= 70) return 'A';
    if (marks >= 60) return 'B+';
    if (marks >= 50) return 'B';
    return 'F';
}

// Helper function to calculate grade points
function getGradePoints(grade) {
    const gradeMap = { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'F': 0 };
    return gradeMap[grade] || 0;
}

// Update semester performance
function updateSemesterPerformance(student_id, semester) {
    const query = 'SELECT * FROM marks WHERE student_id = ? AND semester = ?';
    db.query(query, [student_id, semester], (err, marks) => {
        if (err) return;
        
        let totalCredits = 0;
        let totalGradePoints = 0;
        
        marks.forEach(mark => {
            const credits = mark.credits || 3;
            totalCredits += credits;
            totalGradePoints += getGradePoints(mark.grade) * credits;
        });
        
        const sgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
        
        // Calculate CGPA
        const cgpaQuery = 'SELECT * FROM semester_performance WHERE student_id = ? AND semester < ?';
        db.query(cgpaQuery, [student_id, semester], (err, prevSemesters) => {
            let allCredits = totalCredits;
            let allGradePoints = totalGradePoints;
            
            prevSemesters.forEach(sem => {
                allCredits += sem.total_credits;
                allGradePoints += sem.sgpa * sem.total_credits;
            });
            
            const cgpa = allCredits > 0 ? (allGradePoints / allCredits).toFixed(2) : 0;
            const category = getPerformanceCategory(cgpa);
            
            const insertQuery = `
                INSERT INTO semester_performance (student_id, semester, sgpa, cgpa, total_credits, performance_category)
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE sgpa = ?, cgpa = ?, total_credits = ?, performance_category = ?
            `;
            
            db.query(insertQuery, [student_id, semester, sgpa, cgpa, totalCredits, category, sgpa, cgpa, totalCredits, category]);
        });
    });
}

function getPerformanceCategory(cgpa) {
    if (cgpa >= 9) return 'Excellent';
    if (cgpa >= 8) return 'Good';
    if (cgpa >= 6.5) return 'Average';
    if (cgpa >= 5) return 'Below Average';
    return 'Poor';
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
