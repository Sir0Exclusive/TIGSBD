@echo off
REM TIGSBD GitHub Pages Quick Deploy
REM This script helps you deploy to GitHub Pages

echo.
echo ====================================
echo  TIGSBD GitHub Pages Deployment
echo ====================================
echo.

REM Get GitHub username
set /p GITHUB_USER="Enter your GitHub username: "

REM Get repository name
set /p REPO_NAME="Enter repository name (or username.github.io): "

REM Get domain (optional)
set /p DOMAIN="Enter your domain (or press Enter to skip): "

REM Initialize git
echo.
echo [1/5] Initializing Git repository...
git init
git add .
git commit -m "Initial commit: TIGSBD GitHub Pages deployment"
git branch -M main

REM Add remote
echo [2/5] Adding GitHub remote...
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git

REM Push to GitHub
echo [3/5] Pushing to GitHub...
git push -u origin main

REM Update CNAME if domain provided
if not "%DOMAIN%"=="" (
    echo [4/5] Updating CNAME file...
    (echo %DOMAIN%) > CNAME
    git add CNAME
    git commit -m "Add custom domain: %DOMAIN%"
    git push origin main
    echo.
    echo [5/5] Domain configuration sent to GitHub
) else (
    echo [4/5] Skipping domain setup
    echo [5/5] Done!
)

echo.
echo ====================================
echo  ✅ Deployment Complete!
echo ====================================
echo.
echo Your site will be available at:
if not "%DOMAIN%"=="" (
    echo   https://%DOMAIN%
    echo.
    echo Make sure to configure DNS:
    echo   CNAME: www.%DOMAIN% -^> %GITHUB_USER%.github.io
) else (
    echo   https://%GITHUB_USER%.github.io/%REPO_NAME%
)
echo.
echo GitHub Pages may take 5-10 minutes to build.
echo Check your repository Settings > Pages for status.
echo.
pause
