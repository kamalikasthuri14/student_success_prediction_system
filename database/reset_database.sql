-- Complete Database Reset Script
-- This will clear all data and reset to the original schema

USE student_success_system;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Clear all tables
TRUNCATE TABLE semester_performance;
TRUNCATE TABLE marks;
TRUNCATE TABLE students;
TRUNCATE TABLE users;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Insert teacher account
INSERT INTO users (username, password, user_type, full_name, email) 
VALUES ('teacher1', 'teacher123', 'teacher', 'Dr. John Smith', 'teacher@college.edu');

-- Insert student accounts
INSERT INTO users (username, password, user_type, full_name, email) 
VALUES 
('student1', 'student123', 'student', 'Alice Johnson', 'alice@student.edu'),
('student2', 'student123', 'student', 'Bob Williams', 'bob@student.edu'),
('student3', 'student123', 'student', 'Charlie Brown', 'charlie@student.edu');

-- Insert student details
INSERT INTO students (user_id, roll_number, department, current_semester, target_cgpa)
VALUES 
(2, 'CS2021001', 'Computer Science', 3, 8.5),
(3, 'CS2021002', 'Computer Science', 3, 7.5),
(4, 'CS2021003', 'Computer Science', 3, 9.0);

-- Verify the data
SELECT 'Verification - Users:' as Info;
SELECT user_id, username, user_type, full_name FROM users;

SELECT 'Verification - Students:' as Info;
SELECT s.student_id, s.user_id, s.roll_number, u.full_name, s.department
FROM students s
JOIN users u ON s.user_id = u.user_id;
