@echo off
title Criador de Arquivos JSON

set "DIR=data"

REM Cria a pasta data caso nao exista
if not exist "%DIR%" mkdir "%DIR%"

REM Cria os arquivos JSON
for %%F in (
    quiz.json
    achievements.json
    glossary.json
    timeline.json
    architecture.json
    cards.json
) do (
    if not exist "%DIR%\%%F" (
        echo {}>"%DIR%\%%F"
        echo [CRIADO] %DIR%\%%F
    ) else (
        echo [EXISTE] %DIR%\%%F
    )
)

echo.
echo ==============================
echo Estrutura de dados criada!
echo ==============================
echo.
echo data\
echo ├── quiz.json
echo ├── achievements.json
echo ├── glossary.json
echo ├── timeline.json
echo ├── architecture.json
echo └── cards.json
echo.
pause