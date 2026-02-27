-- Find users without student records
USE student_success_system;

SELECT 'Users WITHOUT student records:' as Issue;
SELECT u.user_id, u.username, u.full_name
FROM users u
WHERE u.user_type = 'student' 
AND u.user_id NOT IN (SELECT user_id FROM students WHERE user_id IS NOT NULL);

-- Add missing student records for these users
INSERT INTO students (user_id, roll_number, department, current_semester, target_cgpa)
SELECT u.user_id,
       CONCAT('CS2021', LPAD((SELECT COUNT(*) + 1 FROM students WHERE student_id < 1000), 3, '0')),
       'Computer Science',
       3,
       CASE u.full_name
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
           ELSE 7.5
       END
FROM users u
WHERE u.user_type = 'student' 
AND u.user_id NOT IN (SELECT user_id FROM students WHERE user_id IS NOT NULL);

-- Show complete list
SELECT 'Complete Student List:' as Result;
SELECT s.student_id, u.username, u.full_name, s.roll_number
FROM students s
JOIN users u ON s.user_id = u.user_id
ORDER BY s.student_id;

SELECT CONCAT('Total: ', COUNT(*), ' students') as Summary FROM students;
