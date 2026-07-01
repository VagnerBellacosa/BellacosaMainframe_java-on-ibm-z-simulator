@echo off
title Criador da Estrutura CSS

REM =====================================
REM Criar pastas
REM =====================================
mkdir css 2>nul
mkdir css\core 2>nul
mkdir css\components 2>nul
mkdir css\screens 2>nul

echo.
echo Criando arquivos CSS...
echo.

REM =====================================
REM CORE
REM =====================================
for %%F in (
    reset.css
    variables.css
    theme.css
    layout.css
    utilities.css
    responsive.css
    animations.css
) do (
    if not exist "css\core\%%F" (
        type nul > "css\core\%%F"
        echo [CRIADO] css\core\%%F
    ) else (
        echo [EXISTE] css\core\%%F
    )
)

REM =====================================
REM COMPONENTS
REM =====================================
for %%F in (
    buttons.css
    cards.css
    modal.css
    progress.css
    components.css
) do (
    if not exist "css\components\%%F" (
        type nul > "css\components\%%F"
        echo [CRIADO] css\components\%%F
    ) else (
        echo [EXISTE] css\components\%%F
    )
)

REM =====================================
REM SCREENS
REM =====================================
for %%F in (
    startup.css
    quiz.css
    lab.css
    architecture.css
    boss.css
    certificate.css
    glossary.css
    leaderboard.css
    timeline.css
) do (
    if not exist "css\screens\%%F" (
        type nul > "css\screens\%%F"
        echo [CRIADO] css\screens\%%F
    ) else (
        echo [EXISTE] css\screens\%%F
    )
)

REM =====================================
REM MAIN.CSS
REM =====================================
if not exist "css\main.css" (
    type nul > "css\main.css"
    echo [CRIADO] css\main.css
) else (
    echo [EXISTE] css\main.css
)

echo.
echo ==========================================
echo Estrutura CSS criada com sucesso!
echo ==========================================
echo.
echo css\
echo ├── core\
echo │   ├── reset.css
echo │   ├── variables.css
echo │   ├── theme.css
echo │   ├── layout.css
echo │   ├── utilities.css
echo │   ├── responsive.css
echo │   └── animations.css
echo │
echo ├── components\
echo │   ├── buttons.css
echo │   ├── cards.css
echo │   ├── modal.css
echo │   ├── progress.css
echo │   └── components.css
echo │
echo ├── screens\
echo │   ├── startup.css
echo │   ├── quiz.css
echo │   ├── lab.css
echo │   ├── architecture.css
echo │   ├── boss.css
echo │   ├── certificate.css
echo │   ├── glossary.css
echo │   ├── leaderboard.css
echo │   └── timeline.css
echo │
echo └── main.css
echo.
pause