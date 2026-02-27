-- Fix data inconsistency in student_success_system database
USE student_success_system;

-- Update the 4th student (user_id 4) to have consistent name
-- Assuming you want to keep "Charlie Brown" as per the original schema
UPDATE users 
SET full_name = 'Charlie Brown' 
WHERE user_id = 4 AND user_type = 'student';

-- If there are extra students beyond the original 3, you can check and remove them
-- Or update them to match your requirements

-- Verify the changes
SELECT u.user_id, u.username, u.full_name, s.roll_number 
FROM users u
LEFT JOIN students s ON u.user_id = s.user_id
WHERE u.user_type = 'student'
ORDER BY u.user_id;
