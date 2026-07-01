# Bellacosa Mainframe Java on IBM Z Simulator
# Migration Plan

**Projeto:** Bellacosa Mainframe Java on IBM Z Simulator

**Documento:** Migration Plan

**Versão:** 1.0

**Status:** Em Execução

---

# Objetivo

Migrar a arquitetura atual para uma arquitetura modular, desacoplada e orientada a eventos, mantendo o simulador funcional durante todo o processo.

Princípios:

- Nunca interromper o funcionamento do simulador.
- Refatorar incrementalmente.
- Uma responsabilidade por módulo.
- Uma única inicialização.
- Um único estado global.
- Zero código morto.
- Zero imports quebrados.

---

# Arquitetura Final

```
index.html
      │
      ▼
bootstrap.js
      │
      ▼
Core
      │
      ▼
Router
      │
      ▼
ScreenManager
      │
      ▼
Screens
      │
      ▼
EventBus
      │
      ▼
Engines
      │
      ▼
AppState
      │
      ▼
Storage
```

---

# Status Geral

| Sprint    | Objetivo      | Status |
| --------- | ------------- | ------ |
| Sprint 1  | Auditoria     | ✅      |
| Sprint 2  | Core          | ⬜      |
| Sprint 3  | Router        | ⬜      |
| Sprint 4  | ScreenManager | ⬜      |
| Sprint 5  | AppState      | ⬜      |
| Sprint 6  | EventBus      | ⬜      |
| Sprint 7  | Engines       | ⬜      |
| Sprint 8  | Screens       | ⬜      |
| Sprint 9  | Limpeza       | ⬜      |
| Sprint 10 | Testes        | ⬜      |

---

# Sprint 1 — Auditoria

## Objetivos

- [x] Architecture Audit
- [x] Dependency Map
- [x] Migration Plan

---

## Entregáveis

- architecture-audit.md
- dependency-map.md
- migration-plan.md

---

# Sprint 2 — Core

## Objetivo

Consolidar toda infraestrutura básica.

---

## bootstrap.js

Status:

⬜ Refatorar

Responsabilidades:

- iniciar aplicação
- carregar configuração
- iniciar router
- iniciar ScreenManager

---

## config.js

Status:

⬜ Revisar

---

## constants.js

Status:

⬜ Consolidar

Eliminar constantes duplicadas.

---

## logger.js

Status:

⬜ Revisar

Eliminar chamadas diretas ao console.

---

## storage.js

Status:

⬜ Revisar

---

## cache.js

Status:

⬜ Revisar

---

## event-bus.js

Status:

⬜ Consolidar

Toda comunicação deverá passar por ele.

---

# Sprint 3 — Router

## Objetivo

Criar fluxo único de navegação.

---

## router.js

Status

⬜ Refatorar

Responsabilidades

- navegar
- histórico
- mudança de telas

---

## screen-manager.js

Status

⬜ Criar

Responsabilidades

- carregar telas
- destruir telas
- troca de contexto

---

# Sprint 4 — Estado Global

Criar:

```
app-state.js
```

---

Responsabilidades

- XP
- Score
- Level
- Player
- Progress
- Settings
- Achievements
- Current Screen
- Current Lab

---

Eliminar

```
let xp

let score

let player

let level
```

espalhados pelo projeto.

---

# Sprint 5 — EventBus

Objetivo

Eliminar comunicação direta.

---

Antes

```
Screen

↓

QuizEngine
```

Depois

```
Screen

↓

emit()

↓

EventBus

↓

QuizEngine
```

---

Todos os módulos deverão utilizar:

- emit
- on
- off

---

# Sprint 6 — Engines

## AudioEngine

Status

⬜ Criar

Substitui

```
audio.js
```

---

## AnimationEngine

Status

⬜ Criar

Substitui

```
animation.js
```

---

## ParticleEngine

Status

⬜ Criar

---

## CardsEngine

Status

⬜ Criar

Substitui

```
cards.js
```

---

## QuizEngine

Status

⬜ Criar

---

## TimelineEngine

Status

⬜ Criar

---

## ArchitectureEngine

Status

⬜ Criar

---

## LabEngine

Status

⬜ Criar

---

## AchievementEngine

Status

⬜ Criar

---

## CertificateEngine

Status

⬜ Criar

Substitui

```
certificate.js
```

---

## ProgressEngine

Status

⬜ Criar

---

# Sprint 7 — Screens

Cada tela deverá possuir estrutura única.

```
Screen

init()

render()

bindEvents()

destroy()
```

---

## Home

⬜

## Intro

⬜

## Terminal

⬜

## Quiz

⬜

## Timeline

⬜

## Architecture

⬜

## Labs

⬜

## Boss

⬜

## Certificate

⬜

---

# Sprint 8 — Limpeza

Remover definitivamente:

- módulos duplicados
- código morto
- arquivos experimentais
- imports quebrados
- assets não utilizados

---

# Sprint 9 — Testes

Criar testes para:

- bootstrap
- router
- event bus
- AppState
- Storage
- Cache
- Quiz
- Timeline
- Labs
- XP
- Certificados

Meta:

```
Cobertura mínima

80%
```

---

# Sprint 10 — Documentação

Atualizar:

- README
- Architecture
- Installation
- Developer Guide
- API
- FAQ
- Changelog

---

# Migração de Arquivos

| Arquivo Atual  | Novo Destino                  | Ação       |
| -------------- | ----------------------------- | ---------- |
| index.html     | index.html                    | Revisar    |
| bootstrap.js   | core/bootstrap.js             | Refatorar  |
| router.js      | core/router.js                | Refatorar  |
| config.js      | core/config.js                | Revisar    |
| constants.js   | core/constants.js             | Consolidar |
| logger.js      | core/logger.js                | Revisar    |
| storage.js     | core/storage.js               | Revisar    |
| cache.js       | core/cache.js                 | Revisar    |
| event-bus.js   | core/event-bus.js             | Consolidar |
| audio.js       | engines/audio-engine.js       | Migrar     |
| animation.js   | engines/animation-engine.js   | Migrar     |
| cards.js       | engines/cards-engine.js       | Migrar     |
| certificate.js | engines/certificate-engine.js | Migrar     |

---

# Critérios para Remoção

Um arquivo poderá ser removido somente quando:

- nenhum import existir;
- nenhuma referência existir;
- possuir substituto funcional;
- todos os testes passarem.

---

# Critérios de Aceitação

A Sprint será considerada concluída quando:

- [ ] Não existirem imports quebrados.
- [ ] Não existirem arquivos órfãos.
- [ ] Apenas um bootstrap existir.
- [ ] Apenas um router existir.
- [ ] Apenas um AppState existir.
- [ ] Toda comunicação ocorrer via EventBus.
- [ ] Toda navegação ocorrer via ScreenManager.
- [ ] Todas as Engines estiverem independentes.
- [ ] Nenhuma Screen acessar outra Screen diretamente.
- [ ] O simulador iniciar sem erros de console.
- [ ] O simulador puder ser utilizado integralmente por um Padawan.

---

# Métricas

| Indicador               |       Atual |         Meta |
| ----------------------- | ----------: | -----------: |
| Pontos de entrada       |           2 |            1 |
| Estado global           | Distribuído | Centralizado |
| Comunicação direta      |        Alta |         Zero |
| Dependências circulares |           ? |            0 |
| Imports quebrados       |           ? |            0 |
| Arquivos órfãos         |           ? |            0 |
| Cobertura de testes     |          0% |         ≥80% |
| Erros no console        |         Sim |       Nenhum |

---

# Histórico

| Versão | Data       | Descrição                              |
| ------ | ---------- | -------------------------------------- |
| 1.0    | 01/07/2026 | Plano inicial de migração arquitetural |