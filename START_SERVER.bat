@echo off
echo ========================================
echo Student Success System - Server Startup
echo ========================================
echo.

cd /d "%~dp0backend"

echo [1/3] Checking Node.js installation...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH!
    echo.
    echo Please install Node.js from: https://nodejs.org
    echo After installation, restart your computer.
    pause
    exit /b 1
)

node --version
echo Node.js found!
echo.

echo [2/3] Installing dependencies...
if not exist "node_modules\" (
    echo Installing packages... This may take 1-2 minutes...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)
echo.

echo [3/3] Starting backend server...
echo.
echo ========================================
echo Server is starting...
echo Keep this window OPEN while using the app
echo Press Ctrl+C to stop the server
echo ========================================
echo.

node server.js

pause
