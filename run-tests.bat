@echo off
REM Script para executar testes no EcomApp
REM Use este script se tiver problemas com política de execução do PowerShell

echo ================================================
echo           EXECUTANDO TESTES - EcomApp
echo ================================================

echo.
echo Executando todos os testes...
node_modules\.bin\jest

echo.
echo ================================================
echo Para outros comandos de teste:
echo ================================================
echo - Testes com watch: node_modules\.bin\jest --watch
echo - Cobertura: node_modules\.bin\jest --coverage  
echo - CI: node_modules\.bin\jest --coverage --watchAll=false
echo ================================================

pause