@echo off
title Criador da Estrutura de Imagens

REM =====================================
REM Criar pastas
REM =====================================
mkdir images 2>nul
mkdir images\sprites 2>nul

echo.
echo Criando arquivos de imagem...
echo.

REM =====================================
REM Criar arquivos PNG
REM =====================================
for %%F in (
    java.png
    cobol.png
    zos.png
    cics.png
    db2.png
    ims.png
    mq.png
    jcl.png
    vsam.png
    api.png
    terminal.png
    boss.png
    trophy.png
    certificate.png
    timeline-bg.png
    hero-bg.png
    logo.png
    favicon.png
    icon-192.png
    icon-512.png
) do (
    if not exist "images\%%F" (
        type nul > "images\%%F"
        echo [CRIADO] images\%%F
    ) else (
        echo [EXISTE] images\%%F
    )
)

echo.
echo ==========================================
echo Estrutura de imagens criada com sucesso!
echo ==========================================
echo.
echo images\
echo ├── java.png
echo ├── cobol.png
echo ├── zos.png
echo ├── cics.png
echo ├── db2.png
echo ├── ims.png
echo ├── mq.png
echo ├── jcl.png
echo ├── vsam.png
echo ├── api.png
echo ├── terminal.png
echo ├── boss.png
echo ├── trophy.png
echo ├── certificate.png
echo ├── timeline-bg.png
echo ├── hero-bg.png
echo ├── logo.png
echo ├── favicon.png
echo ├── icon-192.png
echo ├── icon-512.png
echo └── sprites\
echo.
pause