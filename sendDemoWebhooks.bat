@echo off
setlocal enabledelayedexpansion
echo Sending demo webhooks...

:: Loop from 1 to 5
for /L %%i in (1,1,5) do (
    set "randCode=!RANDOM!"
    set "hh=!time:~0,2!"
    set "mm=!time:~3,2!"
    set "ss=!time:~6,2!"
    
    :: Remove leading spaces in hour (if any)
    if "!hh:~0,1!"==" " set "hh=0!hh:~1,1!"
    
    set "url=https://example.com/webhook/%%i-!randCode!-!hh!!mm!!ss!"
    
    curl -X POST http://localhost:5000/api/webhooks -H "Content-Type: application/json" -d "{\"url\":\"!url!\",\"payload\":{\"orderId\":%%i}}"
    echo Sent webhook: !url!
    echo.
)

echo Demo webhooks sent!
pause
