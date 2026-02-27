-- Fix first 3 names and add 6 missing students
USE student_success_system;

-- Step 1: Update first 3 student names
UPDATE users SET full_name = 'Kamali', email = 'kamali@student.edu' 
WHERE username = 'student1' AND user_type = 'student';

UPDATE users SET full_name = 'Kabi', email = 'kabi@student.edu' 
WHERE username = 'student2' AND user_type = 'student';

UPDATE users SET full_name = 'Vaishu', email = 'vaishu@student.edu' 
WHERE username = 'student3' AND user_type = 'student';

-- Step 2: Add 6 missing students
INSERT INTO users (username, password, user_type, full_name, email) VALUES
('student4', 'student123', 'student', 'Deepika', 'deepika@student.edu'),
('student5', 'student123', 'student', 'Vijay', 'vijay@student.edu'),
('student6', 'student123', 'student', 'Ashu', 'ashu@student.edu'),
('student7', 'student123', 'student', 'Priya', 'priya@student.edu'),
('student8', 'student123', 'student', 'Rahul', 'rahul@student.edu'),
('student9', 'student123', 'student', 'Sneha', 'sneha@student.edu');

-- Step 3: Add student records for the 6 new students
INSERT INTO students (user_id, roll_number, department, current_semester, target_cgpa)
SELECT u.user_id,
       CASE u.username
           WHEN 'student4' THEN 'CS2021004'
           WHEN 'student5' THEN 'CS2021005'
           WHEN 'student6' THEN 'CS2021006'
           WHEN 'student7' THEN 'CS2021007'
           WHEN 'student8' THEN 'CS2021008'
           WHEN 'student9' THEN 'CS2021009'
       END,
       'Computer Science',
       3,
       CASE u.full_name
           WHEN 'Deepika' THEN 7.6
           WHEN 'Vijay' THEN 7.0
           WHEN 'Ashu' THEN 7.7
           WHEN 'Priya' THEN 8.5
           WHEN 'Rahul' THEN 7.8
           WHEN 'Sneha' THEN 8.2
       END
FROM users u
WHERE u.username IN ('student4', 'student5', 'student6', 'student7', 'student8', 'student9')
AND u.user_type = 'student';

-- Verify final result
SELECT 'Final 16 Students:' as Status;
SELECT s.student_id, u.username, u.full_name, s.roll_number
FROM students s
JOIN users u ON s.user_id = u.user_id
ORDER BY s.student_id;

SELECT CONCAT('Total: ', COUNT(*), ' students') as Summary FROM students;
