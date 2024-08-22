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
call ng build --configuration development
call cd .\dist\dynamic-form\
call npm pack
