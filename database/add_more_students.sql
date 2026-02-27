-- Add more students to the system
USE student_success_system;

-- Insert new student accounts (starting from user_id 8)
INSERT INTO users (username, password, user_type, full_name, email) 
VALUES 
('student7', 'student123', 'student', 'Priya', 'priya@student.edu'),
('student8', 'student123', 'student', 'Rahul', 'rahul@student.edu'),
('student9', 'student123', 'student', 'Sneha', 'sneha@student.edu'),
('student10', 'student123', 'student', 'Arjun', 'arjun@student.edu'),
('student11', 'student123', 'student', 'Meera', 'meera@student.edu'),
('student12', 'student123', 'student', 'Rohan', 'rohan@student.edu'),
('student13', 'student123', 'student', 'Divya', 'divya@student.edu'),
('student14', 'student123', 'student', 'Karthik', 'karthik@student.edu'),
('student15', 'student123', 'student', 'Anjali', 'anjali@student.edu'),
('student16', 'student123', 'student', 'Sanjay', 'sanjay@student.edu');

-- Insert student details
INSERT INTO students (user_id, roll_number, department, current_semester, target_cgpa)
VALUES 
(8, 'CS2021007', 'Computer Science', 3, 8.5),
(9, 'CS2021008', 'Computer Science', 3, 7.8),
(10, 'CS2021009', 'Computer Science', 3, 8.2),
(11, 'CS2021010', 'Computer Science', 3, 7.5),
(12, 'CS2021011', 'Computer Science', 3, 8.0),
(13, 'CS2021012', 'Computer Science', 3, 7.9),
(14, 'CS2021013', 'Computer Science', 3, 8.3),
(15, 'CS2021014', 'Computer Science', 3, 7.6),
(16, 'CS2021015', 'Computer Science', 3, 8.1),
(17, 'CS2021016', 'Computer Science', 3, 7.7);

-- Success message
SELECT 'Successfully added 10 new students (student7 to student16)' AS Status;
SELECT 'All students use password: student123' AS Info;
