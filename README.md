# Student Success Prediction System

A comprehensive web-based system for tracking and predicting student academic performance with separate portals for teachers and students.

## Features

### Teacher Portal
- **Secure Login System**: Dedicated teacher authentication
- **Marks Entry**: Enter internal, practical, and external marks for students
- **Automatic Grading**: System automatically calculates total marks, grades, and pass/fail status
- **Performance Analytics**: Visual graphs showing student performance trends
- **Student Segregation**: Automatically categorizes students based on CGPA:
  - Excellent (≥9.0)
  - Good (8.0-8.9)
  - Average (6.5-7.9)
  - Below Average (5.0-6.4)
  - Poor (<5.0)

### Student Portal
- **Secure Login System**: Dedicated student authentication
- **View Marks**: Access internal, practical, and external marks for all semesters
- **CGPA Predictor**: Calculate required SGPA to achieve target CGPA
- **Performance Tracking**: Visual graphs showing semester-wise progress
- **Target Setting**: Set and track target CGPA goals
- **8 Semester Support**: Complete support for all 8 semesters

## Technology Stack

### Frontend
- HTML5
- CSS3 (Modern gradient design with professional color scheme)
- JavaScript (ES6+)
- Chart.js (for data visualization)

### Backend
- Node.js
- Express.js
- RESTful API architecture

### Database
- MySQL
- Structured relational database design

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm (Node Package Manager)

### Step 1: Database Setup

1. Open MySQL Command Line or MySQL Workbench
2. Login with your credentials (password: kamali_kasthuri)
3. Run the database schema:

```bash
mysql -u root -p < database/schema.sql
```

Or manually execute the SQL file in MySQL Workbench.

### Step 2: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend server will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Open `index.html` in a web browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000
```

3. Access the application at `http://localhost:8000`

## Default Login Credentials

### Teacher Account
- Username: `teacher1`
- Password: `teacher123`

### Student Accounts
- Username: `student1` | Password: `student123`
- Username: `student2` | Password: `student123`
- Username: `student3` | Password: `student123`

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
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── backend/
│   ├── server.js
│   └── package.json
└── database/
    └── schema.sql
```

## Future Enhancements

- Email notifications for low performance
- Attendance tracking integration
- Mobile application
- Advanced analytics with ML predictions
- Export reports to PDF
- Parent portal access

## Support

For issues or questions, please contact the development team.

## License

This project is developed for educational purposes.

---

**Developed with ❤️ for Student Success**
