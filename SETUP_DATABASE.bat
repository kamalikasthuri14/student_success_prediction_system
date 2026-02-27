@echo off
echo ========================================
echo Setting up MySQL Database
echo ========================================
echo.

echo Importing database schema...
echo.

mysql -u root -pkamali_kasthuri < "%~dp0database\schema.sql"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Database setup complete!
    echo ========================================
    echo.
    echo You can now:
    echo 1. Run START_SERVER.bat
    echo 2. Open frontend/index.html
    echo 3. Login with:
    echo    Teacher: teacher1 / teacher123
    echo    Student: student1 / student123
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR! Database setup failed!
    echo ========================================
    echo.
    echo Make sure:
    echo 1. MySQL is running
    echo 2. Password is: kamali_kasthuri
    echo 3. MySQL bin folder is in PATH
    echo.
)

pause
