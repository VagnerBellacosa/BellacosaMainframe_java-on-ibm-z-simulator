# Bellacosa Mainframe Java on IBM Z Simulator
# Architecture Audit

**Projeto:** Bellacosa Mainframe Java on IBM Z Simulator

**Autor:** Vagner Bellacosa

**Documento:** Architecture Audit

**Versão:** 1.0

**Status:** Em Refatoração

---

# Objetivos

Este documento tem como finalidade:

- Inventariar toda a arquitetura do projeto.
- Identificar componentes ativos e legados.
- Localizar código morto.
- Identificar imports quebrados.
- Identificar dependências circulares.
- Padronizar a arquitetura.
- Definir um plano de migração seguro.
- Servir como documento de referência durante toda a evolução do simulador.

---

# Situação Atual

## Estado Geral

| Área             | Situação      |
| ---------------- | ------------- |
| Estrutura        | Boa           |
| Organização      | Boa           |
| Modularização    | Parcial       |
| Inicialização    | Inconsistente |
| Arquitetura      | Duplicada     |
| Manutenibilidade | Média         |
| Escalabilidade   | Boa           |

---

# Problemas Encontrados

## 1. Dupla Arquitetura

Atualmente coexistem duas arquiteturas.

### Arquitetura Antiga

```
index.html

↓

router

↓

módulos JS
```

### Arquitetura Nova

```
index.html

↓

bootstrap

↓

engines
```

As duas disputam o controle da aplicação.

**Status**

❌ Deve existir apenas uma arquitetura.

---

## 2. Bootstrap Incompleto

O bootstrap referencia módulos inexistentes.

Exemplos:

- AudioEngine
- TimelineEngine
- CardsEngine
- CertificateEngine
- LabEngine
- ParticleEngine
- AchievementEngine

Resultado:

```
Bootstrap

↓

Import inexistente

↓

Erro

↓

Aplicação interrompida
```

---

## 3. Inicialização Duplicada

A aplicação possui mais de um ponto de entrada.

O correto será:

```
index.html

↓

bootstrap.js

↓

router.js

↓

ScreenManager

↓

Screens

↓

Engines
```

---

## 4. Código Legado

Existem módulos antigos convivendo com módulos novos.

Exemplo:

```
audio.js

AudioEngine
```

```
cards.js

CardsEngine
```

```
certificate.js

CertificateEngine
```

Todos deverão ser migrados.

---

## 5. Arquivos Órfãos

Foram encontrados arquivos aparentemente sem utilização.

Necessário validar:

- Quem importa
- Quem utiliza
- Pode remover?

---

## 6. Configuração Duplicada

Constantes aparecem em vários arquivos.

Toda configuração deverá ficar centralizada em:

```
config.js

constants.js
```

---

## 7. EventBus Parcial

Nem todos os módulos utilizam EventBus.

Há comunicação direta entre componentes.

Objetivo:

```
Screen

↓

EventBus

↓

Engine
```

Nunca:

```
Screen

↓

Engine
```

---

## 8. Estado Global

Estado da aplicação encontra-se distribuído.

Exemplos:

- XP
- Score
- Current Screen
- Player
- Lives

Objetivo:

```
AppState
```

Centralizar todas as informações.

---

## 9. Assets

Necessário padronizar.

Estrutura desejada:

```
assets/

images/

audio/

fonts/

video/

icons/
```

---

## 10. Internacionalização

Existem mensagens em:

- Português
- Inglês
- Espanhol

Padronizar idioma.

---

# Arquitetura Alvo

```
index.html
      │
      ▼
bootstrap.js
      │
      ▼
config.js
constants.js
logger.js
event-bus.js
storage.js
cache.js
      │
      ▼
router.js
      │
      ▼
ScreenManager
      │
      ▼
Screens
      │
      ▼
Engines
```

---

# Estrutura Desejada

```
src/

core/
    bootstrap.js
    router.js
    screen-manager.js
    app-state.js

engines/
    audio-engine.js
    animation-engine.js
    cards-engine.js
    lab-engine.js
    quiz-engine.js
    timeline-engine.js
    architecture-engine.js
    certificate-engine.js
    achievement-engine.js

screens/
    home/
    intro/
    terminal/
    architecture/
    quiz/
    timeline/
    lab/
    boss/
    certificate/

ui/

utils/

assets/

data/

docs/
```

---

# Arquivos

## Manter

- config.js
- constants.js
- logger.js
- event-bus.js
- storage.js
- cache.js
- router.js

---

## Migrar

- audio.js
- animation.js
- cards.js
- certificate.js

---

## Criar

- app-state.js
- screen-manager.js
- audio-engine.js
- particle-engine.js
- quiz-engine.js
- progress-engine.js
- architecture-engine.js
- timeline-engine.js
- lab-engine.js
- achievement-engine.js

---

## Remover

A definir após inventário completo.

---

# Roadmap

## Sprint 1

- [ ] Inventário completo
- [ ] Árvore de dependências
- [ ] Identificar arquivos órfãos
- [ ] Identificar imports quebrados

---

## Sprint 2

- [ ] Bootstrap único
- [ ] Router único
- [ ] ScreenManager

---

## Sprint 3

- [ ] AppState
- [ ] EventBus em todos os módulos

---

## Sprint 4

- [ ] Migrar Engines

---

## Sprint 5

- [ ] Remover arquitetura antiga

---

## Sprint 6

- [ ] Testes automatizados

---

## Sprint 7

- [ ] Documentação final

---

# Critérios de Conclusão

O projeto será considerado concluído quando:

- Apenas um ponto de entrada existir.
- Todo módulo possuir responsabilidade única.
- Toda comunicação ocorrer via EventBus.
- Todo estado estiver em AppState.
- Não existirem imports quebrados.
- Não existirem arquivos órfãos.
- Não existirem constantes duplicadas.
- Cobertura mínima de testes ≥ 80%.
- O simulador executar integralmente sem erros no console.

---

# Histórico

| Versão | Data       | Descrição                                   |
| ------ | ---------- | ------------------------------------------- |
| 1.0    | 01/07/2026 | Documento inicial de auditoria arquitetural |