-- Complete fix for adding all students
USE student_success_system;

-- First, let's see what we have
SELECT 'Current Users:' as Info;
SELECT user_id, username, full_name FROM users WHERE user_type = 'student' ORDER BY user_id;

SELECT 'Current Students:' as Info;
SELECT * FROM students ORDER BY student_id;

-- Now add the missing students entries
-- Check which user_ids exist but don't have student records
INSERT IGNORE INTO students (user_id, roll_number, department, current_semester, target_cgpa)
SELECT u.user_id, 
       CONCAT('CS2021', LPAD(ROW_NUMBER() OVER (ORDER BY u.user_id), 3, '0')),
       'Computer Science',
       3,
       CASE 
           WHEN u.full_name = 'Kamali' THEN 8.0
           WHEN u.full_name = 'Kabi' THEN 7.5
           WHEN u.full_name = 'Vaishu' THEN 7.9
           WHEN u.full_name = 'Deepika' THEN 7.6
           WHEN u.full_name = 'Vijay' THEN 7.0
           WHEN u.full_name = 'Ashu' THEN 7.7
           WHEN u.full_name = 'Priya' THEN 8.5
           WHEN u.full_name = 'Rahul' THEN 7.8
           WHEN u.full_name = 'Sneha' THEN 8.2
           WHEN u.full_name = 'Arjun' THEN 7.5
           WHEN u.full_name = 'Meera' THEN 8.0
           WHEN u.full_name = 'Rohan' THEN 7.9
           WHEN u.full_name = 'Divya' THEN 8.3
           WHEN u.full_name = 'Karthik' THEN 7.6
           WHEN u.full_name = 'Anjali' THEN 8.1
           WHEN u.full_name = 'Sanjay' THEN 7.7
           ELSE 7.5
       END
FROM users u
WHERE u.user_type = 'student' 
AND u.user_id NOT IN (SELECT user_id FROM students);

-- Show final result
SELECT 'Final Student List:' as Info;
SELECT s.student_id, u.username, u.full_name, s.roll_number, s.target_cgpa
FROM students s 
JOIN users u ON s.user_id = u.user_id 
ORDER BY s.student_id;

SELECT CONCAT('Total Students: ', COUNT(*)) as Summary FROM students;
