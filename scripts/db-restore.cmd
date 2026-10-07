@echo off
setlocal EnableExtensions
REM Restore a gzipped SQL dump into Postgres (docker). DESTRUCTIVE for target DB.

set "CONTAINER=%POSTGRES_CONTAINER%"
if "%CONTAINER%"=="" set "CONTAINER=shop-postgres"
set "DB_USER=%POSTGRES_USER%"
if "%DB_USER%"=="" set "DB_USER=postgres"
set "DB_NAME=%POSTGRES_DB%"
if "%DB_NAME%"=="" set "DB_NAME=shop"
set "DB_PASSWORD=%POSTGRES_PASSWORD%"
if "%DB_PASSWORD%"=="" set "DB_PASSWORD=postgres"

set "DUMP=%~1"
if "%DUMP%"=="" (
  echo Usage: %~nx0 ^<path-to-shop_YYYYMMDD_HHMMSS.sql.gz^>
  exit /b 1
)
if not exist "%DUMP%" (
  echo Dump not found: %DUMP%
  exit /b 1
)

for %%F in ("%DUMP%") do set "BASENAME=%%~nxF"

echo WARNING: restoring into %DB_NAME% ^(container=%CONTAINER%^)
echo File: %DUMP%
set /p CONFIRM=Type YES to continue: 
if /I not "%CONFIRM%"=="YES" (
  echo Aborted.
  exit /b 1
)

docker cp "%DUMP%" "%CONTAINER%:/tmp/%BASENAME%"
if errorlevel 1 exit /b 1

docker cp "%~dp0db-restore-inner.sh" "%CONTAINER%:/tmp/db-restore-inner.sh"
if errorlevel 1 exit /b 1

docker exec -e PGPASSWORD=%DB_PASSWORD% "%CONTAINER%" sh /tmp/db-restore-inner.sh "%BASENAME%" "%DB_NAME%" "%DB_USER%"
if errorlevel 1 exit /b 1

exit /b 0
