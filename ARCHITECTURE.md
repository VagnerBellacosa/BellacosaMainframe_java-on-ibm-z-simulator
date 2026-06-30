# Architecture

## Visão Geral

O **Java on IBM Z Simulator** foi desenvolvido utilizando uma arquitetura modular baseada em **Single Page Application (SPA)**, separando claramente interface, lógica de negócio, motores de processamento, dados e infraestrutura.

O objetivo é permitir alta reutilização de componentes, facilidade de manutenção e evolução contínua do projeto.

------

# Arquitetura Geral

```text
                    Browser
                       │
                 index.html
                       │
                 bootstrap.js
                       │
                   router.js
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     Views         Engines         Services
        │              │              │
        └──────────────┼──────────────┘
                       │
                  Data (JSON)
```

------

# Estrutura do Projeto

```text
.
├── assets/
│   ├── audio/
│   ├── icons/
│   └── images/
│
├── css/
│   ├── theme.css
│   ├── animations.css
│   ├── components.css
│   └── ...
│
├── data/
│   ├── achievements.json
│   ├── avatars.json
│   ├── bosses.json
│   ├── labs.json
│   ├── levels.json
│   └── ...
│
├── js/
│   ├── bootstrap.js
│   ├── router.js
│   ├── analytics.js
│   ├── storage.js
│   ├── cache.js
│   ├── event-bus.js
│   ├── logger.js
│   └── ...
│
├── lang/
│   ├── i18n.js
│   ├── pt-BR.json
│   └── en-US.json
│
├── seo/
├── tests/
└── index.html
```

------

# Camadas

## Interface (UI)

Responsável pela renderização da aplicação.

Componentes:

- Home
- Labs
- Architecture
- Mapping
- Timeline
- Quiz
- Boss Battle
- Leaderboard
- Glossary
- Certificate
- Settings
- About
- Credits

Toda a navegação é controlada pelo `router.js`.

------

## Engines

Cada funcionalidade complexa possui um motor dedicado.

### Architecture Engine

Renderiza diagramas e componentes da arquitetura IBM Z.

------

### Cards Engine

Gerencia cards reutilizáveis utilizados em laboratórios e conteúdos.

------

### Timeline Engine

Controla a evolução da jornada do estudante.

------

### Lab Engine

Gerencia laboratórios, progresso e desbloqueios.

------

### Certificate Engine

Gera certificados personalizados.

------

### Audio Engine

Controla músicas e efeitos sonoros.

------

### Particle Engine

Renderiza partículas e animações em canvas.

------

### Achievement Engine

Responsável pelas conquistas.

------

# Serviços

## Router

Gerencia a navegação SPA.

Características:

- Hash Routing
- Lazy Rendering
- Views desacopladas

------

## Storage

Persistência local utilizando Local Storage.

Armazena:

- progresso
- XP
- configurações
- idioma
- certificados

------

## Cache

Evita leituras repetidas de arquivos JSON e recursos.

------

## Logger

Centraliza logs da aplicação.

Níveis:

- info
- warn
- error
- success

------

## Event Bus

Comunicação desacoplada entre módulos.

Exemplo:

```text
Quiz Finalizado
      │
      ▼
eventBus.emit()
      │
      ▼
Achievement Engine
      │
      ▼
Leaderboard
      │
      ▼
Analytics
```

------

## Analytics

Coleta métricas como:

- sessões
- XP
- laboratórios
- quizzes
- tempo de estudo
- progresso

------

## Internacionalização

Motor baseado em arquivos JSON.

```text
lang/

pt-BR.json

en-US.json
```

A troca de idioma ocorre sem recarregar a aplicação.

------

# Dados

O projeto utiliza JSON como fonte principal de dados.

Arquivos:

- achievements.json
- avatars.json
- bosses.json
- certificates.json
- commands.json
- credits.json
- labs.json
- levels.json
- particles.json
- settings.json
- sounds.json
- tips.json

Essa abordagem permite adicionar conteúdo sem alterar o código JavaScript.

------

# Fluxo de Inicialização

```text
index.html
      │
      ▼
bootstrap.js
      │
      ▼
config.js
      │
      ▼
storage.js
      │
      ▼
cache.js
      │
      ▼
i18n.js
      │
      ▼
preload.js
      │
      ▼
engines
      │
      ▼
router.js
      │
      ▼
Application Ready
```

------

# Fluxo de Navegação

```text
Usuário

↓

Router

↓

View

↓

Engine

↓

JSON

↓

Renderização
```

------

# Design System

A interface utiliza um sistema centralizado.

Arquivos principais:

- theme.css
- animations.css
- components.css

Benefícios:

- consistência visual;
- reutilização;
- manutenção simplificada.

------

# Progressive Web App

O projeto é compatível com PWA.

Recursos:

- instalação;
- modo offline;
- cache inteligente;
- Service Worker;
- Manifest.

------

# SEO

O projeto utiliza:

- HTML5 semântico
- JSON-LD
- Open Graph
- Twitter Cards
- Sitemap
- Robots
- Canonical
- llms.txt

------

# Testes

Estrutura atual:

```text
tests/

boss.test.js

quiz.test.js

router.test.js

xp.test.js
```

A meta é ampliar a cobertura com testes de integração e end-to-end.

------

# Princípios Arquiteturais

- Modularidade
- Baixo acoplamento
- Alta coesão
- Componentização
- Separação de responsabilidades
- Configuração orientada por dados
- Reutilização de código
- Progressive Enhancement

------

# Escalabilidade

A arquitetura foi planejada para reutilização em outros simuladores do ecossistema **Bellacosa Mainframe Learning Framework**.

Projetos previstos:

- COBOL Simulator
- CICS Simulator
- Db2 Simulator
- IMS Simulator
- JCL Simulator
- MQ Simulator
- RACF Simulator
- VSAM Simulator
- z/OS Simulator

Todos poderão compartilhar o mesmo núcleo da aplicação, alterando apenas os motores, os dados e os recursos específicos de cada tecnologia.

------

# Resumo

A arquitetura do **Java on IBM Z Simulator** prioriza simplicidade, modularidade e extensibilidade. A separação entre interface, motores, serviços e dados facilita a manutenção, permite reutilização em novos simuladores e oferece uma base sólida para a evolução do **Bellacosa Mainframe Learning Framework**.