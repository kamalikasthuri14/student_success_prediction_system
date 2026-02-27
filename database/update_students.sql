-- Update Student Information with New Names and CGPA

USE student_success_system;

-- Update existing 3 students
UPDATE users SET full_name = 'Kamali' WHERE user_id = 2;
UPDATE users SET full_name = 'Kabi' WHERE user_id = 3;
UPDATE users SET full_name = 'Vaishu' WHERE user_id = 4;

UPDATE students SET target_cgpa = 8.0 WHERE user_id = 2;
UPDATE students SET target_cgpa = 7.5 WHERE user_id = 3;
UPDATE students SET target_cgpa = 7.9 WHERE user_id = 4;

-- Add 3 new students
INSERT INTO users (username, password, user_type, full_name, email) 
VALUES 
('student4', 'student123', 'student', 'Deepika', 'deepika@student.edu'),
('student5', 'student123', 'student', 'Vijay', 'vijay@student.edu'),
('student6', 'student123', 'student', 'Ashu', 'ashu@student.edu');

INSERT INTO students (user_id, roll_number, department, current_semester, target_cgpa)
VALUES 
(5, 'CS2021004', 'Computer Science', 3, 7.6),
(6, 'CS2021005', 'Computer Science', 3, 7.0),
(7, 'CS2021006', 'Computer Science', 3, 7.7);

-- View updated students
SELECT u.username, u.full_name, s.roll_number, s.target_cgpa 
FROM users u 
JOIN students s ON u.user_id = s.user_id 
WHERE u.user_type = 'student';
