@echo off
title Criador da Estrutura JavaScript

REM ==========================
REM Criar pastas
REM ==========================
mkdir js 2>nul
mkdir js\core 2>nul
mkdir js\engines 2>nul
mkdir js\ui 2>nul
mkdir js\services 2>nul

echo.
echo Criando arquivos...
echo.

REM ==========================
REM CORE
REM ==========================
for %%F in (
    app.js
    config.js
    router.js
    event-bus.js
    storage.js
    utils.js
) do (
    if not exist "js\core\%%F" (
        type nul > "js\core\%%F"
        echo [CRIADO] js\core\%%F
    ) else (
        echo [EXISTE] js\core\%%F
    )
)

REM ==========================
REM ENGINES
REM ==========================
for %%F in (
    quiz-engine.js
    boss-engine.js
    xp-manager.js
    achievements.js
) do (
    if not exist "js\engines\%%F" (
        type nul > "js\engines\%%F"
        echo [CRIADO] js\engines\%%F
    ) else (
        echo [EXISTE] js\engines\%%F
    )
)

REM ==========================
REM UI
REM ==========================
for %%F in (
    terminal.js
    animation.js
    particles.js
    confetti.js
    audio.js
) do (
    if not exist "js\ui\%%F" (
        type nul > "js\ui\%%F"
        echo [CRIADO] js\ui\%%F
    ) else (
        echo [EXISTE] js\ui\%%F
    )
)

REM ==========================
REM SERVICES
REM ==========================
for %%F in (
    analytics.js
) do (
    if not exist "js\services\%%F" (
        type nul > "js\services\%%F"
        echo [CRIADO] js\services\%%F
    ) else (
        echo [EXISTE] js\services\%%F
    )
)

echo.
echo ==========================================
echo Estrutura JavaScript criada com sucesso!
echo ==========================================
echo.
echo js\
echo ├── core\
echo │   ├── app.js
echo │   ├── config.js
echo │   ├── router.js
echo │   ├── event-bus.js
echo │   ├── storage.js
echo │   └── utils.js
echo │
echo ├── engines\
echo │   ├── quiz-engine.js
echo │   ├── boss-engine.js
echo │   ├── xp-manager.js
echo │   └── achievements.js
echo │
echo ├── ui\
echo │   ├── terminal.js
echo │   ├── animation.js
echo │   ├── particles.js
echo │   ├── confetti.js
echo │   └── audio.js
echo │
echo └── services\
echo     └── analytics.js
echo.
pause