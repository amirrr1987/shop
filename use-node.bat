@echo off
REM ==========================================
REM run-nvmrc.bat — Use Node version from .nvmrc
REM Requires: nvm-windows
REM ==========================================

REM Check if .nvmrc exists
if not exist .nvmrc (
    echo .nvmrc file not found in this directory.
    exit /b 1
)

REM Read version from .nvmrc
set /p NODE_VERSION=<.nvmrc

REM Remove leading "v" if present (e.g. v20.11.0 → 20.11.0)
if "%NODE_VERSION:~0,1%"=="v" set NODE_VERSION=%NODE_VERSION:~1%

echo Requested Node version: %NODE_VERSION%

REM Run nvm use
nvm use %NODE_VERSION%

REM Final message
echo Node.js is now using version %NODE_VERSION%.
