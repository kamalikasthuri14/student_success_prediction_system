@echo off
REM Quick Deployment Script for Student Success System (Windows)
REM This script helps you deploy to Render quickly

echo.
echo ========================================
echo Student Success System - Deployment Helper
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo [*] Initializing Git repository...
    git init
    git branch -M main
    echo [+] Git initialized
) else (
    echo [+] Git already initialized
)

echo.
echo [*] Adding files to Git...
git add .

echo.
echo [*] Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Deploy Student Success System to Render
git commit -m "%commit_msg%"

echo.
echo [*] Checking remote repository...
git remote | findstr "origin" >nul
if %errorlevel% equ 0 (
    echo [+] Remote 'origin' already exists
    echo [*] Pushing to GitHub...
    git push origin main
) else (
    echo [*] Setting up GitHub remote...
    set /p repo_url="Enter your GitHub repository URL: "
    git remote add origin %repo_url%
    echo [*] Pushing to GitHub...
    git push -u origin main
)

echo.
echo [+] Code pushed to GitHub successfully!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Go to https://dashboard.render.com
echo 2. Click 'New +' -^> 'Web Service'
echo 3. Connect your GitHub repository
echo 4. Render will auto-detect settings from render.yaml
echo 5. Click 'Create Web Service'
echo.
echo Deployment takes 2-3 minutes
echo Your app will be live at: https://YOUR-APP-NAME.onrender.com
echo.
echo For detailed instructions, see DEPLOYMENT.md
echo.
echo Happy Deploying!
echo.
pause
