# Deploy to Render - Step by Step Guide

## Prerequisites
- GitHub account
- Render account (sign up at https://render.com)

## Step 1: Initialize Git Repository

```bash
cd c:\s6
git init
git add .
git commit -m "Initial commit - Student Success Prediction System"
```

## Step 2: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
2. Name it: `student-success-system`
3. Run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/student-success-system.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: student-success-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: npm install
   - **Start Command**: npm start
   - **Instance Type**: Free

5. Add Environment Variables:
   - Click "Advanced" → "Add Environment Variable"
   - Add these (you'll need a MySQL database):
     ```
     DB_HOST=your_mysql_host
     DB_USER=your_mysql_user
     DB_PASSWORD=your_mysql_password
     DB_NAME=student_success_system
     PORT=5000
     ```

6. Click "Create Web Service"

## Step 4: Setup MySQL Database on Render

Render doesn't offer free MySQL. Options:

### Option A: Use Render PostgreSQL (Recommended - Free)
1. Create PostgreSQL database on Render
2. Update backend code to use PostgreSQL instead of MySQL

### Option B: Use External MySQL Service
- **Aiven** (free tier): https://aiven.io
- **PlanetScale** (free tier): https://planetscale.com
- **Railway** (free trial): https://railway.app

### Option C: Use MySQL on Railway
1. Go to https://railway.app
2. Create new project → Add MySQL
3. Copy connection details
4. Use these in Render environment variables

## Step 5: Deploy Frontend on Render

1. Click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name**: student-success-frontend
   - **Root Directory**: frontend
   - **Build Command**: (leave empty)
   - **Publish Directory**: .

4. Update frontend/script.js:
   - Change `const API_URL = 'http://localhost:5000/api'`
   - To: `const API_URL = 'https://your-backend-url.onrender.com/api'`

5. Click "Create Static Site"

## Step 6: Update API URL in Frontend

After backend is deployed, update `frontend/script.js`:

```javascript
const API_URL = 'https://student-success-backend.onrender.com/api';
```

Commit and push:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

## Step 7: Import Database Schema

1. Connect to your MySQL database
2. Run the SQL from `database/schema.sql`
3. Run `database/update_names.sql` for student data

## Important Notes

- Free tier services sleep after inactivity (takes 30s to wake up)
- Backend URL will be: `https://your-service-name.onrender.com`
- Frontend URL will be: `https://your-site-name.onrender.com`
- Update CORS settings if needed

## Troubleshooting

- Check Render logs for errors
- Ensure environment variables are set correctly
- Verify database connection
- Check that API URL in frontend matches backend URL
