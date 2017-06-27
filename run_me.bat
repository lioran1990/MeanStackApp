start mongod.exe
timeout /t 1

start node twitter_stream.js
timeout /t 2

start node app.js
timeout /t 2


start chrome.exe --allow-file-access-from-files \localhost:8080
pause