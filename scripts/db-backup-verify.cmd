@echo off
setlocal EnableExtensions
REM Backup, restore into throwaway DB, assert migrations exist, drop test DB.

set "ROOT=%~dp0.."
set "CONTAINER=%POSTGRES_CONTAINER%"
if "%CONTAINER%"=="" set "CONTAINER=shop-postgres"
set "DB_USER=%POSTGRES_USER%"
if "%DB_USER%"=="" set "DB_USER=postgres"
set "DB_PASSWORD=%POSTGRES_PASSWORD%"
if "%DB_PASSWORD%"=="" set "DB_PASSWORD=postgres"
set "TEST_DB=%RESTORE_TEST_DB%"
if "%TEST_DB%"=="" set "TEST_DB=shop_restore_test"

echo ==^> backup
call "%~dp0db-backup.cmd"
if errorlevel 1 exit /b 1

for /f "delims=" %%F in ('dir /b /o-d "%ROOT%\backups\shop_*.sql.gz" 2^>nul') do (
  set "BASENAME=%%F"
  goto :have_dump
)
echo No dump found in backups\
exit /b 1

:have_dump
set "DUMP=%ROOT%\backups\%BASENAME%"
echo Using dump: %DUMP%

docker cp "%DUMP%" "%CONTAINER%:/tmp/%BASENAME%"
if errorlevel 1 exit /b 1

docker cp "%~dp0db-restore-test-inner.sh" "%CONTAINER%:/tmp/db-restore-test-inner.sh"
if errorlevel 1 exit /b 1

echo ==^> restore + verify into %TEST_DB%
docker exec -e PGPASSWORD=%DB_PASSWORD% "%CONTAINER%" sh /tmp/db-restore-test-inner.sh "%BASENAME%" "%TEST_DB%" "%DB_USER%"
if errorlevel 1 exit /b 1

echo OK: backup + restore verified.
exit /b 0
