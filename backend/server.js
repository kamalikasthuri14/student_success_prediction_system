const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
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
    const { username, password, type } = req.body;
    
    const query = 'SELECT * FROM users WHERE username = ? AND password = ? AND type = ?';
    db.query(query, [username, password, type], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
        
        res.json({ user: results[0] });
    });
});

// Get all students
app.get('/api/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add marks
app.post('/api/marks', (req, res) => {
    const { student_id, semester, subject, credits, internal, practical, external } = req.body;
    const total = internal + practical + external;
    const grade = total >= 90 ? 'O' : total >= 80 ? 'A+' : total >= 70 ? 'A' : total >= 60 ? 'B+' : total >= 50 ? 'B' : 'F';
    const status = total >= 50 ? 'Pass' : 'Fail';
    
    const query = 'INSERT INTO marks (student_id, semester, subject, credits, internal, practical, external, total, grade, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [student_id, semester, subject, credits, internal, practical, external, total, grade, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Marks added successfully', id: result.insertId });
    });
});

// Get marks by student
app.get('/api/marks/:studentId', (req, res) => {
    const query = 'SELECT * FROM marks WHERE student_id = ?';
    db.query(query, [req.params.studentId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get performance
app.get('/api/performance/:studentId', (req, res) => {
    const query = 'SELECT * FROM semester_performance WHERE student_id = ?';
    db.query(query, [req.params.studentId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
