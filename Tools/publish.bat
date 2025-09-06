@echo off
setlocal enabledelayedexpansion

:: Ask about version update
set /p update_version="Do you want to update the version? (Y/N): "
if /i "%update_version:~0,1%"=="y" (
    call node update_version.js
)

call cd ..
:: Ask about build
set /p BUILD="Do you want to build? (Y/N): "
if /i "%BUILD:~0,1%"=="y" (
    call npm run build
)

:: Get version from package.json
for /f "delims=" %%v in ('powershell -Command "(Get-Content projects/dynamic-form/package.json | ConvertFrom-Json).version"') do set VERSION=%%v

:: Move to dist directory
pushd .\dist\dynamic-form\

:: Publish to npm with OTP and dist-tag
set /p OTP="Insert OTP Code: "
call npm publish --otp %OTP% --tag release-19

echo The version is: %VERSION%

:: Ask about GitHub tag
set /p CONFIRM="Do you want to publish GitHub Tags? (Y/N): "
if /i "%CONFIRM:~0,1%"=="y" (
    git tag v%VERSION%
    git push origin v%VERSION%
) else (
    echo No tags created
)

popd
endlocal
