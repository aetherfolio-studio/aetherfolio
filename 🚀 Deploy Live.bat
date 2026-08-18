@echo off
echo Deploying Aetherfolio to live website...
cd /d "C:\Users\ishit\OneDrive\Desktop\aether"
vercel --prod
echo.
echo Done! Your website is live at https://aetherfolio.vercel.app
pause
