@echo off
title Criador de Arquivos JavaScript

set "DIR=js"

REM Cria a pasta js caso nao exista
if not exist "%DIR%" mkdir "%DIR%"

REM Cria os arquivos
for %%F in (
    config.js
    router.js
    storage.js
    analytics.js
    sounds.js
    animation.js
    typing.js
    progress.js
    achievements.js
    confetti.js
    particles.js
    event-bus.js
    logger.js
    utils.js
) do (
    if not exist "%DIR%\%%F" (
        type nul > "%DIR%\%%F"
        echo [CRIADO] %%F
    ) else (
        echo [EXISTE] %%F
    )
)

echo.
echo ==============================
echo Arquivos JavaScript prontos!
echo ==============================
pause