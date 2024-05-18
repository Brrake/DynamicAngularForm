@echo off
call node update_version.js
call ng build
call cd .\dist\dynamic-form\
call npm publish