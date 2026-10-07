@echo off
setlocal EnableExtensions
REM Dump Postgres (docker) to .\backups as gzipped SQL.

set "ROOT=%~dp0.."
set "BACKUP_DIR=%BACKUP_DIR%"
if "%BACKUP_DIR%"=="" set "BACKUP_DIR=%ROOT%\backups"
set "CONTAINER=%POSTGRES_CONTAINER%"
if "%CONTAINER%"=="" set "CONTAINER=shop-postgres"
set "DB_USER=%POSTGRES_USER%"
if "%DB_USER%"=="" set "DB_USER=postgres"
set "DB_NAME=%POSTGRES_DB%"
if "%DB_NAME%"=="" set "DB_NAME=shop"
set "DB_PASSWORD=%POSTGRES_PASSWORD%"
if "%DB_PASSWORD%"=="" set "DB_PASSWORD=postgres"
set "KEEP_DAYS=%BACKUP_KEEP_DAYS%"
if "%KEEP_DAYS%"=="" set "KEEP_DAYS=14"

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

docker inspect "%CONTAINER%" >nul 2>&1
if errorlevel 1 (
  echo Container %CONTAINER% not found. Start postgres first.
  exit /b 1
)

for /f %%i in ('docker exec "%CONTAINER%" date +%%Y%%m%%d_%%H%%M%%S') do set "STAMP=%%i"
set "FILE=shop_%STAMP%.sql.gz"
set "OUT=%BACKUP_DIR%\%FILE%"
set "REMOTE=/tmp/%FILE%"

echo Backing up %DB_NAME% from %CONTAINER% -^> %OUT%
docker exec -e PGPASSWORD=%DB_PASSWORD% "%CONTAINER%" sh -c "pg_dump -U \"%DB_USER%\" -d \"%DB_NAME%\" --no-owner --no-acl | gzip -c > \"%REMOTE%\""
if errorlevel 1 exit /b 1

docker cp "%CONTAINER%:%REMOTE%" "%OUT%"
if errorlevel 1 exit /b 1

docker exec "%CONTAINER%" rm -f "%REMOTE%" >nul 2>&1

echo OK: %OUT%

REM Host-side retention (cmd: delete files older than KEEP_DAYS via forfiles)
forfiles /P "%BACKUP_DIR%" /M shop_*.sql.gz /D -%KEEP_DAYS% /C "cmd /c del @path" >nul 2>&1

exit /b 0
