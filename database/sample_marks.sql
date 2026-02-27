-- Sample marks data for analytics demonstration
USE student_success_system;

-- Delete existing marks to start fresh
DELETE FROM marks;
DELETE FROM semester_performance;

-- Kamali (student_id = 1) - Semester 1
INSERT INTO marks (student_id, semester, subject_name, internal_marks, practical_marks, external_marks, total_marks, grade, status, credits, entered_by) VALUES
(1, 1, 'Data Structures', 28, 18, 45, 91, 'O', 'Pass', 4, 1),
(1, 1, 'Database Management', 27, 19, 44, 90, 'O', 'Pass', 4, 1),
(1, 1, 'Operating Systems', 26, 17, 42, 85, 'A+', 'Pass', 4, 1),
(1, 1, 'Computer Networks', 25, 18, 43, 86, 'A+', 'Pass', 3, 1),
(1, 1, 'Web Technologies', 27, 19, 46, 92, 'O', 'Pass', 3, 1);

-- Kamali - Semester 2
INSERT INTO marks (student_id, semester, subject_name, internal_marks, practical_marks, external_marks, total_marks, grade, status, credits, entered_by) VALUES
(1, 2, 'Software Engineering', 26, 18, 44, 88, 'A+', 'Pass', 4, 1),
(1, 2, 'Machine Learning', 28, 19, 45, 92, 'O', 'Pass', 4, 1),
(1, 2, 'Cloud Computing', 27, 18, 43, 88, 'A+', 'Pass', 4, 1),
(1, 2, 'Cyber Security', 25, 17, 42, 84, 'A+', 'Pass', 3, 1);

-- Kabi (student_id = 2) - Semester 1
INSERT INTO marks (student_id, semester, subject_name, internal_marks, practical_marks, external_marks, total_marks, grade, status, credits, entered_by) VALUES
(2, 1, 'Data Structures', 24, 16, 38, 78, 'A', 'Pass', 4, 1),
(2, 1, 'Database Management', 23, 17, 39, 79, 'A', 'Pass', 4, 1),
(2, 1, 'Operating Systems', 22, 15, 37, 74, 'A', 'Pass', 4, 1),
(2, 1, 'Computer Networks', 25, 16, 40, 81, 'A+', 'Pass', 3, 1),
(2, 1, 'Web Technologies', 24, 17, 38, 79, 'A', 'Pass', 3, 1);

-- Kabi - Semester 2
INSERT INTO marks (student_id, semester, subject_name, internal_marks, practical_marks, external_marks, total_marks, grade, status, credits, entered_by) VALUES
(2, 2, 'Software Engineering', 23, 16, 39, 78, 'A', 'Pass', 4, 1),
(2, 2, 'Machine Learning', 25, 17, 41, 83, 'A+', 'Pass', 4, 1),
(2, 2, 'Cloud Computing', 24, 16, 38, 78, 'A', 'Pass', 4, 1);

-- Vaishu (student_id = 3) - Semester 1
INSERT INTO marks (student_id, semester, subject_name, internal_marks, practical_marks, external_marks, total_marks, grade, status, credits, entered_by) VALUES
(3, 1, 'Data Structures', 22, 15, 35, 72, 'A', 'Pass', 4, 1),
(3, 1, 'Database Management', 23, 16, 36, 75, 'A', 'Pass', 4, 1),
(3, 1, 'Operating Systems', 21, 14, 34, 69, 'B+', 'Pass', 4, 1),
(3, 1, 'Computer Networks', 24, 15, 37, 76, 'A', 'Pass', 3, 1),
(3, 1, 'Web Technologies', 22, 16, 35, 73, 'A', 'Pass', 3, 1);

-- Deepika (student_id = 4) - Semester 1
INSERT INTO marks (student_id, semester, subject_name, internal_marks, practical_marks, external_marks, total_marks, grade, status, credits, entered_by) VALUES
(4, 1, 'Data Structures', 20, 14, 32, 66, 'B+', 'Pass', 4, 1),
(4, 1, 'Database Management', 21, 15, 33, 69, 'B+', 'Pass', 4, 1),
(4, 1, 'Operating Systems', 19, 13, 31, 63, 'B+', 'Pass', 4, 1),
(4, 1, 'Computer Networks', 22, 14, 34, 70, 'A', 'Pass', 3, 1);

-- Vijay (student_id = 5) - Semester 1
INSERT INTO marks (student_id, semester, subject_name, internal_marks, practical_marks, external_marks, total_marks, grade, status, credits, entered_by) VALUES
(5, 1, 'Data Structures', 18, 12, 28, 58, 'B', 'Pass', 4, 1),
(5, 1, 'Database Management', 19, 13, 29, 61, 'B+', 'Pass', 4, 1),
(5, 1, 'Operating Systems', 17, 11, 27, 55, 'B', 'Pass', 4, 1),
(5, 1, 'Computer Networks', 20, 13, 30, 63, 'B+', 'Pass', 3, 1);

-- Now calculate semester performance for all students
-- This will be done automatically by the backend when marks are entered
-- But we can trigger it manually by calling the update function for each student/semester combination
