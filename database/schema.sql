-- Student Success Prediction System Database Schema

CREATE DATABASE IF NOT EXISTS student_success_system;
USE student_success_system;

-- Users table (for both teachers and students)
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('teacher', 'student') NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    department VARCHAR(50),
    current_semester INT DEFAULT 1,
    target_cgpa DECIMAL(3,2),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Marks table
CREATE TABLE marks (
    mark_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    semester INT NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    internal_marks DECIMAL(5,2),
    practical_marks DECIMAL(5,2),
    external_marks DECIMAL(5,2),
    total_marks DECIMAL(5,2),
    grade VARCHAR(2),
    status ENUM('Pass', 'Fail'),
    credits INT DEFAULT 3,
    entered_by INT,
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (entered_by) REFERENCES users(user_id)
);

-- Semester performance table
CREATE TABLE semester_performance (
    performance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    semester INT NOT NULL,
    sgpa DECIMAL(3,2),
    cgpa DECIMAL(3,2),
    total_credits INT,
    performance_category ENUM('Excellent', 'Good', 'Average', 'Below Average', 'Poor'),
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_semester (student_id, semester)
);

-- Insert sample teacher account
INSERT INTO users (username, password, user_type, full_name, email) 
VALUES ('teacher1', 'teacher123', 'teacher', 'Dr. John Smith', 'teacher@college.edu');

-- Insert sample student accounts
INSERT INTO users (username, password, user_type, full_name, email) 
VALUES 
('student1', 'student123', 'student', 'Alice Johnson', 'alice@student.edu'),
('student2', 'student123', 'student', 'Bob Williams', 'bob@student.edu'),
('student3', 'student123', 'student', 'Charlie Brown', 'charlie@student.edu');

INSERT INTO students (user_id, roll_number, department, current_semester, target_cgpa)
VALUES 
(2, 'CS2021001', 'Computer Science', 3, 8.5),
(3, 'CS2021002', 'Computer Science', 3, 7.5),
(4, 'CS2021003', 'Computer Science', 3, 9.0);
