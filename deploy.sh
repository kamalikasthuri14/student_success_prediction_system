#!/bin/bash

# Quick Deployment Script for Student Success System
# This script helps you deploy to Render quickly

echo "🚀 Student Success System - Deployment Helper"
echo "=============================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Add all files
echo ""
echo "📝 Adding files to Git..."
git add .

# Commit
echo ""
echo "💾 Committing changes..."
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Deploy Student Success System to Render"
fi
git commit -m "$commit_msg"

# Check if remote exists
if git remote | grep -q "origin"; then
    echo ""
    echo "✅ Remote 'origin' already exists"
    echo "🚀 Pushing to GitHub..."
    git push origin main
else
    echo ""
    echo "🔗 Setting up GitHub remote..."
    read -p "Enter your GitHub repository URL: " repo_url
    git remote add origin "$repo_url"
    echo "🚀 Pushing to GitHub..."
    git push -u origin main
fi

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://dashboard.render.com"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect your GitHub repository"
echo "4. Render will auto-detect settings from render.yaml"
echo "5. Click 'Create Web Service'"
echo ""
echo "⏱️  Deployment takes 2-3 minutes"
echo "🌐 Your app will be live at: https://YOUR-APP-NAME.onrender.com"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Happy Deploying!"
