@echo off
set /p update_version="Do you want to update the version? (Y/N): "
if /i "%update_version%"=="y" goto :update_version
if /i "%update_version%"=="yes" goto :update_version
if /i "%update_version%"=="Y" goto :update_version
if /i "%update_version%"=="YES" goto :update_version

:: Continue with the rest of the commands
goto :no_update_version


:update_version
call node update_version.js

:no_update_version
call cd ..
call npm run build
call cd .\dist\dynamic-form\
call npm publish
for /f "delims=" %%v in ('powershell -Command "(Get-Content projects/dynamic-form/package.json | ConvertFrom-Json).version"') do set VERSION=%%v
echo The version is: %VERSION%
set /p CONFIRM=Do you want to publish GitHub Tags? (y/n):
if /i "%CONFIRM%"=="y" goto :create_tag
if /i "%CONFIRM%"=="yes" goto :create_tag
if /i "%CONFIRM%"=="Y" goto :create_tag
if /i "%CONFIRM%"=="YES" goto :create_tag

:create_tag
if /i "%CONFIRM%"=="y" (
    git tag v%VERSION%
    git push origin v%VERSION%
) else (
    echo No tags created
)
