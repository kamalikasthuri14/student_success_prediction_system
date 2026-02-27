-- Update student names to common Indian names
USE student_success_system;

UPDATE users SET full_name = 'Rahul Sharma' WHERE username = 'student1';
UPDATE users SET full_name = 'Priya Patel' WHERE username = 'student2';
UPDATE users SET full_name = 'Arjun Kumar' WHERE username = 'student3';
UPDATE users SET full_name = 'Sneha Reddy' WHERE username = 'student4';
UPDATE users SET full_name = 'Vikram Singh' WHERE username = 'student5';
UPDATE users SET full_name = 'Anjali Gupta' WHERE username = 'student6';
UPDATE users SET full_name = 'Karthik Iyer' WHERE username = 'student7';
UPDATE users SET full_name = 'Divya Nair' WHERE username = 'student8';

-- Verify changes
SELECT u.username, u.full_name, s.roll_number
FROM users u
JOIN students s ON u.user_id = s.user_id
WHERE u.user_type = 'student'
ORDER BY s.roll_number;
