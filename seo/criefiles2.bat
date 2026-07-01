@echo off
title Criador da Estrutura SEO

REM =====================================
REM Criar pasta
REM =====================================
mkdir seo >nul

echo.
echo Criando arquivos de SEO...
echo.

REM =====================================
REM Criar arquivos
REM =====================================
for %%F in (
    schema.js
    sitemap.xml
    robots.txt
    manifest.webmanifest
    browserconfig.xml
    security.txt
    humans.txt
    llms.txt
    open-graph.json
    twitter-card.json
) do (
    if not exist "seo\%%F" (
        type nul > "seo\%%F"
        echo [CRIADO] seo\%%F
    ) else (
        echo [EXISTE] seo\%%F
    )
)

echo.
echo ==========================================
echo Estrutura SEO criada com sucesso!
echo ==========================================
echo.
echo seo\
echo ├── schema.js
echo ├── sitemap.xml
echo ├── robots.txt
echo ├── manifest.webmanifest
echo ├── browserconfig.xml
echo ├── security.txt
echo ├── humans.txt
echo ├── llms.txt
echo ├── open-graph.json
echo └── twitter-card.json
echo.
pause