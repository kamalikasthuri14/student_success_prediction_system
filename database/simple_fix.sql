-- Simple update to fix student names
USE student_success_system;

-- Update the old names to new names
UPDATE users SET full_name = 'Kamali' WHERE username = 'student1' AND user_type = 'student';
UPDATE users SET full_name = 'Kabi' WHERE username = 'student2' AND user_type = 'student';
UPDATE users SET full_name = 'Vaishu' WHERE username = 'student3' AND user_type = 'student';

-- Show current list
SELECT u.username, u.full_name, s.roll_number
FROM students s
JOIN users u ON s.user_id = u.user_id
ORDER BY s.student_id;
