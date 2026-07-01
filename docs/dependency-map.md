# Bellacosa Mainframe Java on IBM Z Simulator
# Dependency Map

**Projeto:** Bellacosa Mainframe Java on IBM Z Simulator

**Documento:** Dependency Map

**Versão:** 1.0

**Status:** Em Construção

---

# Objetivo

Mapear todas as dependências do projeto para:

- identificar quem importa quem;
- localizar módulos órfãos;
- detectar dependências circulares;
- reduzir acoplamento;
- facilitar a migração para a nova arquitetura.

---

# Arquitetura Alvo

```
index.html
    │
    ▼
bootstrap.js
    │
    ▼
Core
    │
    ├── config.js
    ├── constants.js
    ├── logger.js
    ├── event-bus.js
    ├── storage.js
    ├── cache.js
    ├── app-state.js
    └── router.js
            │
            ▼
    screen-manager.js
            │
            ▼
Screens
            │
            ▼
Engines
            │
            ▼
Assets + Data
```

---

# Dependências por Camada

## Camada 0

```
index.html
```

Responsável apenas por carregar:

```
bootstrap.js
```

Nenhum outro JavaScript deve ser carregado diretamente.

---

## Camada 1

```
bootstrap.js
```

Importa apenas:

```
config.js

constants.js

logger.js

event-bus.js

storage.js

cache.js

router.js

screen-manager.js

app-state.js
```

Nunca importa Screens.

Nunca importa Engines.

---

## Camada 2

Core

```
config.js
```

Sem dependências.

---

```
constants.js
```

Sem dependências.

---

```
logger.js
```

Pode depender apenas de:

```
config.js
```

---

```
event-bus.js
```

Sem dependências.

---

```
storage.js
```

Pode depender apenas de:

```
config.js

logger.js
```

---

```
cache.js
```

Pode depender apenas de:

```
storage.js
```

---

```
app-state.js
```

Pode depender apenas de:

```
event-bus.js
```

---

```
router.js
```

Pode depender apenas de:

```
screen-manager.js

logger.js
```

---

```
screen-manager.js
```

Pode importar somente Screens.

Nunca Engines.

---

# Camada 3

Screens

Cada Screen pode importar apenas:

```
event-bus.js

app-state.js

constants.js

logger.js
```

Nunca outra Screen.

Nunca outra Engine diretamente.

---

## Exemplo

```
HomeScreen

↓

EventBus

↓

QuizEngine
```

Nunca:

```
HomeScreen

↓

QuizEngine

↓

CertificateEngine
```

---

# Camada 4

Engines

Cada Engine deve ser independente.

Pode importar apenas:

```
event-bus.js

logger.js

constants.js

app-state.js
```

Nunca outra Screen.

---

## Engines previstas

```
AudioEngine

AnimationEngine

ParticleEngine

QuizEngine

CardsEngine

TimelineEngine

ArchitectureEngine

LabEngine

AchievementEngine

CertificateEngine

ProgressEngine
```

---

# Camada 5

Assets

```
images/

audio/

fonts/

icons/

video/
```

Nenhum Asset importa código.

---

# Camada 6

Data

```
labs.json

cards.json

quiz.json

timeline.json

architecture.json

glossary.json

achievements.json
```

Arquivos exclusivamente de dados.

---

# Fluxo Oficial

```
index.html

↓

bootstrap.js

↓

router.js

↓

screen-manager.js

↓

Screen

↓

EventBus

↓

Engine

↓

AppState

↓

Renderização
```

---

# Fluxo Proibido

Não será permitido:

```
Screen

↓

Screen
```

---

```
Engine

↓

Screen
```

---

```
Engine

↓

Engine
```

---

```
index.html

↓

Screen
```

---

```
bootstrap.js

↓

Engine
```

---

# Matriz de Dependências

| Módulo        | Pode Importar |
| ------------- | ------------- |
| index.html    | bootstrap.js  |
| bootstrap     | Core          |
| Core          | Core          |
| Router        | ScreenManager |
| ScreenManager | Screens       |
| Screens       | Core          |
| Engines       | Core          |
| Assets        | Nenhum        |
| Data          | Nenhum        |

---

# Comunicação Oficial

Toda comunicação deverá ocorrer através do EventBus.

```
Screen

↓

emit()

↓

EventBus

↓

Engine

↓

emit()

↓

Screen
```

---

# Estado Global

Somente:

```
AppState
```

Pode armazenar:

```
XP

Player

Achievements

Score

Settings

Progress

CurrentScreen

CurrentLab

Level

Language
```

Nenhum outro módulo pode manter estado global.

---

# Dependências Circulares

## Situação Atual

Ainda não auditado.

---

## Meta

```
0 dependências circulares
```

---

# Imports Quebrados

## Situação Atual

Pendente de auditoria.

---

## Meta

```
0 imports quebrados
```

---

# Arquivos Órfãos

## Situação Atual

Pendente.

Cada arquivo será classificado como:

- Ativo
- Legado
- Órfão
- Experimental
- Remover

---

# Checklist

## Core

- [ ] bootstrap
- [ ] router
- [ ] app-state
- [ ] screen-manager
- [ ] event-bus
- [ ] logger
- [ ] config
- [ ] constants
- [ ] storage
- [ ] cache

---

## Screens

- [ ] Home
- [ ] Intro
- [ ] Terminal
- [ ] Quiz
- [ ] Timeline
- [ ] Architecture
- [ ] Lab
- [ ] Boss
- [ ] Certificate

---

## Engines

- [ ] Audio
- [ ] Animation
- [ ] Particle
- [ ] Cards
- [ ] Timeline
- [ ] Architecture
- [ ] Quiz
- [ ] Lab
- [ ] Achievement
- [ ] Certificate
- [ ] Progress

---

# Métricas da Arquitetura

| Indicador                 |   Atual |   Meta |
| ------------------------- | ------: | -----: |
| Pontos de entrada         |       2 |      1 |
| Dependências circulares   |       ? |      0 |
| Imports quebrados         |       ? |      0 |
| Arquivos órfãos           |       ? |      0 |
| Acoplamento entre Screens |    Alto | Nenhum |
| Comunicação direta        |    Alta |   Zero |
| Estado global distribuído |     Sim |    Não |
| EventBus utilizado        | Parcial |   100% |
| Cobertura de documentação |     40% |   100% |

---

# Histórico

| Versão | Data       | Alteração                               |
| ------ | ---------- | --------------------------------------- |
| 1.0    | 01/07/2026 | Criação do mapa inicial de dependências |