# Quick Start Guide

## Setup in 3 Steps

### Step 1: Setup Database
```bash
# Login to MySQL
mysql -u root -p
# Enter password: kamali_kasthuri

# Run the schema
source C:/s6/database/schema.sql
```

### Step 2: Start Backend Server
```bash
cd C:/s6/backend
npm install
npm start
```
Server will run on: http://localhost:5000

### Step 3: Open Frontend
```bash
cd C:/s6/frontend
```
Open `index.html` in your browser or run:
```bash
python -m http.server 8000
```
Then visit: http://localhost:8000

## Test Login

**Teacher:**
- Username: teacher1
- Password: teacher123

**Student:**
- Username: student1
- Password: student123

## Common Issues

### Database Connection Error
- Check MySQL is running
- Verify password in backend/server.js is: kamali_kasthuri
- Ensure database 'student_success_system' exists

### Port Already in Use
- Backend: Change PORT in server.js
- Frontend: Use different port with http-server

### CORS Error
- Ensure backend is running before opening frontend
- Check API_URL in script.js matches backend port

## Quick Test Flow

1. Login as teacher (teacher1/teacher123)
2. Go to "Enter Marks"
3. Select student: Alice Johnson
4. Enter marks for Semester 1
5. Submit and check "Student Performance"
6. Logout and login as student (student1/student123)
7. View marks and use CGPA Predictor

Enjoy! 🎓
