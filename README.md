# Student Success Prediction System

A comprehensive web-based system for tracking and predicting student academic performance with separate portals for teachers and students.

## Features

### Teacher Portal
- **Secure Login System**: Dedicated teacher authentication
- **Marks Entry**: Enter internal, practical, and external marks for students
- **Attendance Tracking**: Mark and monitor student attendance with statistics
- **Automatic Grading**: System automatically calculates total marks, grades, and pass/fail status
- **Performance Analytics**: Visual graphs showing student performance trends with insights
- **Student Segregation**: Automatically categorizes students based on CGPA:
  - Excellent (≥9.0)
  - Good (8.0-8.9)
  - Average (6.5-7.9)
  - Below Average (5.0-6.4)
  - Poor (<5.0)
- **Search & Filter**: Quick search functionality to find students
- **PDF Export**: Export performance reports and analytics charts
- **Dark Mode**: Professional dark theme toggle

### Student Portal
- **Secure Login System**: Dedicated student authentication
- **View Marks**: Access internal, practical, and external marks for all semesters
- **Attendance View**: Check attendance records and percentage
- **CGPA Predictor**: Calculate required SGPA to achieve target CGPA
- **Performance Tracking**: Visual graphs showing semester-wise progress
- **Target Setting**: Set and track target CGPA goals
- **PDF Export**: Download marks and progress reports
- **Dark Mode**: Professional dark theme toggle
- **8 Semester Support**: Complete support for all 8 semesters

## Technology Stack

### Frontend
- HTML5
- CSS3 (Modern gradient design with professional purple color scheme)
- JavaScript (ES6+)
- Chart.js (for data visualization)
- jsPDF (for PDF export)
- html2canvas (for chart export)
- LocalStorage (for data persistence)

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- No backend or database required!

### Quick Start

1. Clone or download the repository
2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Open `index.html` in a web browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000
```

4. Access the application at `http://localhost:8000` or directly open `index.html`

5. All data is stored in browser's LocalStorage - no database setup needed!

## Default Login Credentials

### Teacher Account
- Username: `teacher1`
- Password: `teacher123`

### Student Accounts
- Username: `student1-8` | Password: `student123`
- Example: student1/student123, student2/student123, etc.

## Key Features Explained

### 🌙 Dark Mode
- Toggle between light and dark themes
- Preference saved in browser
- Easy on the eyes for night-time use

### 📊 Attendance Tracking
- Mark daily attendance (Present/Absent/Late)
- View attendance statistics and percentage
- Date-wise attendance records
- Students can view their own attendance

### 🔍 Search & Filter
- Quick search for students in performance view
- Real-time filtering
- Highlights matching results

### 📄 PDF Export
- Export performance reports
- Download analytics charts
- Save student marks and progress
- Professional PDF formatting

### 📈 Enhanced Analytics
- Total students count
- Average CGPA calculation
- Top CGPA display
- Pass rate percentage
- Visual trend analysis

## Database Schema

### Tables

1. **users**: Stores user authentication and profile information
2. **students**: Contains student-specific data (roll number, department, target CGPA)
3. **marks**: Stores all marks entries (internal, practical, external)
4. **semester_performance**: Tracks SGPA, CGPA, and performance categories

## API Endpoints

### Authentication
- `POST /api/login` - User login

### Students
- `GET /api/students` - Get all students (Teacher)
- `PUT /api/student/target` - Update target CGPA

### Marks
- `POST /api/marks` - Add student marks (Teacher)
- `GET /api/marks/:studentId` - Get marks for a student

### Performance
- `GET /api/performance/:studentId` - Get semester performance
- `GET /api/all-performance` - Get all students performance (Teacher)
- `POST /api/predict-sgpa` - Predict required SGPA

## Grading System

- **O (Outstanding)**: 90-100 marks (10 grade points)
- **A+ (Excellent)**: 80-89 marks (9 grade points)
- **A (Very Good)**: 70-79 marks (8 grade points)
- **B+ (Good)**: 60-69 marks (7 grade points)
- **B (Above Average)**: 50-59 marks (6 grade points)
- **F (Fail)**: Below 50 marks (0 grade points)

## CGPA Calculation

- **SGPA** = (Sum of Grade Points × Credits) / Total Credits
- **CGPA** = (Sum of all SGPA × Credits) / Total Credits across all semesters

## Color Scheme

The application uses a modern, professional color palette:
- Primary: Blue (#2563eb)
- Secondary: Purple (#7c3aed)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Danger: Red (#ef4444)

## Features in Detail

### Marks Entry (Teacher)
1. Select student from dropdown
2. Enter semester (1-8)
3. Enter subject name and credits
4. Input marks:
   - Internal (Max 30)
   - Practical (Max 20)
   - External (Max 50)
5. System automatically calculates total and status
6. Submit to save

### CGPA Predictor (Student)
1. Enter current semester
2. Set target CGPA
3. System calculates:
   - Current CGPA
   - Required SGPA per semester
   - Remaining semesters
   - Achievability status

## Project Structure

```
s6/
├── frontend/
│   ├── index.html      # Main HTML with all pages
│   ├── styles.css      # Professional purple theme with dark mode
│   └── app.js          # Complete application logic with LocalStorage
├── backend/            # (Optional - not required for current version)
│   ├── server.js
│   └── package.json
└── database/           # (Optional - not required for current version)
    └── schema.sql
```

## Future Enhancements

### Phase 2 (Planned)
- In-app notifications system
- Teacher comments/notes on student performance
- Assignment and quiz tracking
- Goal setting with progress monitoring

### Phase 3 (Future)
- Parent portal with read-only access
- Email notifications for low performance
- Advanced ML-based predictions
- Mobile application
- Multi-language support

## Support

For issues or questions, please contact the development team.

## License

This project is developed for educational purposes.

---

**Developed with ❤️ for Student Success**
