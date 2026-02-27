-- Check current users and students in database
USE student_success_system;

-- Show all users
SELECT 'USERS TABLE:' as Info;
SELECT user_id, username, user_type, full_name FROM users ORDER BY user_id;

-- Show all students
SELECT 'STUDENTS TABLE:' as Info;
SELECT s.student_id, s.user_id, s.roll_number, u.full_name 
FROM students s 
JOIN users u ON s.user_id = u.user_id
ORDER BY s.student_id;
