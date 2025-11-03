@echo off
echo Starting FinMarket AI Backend...
echo.

REM Activate virtual environment if exists
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
)

REM Run the application
python main.py

pause
