@echo off
setlocal
cd /d "%~dp0"
echo Starting EPAC Intelligent Workbench...
echo Keep this window open while using the local demo.
start "" http://127.0.0.1:5173/
npm.cmd run dev -- --host 127.0.0.1 --port 5173
