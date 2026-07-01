@echo off
title Criador de Telas (Screens)

set "DIR=screens"

REM Cria a pasta screens caso nao exista
if not exist "%DIR%" mkdir "%DIR%"

REM Cria os arquivos das telas
for %%F in (
    intro.js
    startup.js
    mapping.js
    quiz.js
    architecture.js
    timeline.js
    lab.js
    boss.js
    finish.js
) do (
    if not exist "%DIR%\%%F" (
        type nul > "%DIR%\%%F"
        echo [CRIADO] %DIR%\%%F
    ) else (
        echo [EXISTE] %DIR%\%%F
    )
)

echo.
echo ==============================
echo Estrutura de telas criada!
echo ==============================
echo.
echo screens\
echo ├── intro.js
echo ├── startup.js
echo ├── mapping.js
echo ├── quiz.js
echo ├── architecture.js
echo ├── timeline.js
echo ├── lab.js
echo ├── boss.js
echo └── finish.js
echo.
pause