-- Complete database cleanup and fresh setup
USE student_success_system;

-- Delete all existing data
DELETE FROM semester_performance;
DELETE FROM marks;
DELETE FROM students;
DELETE FROM users WHERE user_type = 'student';

-- Insert correct student users
INSERT INTO users (username, password, user_type, full_name, email) VALUES
('student1', 'student123', 'student', 'Kamali', 'kamali@student.edu'),
('student2', 'student123', 'student', 'Kabi', 'kabi@student.edu'),
('student3', 'student123', 'student', 'Vaishu', 'vaishu@student.edu'),
('student4', 'student123', 'student', 'Deepika', 'deepika@student.edu'),
('student5', 'student123', 'student', 'Vijay', 'vijay@student.edu'),
('student6', 'student123', 'student', 'Ashu', 'ashu@student.edu'),
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

-- Insert student records
INSERT INTO students (user_id, roll_number, department, current_semester, target_cgpa)
SELECT u.user_id, 
       CASE u.username
           WHEN 'student1' THEN 'CS2021001'
           WHEN 'student2' THEN 'CS2021002'
           WHEN 'student3' THEN 'CS2021003'
           WHEN 'student4' THEN 'CS2021004'
           WHEN 'student5' THEN 'CS2021005'
           WHEN 'student6' THEN 'CS2021006'
           WHEN 'student7' THEN 'CS2021007'
           WHEN 'student8' THEN 'CS2021008'
           WHEN 'student9' THEN 'CS2021009'
           WHEN 'student10' THEN 'CS2021010'
           WHEN 'student11' THEN 'CS2021011'
           WHEN 'student12' THEN 'CS2021012'
           WHEN 'student13' THEN 'CS2021013'
           WHEN 'student14' THEN 'CS2021014'
           WHEN 'student15' THEN 'CS2021015'
           WHEN 'student16' THEN 'CS2021016'
       END,
       'Computer Science',
       3,
       CASE u.full_name
           WHEN 'Kamali' THEN 8.0
           WHEN 'Kabi' THEN 7.5
           WHEN 'Vaishu' THEN 7.9
           WHEN 'Deepika' THEN 7.6
           WHEN 'Vijay' THEN 7.0
           WHEN 'Ashu' THEN 7.7
           WHEN 'Priya' THEN 8.5
           WHEN 'Rahul' THEN 7.8
           WHEN 'Sneha' THEN 8.2
           WHEN 'Arjun' THEN 7.5
           WHEN 'Meera' THEN 8.0
           WHEN 'Rohan' THEN 7.9
           WHEN 'Divya' THEN 8.3
           WHEN 'Karthik' THEN 7.6
           WHEN 'Anjali' THEN 8.1
           WHEN 'Sanjay' THEN 7.7
       END
FROM users u
WHERE u.user_type = 'student';

-- Verify
SELECT 'Complete Student List:' as Status;
SELECT s.student_id, u.username, u.full_name, s.roll_number
FROM students s
JOIN users u ON s.user_id = u.user_id
ORDER BY s.student_id;

SELECT CONCAT('Total: ', COUNT(*), ' students') as Summary FROM students;
