@echo off
echo ========================================
echo Student Success Prediction System
echo ========================================
echo.
echo Starting Backend Server...
start cmd /k "cd c:\s6\backend && npm start"
timeout /t 3
echo.
echo Opening Frontend...
start "" "c:\s6\frontend\index.html"
echo.
echo ========================================
echo System is running!
echo Backend: http://localhost:5000
echo Frontend: Opened in browser
echo ========================================
pause
