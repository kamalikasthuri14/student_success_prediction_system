-- Check current username to name mapping
USE student_success_system;

SELECT 'Current Mapping:' as Info;
SELECT u.username, u.full_name, s.roll_number, s.student_id
FROM users u
LEFT JOIN students s ON u.user_id = s.user_id
WHERE u.user_type = 'student'
ORDER BY u.username;

-- Fix: Update usernames to match the correct names
-- Original 6 students should be student1-6
-- New students should be student7-16

-- Update to correct mapping
UPDATE users SET username = 'student1' WHERE full_name = 'Kamali' AND user_type = 'student';
UPDATE users SET username = 'student2' WHERE full_name = 'Kabi' AND user_type = 'student';
UPDATE users SET username = 'student3' WHERE full_name = 'Vaishu' AND user_type = 'student';
UPDATE users SET username = 'student4' WHERE full_name = 'Deepika' AND user_type = 'student';
UPDATE users SET username = 'student5' WHERE full_name = 'Vijay' AND user_type = 'student';
UPDATE users SET username = 'student6' WHERE full_name = 'Ashu' AND user_type = 'student';
UPDATE users SET username = 'student7' WHERE full_name = 'Priya' AND user_type = 'student';
UPDATE users SET username = 'student8' WHERE full_name = 'Rahul' AND user_type = 'student';
UPDATE users SET username = 'student9' WHERE full_name = 'Sneha' AND user_type = 'student';
UPDATE users SET username = 'student10' WHERE full_name = 'Arjun' AND user_type = 'student';
UPDATE users SET username = 'student11' WHERE full_name = 'Meera' AND user_type = 'student';
UPDATE users SET username = 'student12' WHERE full_name = 'Rohan' AND user_type = 'student';
UPDATE users SET username = 'student13' WHERE full_name = 'Divya' AND user_type = 'student';
UPDATE users SET username = 'student14' WHERE full_name = 'Karthik' AND user_type = 'student';
UPDATE users SET username = 'student15' WHERE full_name = 'Anjali' AND user_type = 'student';
UPDATE users SET username = 'student16' WHERE full_name = 'Sanjay' AND user_type = 'student';

-- Verify the fix
SELECT 'Fixed Mapping:' as Info;
SELECT u.username, u.full_name, s.roll_number
FROM users u
LEFT JOIN students s ON u.user_id = s.user_id
WHERE u.user_type = 'student'
ORDER BY u.username;

SELECT 'All usernames use password: student123' as Note;
