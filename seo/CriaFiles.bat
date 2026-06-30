@echo off
title Criador de Arquivos SEO

set "DIR=seo"

REM Cria a pasta seo caso nao exista
if not exist "%DIR%" mkdir "%DIR%"

REM Cria os arquivos
for %%F in (
    schema.js
    sitemap.xml
    robots.txt
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
echo Estrutura SEO criada!
echo ==============================
echo.
echo seo\
echo ├── schema.js
echo ├── sitemap.xml
echo └── robots.txt
echo.
pause