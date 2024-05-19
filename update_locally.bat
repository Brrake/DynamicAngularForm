@echo off
call ng build
call cd .\dist\dynamic-form\
call npm pack