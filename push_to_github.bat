@echo off
cd /d "%~dp0"
echo ===================================================
echo   Core-37 - Syncing Backend-Systems-Engineer to GitHub
echo ===================================================
echo.
echo [1/3] Adding all new and modified files...
git add -A

echo.
echo [2/3] Committing changes...
git commit -m "Update Backend Systems Engineer roadmap and labs (Core-37)"

echo.
echo [3/3] Pushing to GitHub...
git push -u origin main

echo.
echo ===================================================
echo   Finished! All changes are live on GitHub.
echo ===================================================
pause
