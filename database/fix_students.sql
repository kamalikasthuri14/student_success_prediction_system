-- Fix: Add students with correct user_ids
USE student_success_system;

-- First, check what user_ids were created
SELECT user_id, username, full_name FROM users WHERE user_type = 'student' ORDER BY user_id;

-- Now insert into students table with correct user_ids
-- The new users should have user_ids starting from where the last student ended
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

-- Verify all students
SELECT s.student_id, u.username, u.full_name, s.roll_number 
FROM students s 
JOIN users u ON s.user_id = u.user_id 
ORDER BY s.student_id;
