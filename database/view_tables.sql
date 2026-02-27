-- View All Tables and Data in Student Success System

-- Switch to the database
USE student_success_system;

-- Show all tables in the database
SHOW TABLES;

-- View structure and data of each table

-- 1. USERS TABLE
SELECT '=== USERS TABLE ===' AS '';
DESCRIBE users;
SELECT * FROM users;

-- 2. STUDENTS TABLE
SELECT '=== STUDENTS TABLE ===' AS '';
DESCRIBE students;
SELECT * FROM students;

-- 3. MARKS TABLE
SELECT '=== MARKS TABLE ===' AS '';
DESCRIBE marks;
SELECT * FROM marks;

-- 4. SEMESTER PERFORMANCE TABLE
SELECT '=== SEMESTER PERFORMANCE TABLE ===' AS '';
DESCRIBE semester_performance;
SELECT * FROM semester_performance;

-- View combined data (students with their user info)
SELECT '=== STUDENTS WITH USER INFO ===' AS '';
SELECT 
    s.student_id,
    s.roll_number,
    u.username,
    u.full_name,
    s.department,
    s.current_semester,
    s.target_cgpa
FROM students s
JOIN users u ON s.user_id = u.user_id;

-- Count records in each table
SELECT '=== RECORD COUNTS ===' AS '';
SELECT 'users' AS table_name, COUNT(*) AS record_count FROM users
UNION ALL
SELECT 'students', COUNT(*) FROM students
UNION ALL
SELECT 'marks', COUNT(*) FROM marks
UNION ALL
SELECT 'semester_performance', COUNT(*) FROM semester_performance;
