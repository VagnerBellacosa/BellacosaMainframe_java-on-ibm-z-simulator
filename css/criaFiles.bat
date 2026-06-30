@echo off
title Criador de Arquivos CSS

REM Cria a pasta css caso nao exista
if not exist css mkdir css

REM Cria os arquivos
type nul > css\variables.css
type nul > css\layout.css
type nul > css\animations.css
type nul > css\buttons.css
type nul > css\cards.css
type nul > css\quiz.css
type nul > css\timeline.css
type nul > css\dragdrop.css
type nul > css\modal.css
type nul > css\progress.css
type nul > css\responsive.css

echo.
echo ===============================
echo Arquivos CSS criados com sucesso!
echo ===============================
pause

@echo off
title Criador de Arquivos CSS

set DIR=css

if not exist %DIR% mkdir %DIR%

for %%F in (
    variables.css
    layout.css
    animations.css
    buttons.css
    cards.css
    quiz.css
    timeline.css
    dragdrop.css
    modal.css
    progress.css
    responsive.css
) do (
    if not exist %DIR%%%F type nul  %DIR%%%F
    echo Criado %%F
)

echo.
echo Todos os arquivos foram criados.
pause