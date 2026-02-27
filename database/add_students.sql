-- Add more students to the database
USE student_success_system;

-- Insert additional student accounts
INSERT INTO users (username, password, user_type, full_name, email) 
VALUES 
('student4', 'student123', 'student', 'David Miller', 'david@student.edu'),
('student5', 'student123', 'student', 'Emma Davis', 'emma@student.edu'),
('student6', 'student123', 'student', 'Frank Wilson', 'frank@student.edu'),
('student7', 'student123', 'student', 'Grace Taylor', 'grace@student.edu'),
('student8', 'student123', 'student', 'Henry Anderson', 'henry@student.edu');

-- Insert student details
INSERT INTO students (user_id, roll_number, department, current_semester, target_cgpa)
VALUES 
(5, 'CS2021004', 'Computer Science', 3, 8.0),
(6, 'CS2021005', 'Computer Science', 3, 9.5),
(7, 'CS2021006', 'Computer Science', 3, 7.0),
(8, 'CS2021007', 'Computer Science', 3, 8.5),
(9, 'CS2021008', 'Computer Science', 3, 9.0);

-- Verify all students
SELECT u.user_id, u.username, u.full_name, s.roll_number, s.department
FROM users u
JOIN students s ON u.user_id = s.user_id
WHERE u.user_type = 'student'
ORDER BY s.roll_number;
