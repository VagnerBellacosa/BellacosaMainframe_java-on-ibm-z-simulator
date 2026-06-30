# API Reference

## Visão Geral

O **Java on IBM Z Simulator** utiliza uma API interna baseada em módulos ES (`ES Modules`). Cada módulo possui responsabilidade específica e expõe uma interface pública para ser utilizada pelos demais componentes da aplicação.

------

# Estrutura

```text
index.html
      │
bootstrap.js
      │
      ├── router.js
      ├── analytics.js
      ├── storage.js
      ├── cache.js
      ├── event-bus.js
      ├── i18n.js
      ├── settings.js
      ├── loading.js
      ├── ...
```

------

# Bootstrap

Arquivo:

```text
js/bootstrap.js
```

Responsável por inicializar toda a aplicação.

## Métodos

### start()

Inicializa todos os módulos.

```javascript
bootstrap.start();
```

------

# Router

Arquivo

```text
js/router.js
```

Gerencia a navegação SPA.

## Métodos

### start()

Inicializa o roteador.

```javascript
await router.start();
```

### navigate()

Navega para uma view.

```javascript
router.navigate("labs");
```

### current()

Retorna a rota atual.

```javascript
router.current();
```

------

# Analytics

Arquivo

```text
js/analytics.js
```

Responsável pelas métricas da aplicação.

## Métodos

### startSession()

Inicia uma sessão.

```javascript
analytics.startSession();
```

### finishSession()

Finaliza a sessão.

```javascript
analytics.finishSession();
```

### track()

Registra um evento.

```javascript
analytics.track(
    "quiz.completed",
    {
        score: 100
    }
);
```

### report()

Retorna estatísticas.

```javascript
const report =
    analytics.report();
```

------

# Storage

Arquivo

```text
js/storage.js
```

Persistência utilizando Local Storage.

## Métodos

### get()

```javascript
storage.get("player");
```

### set()

```javascript
storage.set(
    "player",
    player
);
```

### remove()

```javascript
storage.remove("player");
```

### clear()

```javascript
storage.clear();
```

------

# Cache

Arquivo

```text
js/cache.js
```

## Métodos

### get()

```javascript
cache.get("labs");
```

### set()

```javascript
cache.set(
    "labs",
    data
);
```

### clear()

```javascript
cache.clear();
```

------

# Logger

Arquivo

```text
js/logger.js
```

## Métodos

```javascript
logger.info("...");
logger.warn("...");
logger.error("...");
logger.success("...");
```

------

# Event Bus

Arquivo

```text
js/event-bus.js
```

Comunicação desacoplada entre módulos.

## Métodos

### emit()

```javascript
eventBus.emit(
    "quiz.completed",
    data
);
```

### on()

```javascript
eventBus.on(
    "quiz.completed",
    callback
);
```

### off()

```javascript
eventBus.off(
    "quiz.completed",
    callback
);
```

------

# Internacionalização

Arquivo

```text
lang/i18n.js
```

## Métodos

### init()

```javascript
await i18n.init();
```

### t()

Obtém uma tradução.

```javascript
i18n.t("menu.home");
```

### setLanguage()

```javascript
await i18n.setLanguage("en-US");
```

### getLanguage()

```javascript
i18n.getLanguage();
```

------

# Settings

Arquivo

```text
js/settings.js
```

## Métodos

```javascript
settings.init();
settings.load();
settings.save();
```

------

# Loading

Arquivo

```text
js/loading.js
```

## Métodos

```javascript
loading.show();
loading.hide();
loading.message("Carregando...");
```

------

# Audio Engine

Arquivo

```text
js/audio-engine.js
```

## Métodos

```javascript
audio.play("click");
audio.stop();
audio.pause();
audio.volume(0.5);
```

------

# Particle Engine

Arquivo

```text
js/particle-engine.js
```

## Métodos

```javascript
particles.start();
particles.stop();
particles.reset();
```

------

# Achievement Engine

Arquivo

```text
js/achievement-engine.js
```

## Métodos

### unlock()

```javascript
achievement.unlock(
    "first_lab"
);
```

### list()

```javascript
achievement.list();
```

### completed()

```javascript
achievement.completed();
```

------

# Lab Engine

Arquivo

```text
js/lab-engine.js
```

## Métodos

### load()

```javascript
await labs.load();
```

### open()

```javascript
labs.open(5);
```

### complete()

```javascript
labs.complete(5);
```

------

# Timeline Engine

Arquivo

```text
js/timeline-engine.js
```

## Métodos

```javascript
timeline.load();
timeline.render();
```

------

# Glossary Engine

Arquivo

```text
js/glossary-engine.js
```

## Métodos

```javascript
glossary.load();
glossary.search("JVM");
```

------

# Architecture Engine

Arquivo

```text
js/architecture-engine.js
```

## Métodos

```javascript
architecture.load();
architecture.render();
```

------

# Certificate Engine

Arquivo

```text
js/certificate-engine.js
```

## Métodos

### generate()

```javascript
certificate.generate();
```

### download()

```javascript
certificate.download();
```

------

# Estrutura dos Eventos

Eventos emitidos pela aplicação.

| Evento                | Descrição              |
| --------------------- | ---------------------- |
| application.ready     | Aplicação inicializada |
| session.start         | Sessão iniciada        |
| session.end           | Sessão encerrada       |
| languageChanged       | Idioma alterado        |
| network.online        | Conexão restaurada     |
| network.offline       | Modo offline           |
| quiz.completed        | Quiz concluído         |
| lab.started           | Laboratório iniciado   |
| lab.completed         | Laboratório concluído  |
| boss.defeated         | Boss derrotado         |
| achievement.unlocked  | Conquista desbloqueada |
| certificate.generated | Certificado emitido    |

------

# Estrutura de Dados

Os módulos carregam dados a partir dos arquivos em:

```text
data/

achievements.json
avatars.json
bosses.json
certificates.json
commands.json
credits.json
labs.json
levels.json
particles.json
settings.json
sounds.json
tips.json
```

------

# Fluxo de Execução

```text
bootstrap.start()

↓

settings.init()

↓

storage.init()

↓

cache.init()

↓

i18n.init()

↓

preload.init()

↓

engines.init()

↓

router.start()

↓

analytics.startSession()

↓

application.ready
```

------

# Extensibilidade

Novos módulos devem:

- exportar uma interface pública clara;
- evitar dependências circulares;
- comunicar-se preferencialmente via `event-bus.js`;
- utilizar `logger.js` para registro de eventos;
- persistir dados por meio de `storage.js` quando necessário.

Essa abordagem mantém o projeto modular, testável e preparado para crescimento dentro do ecossistema **Bellacosa Mainframe Learning Framework**.