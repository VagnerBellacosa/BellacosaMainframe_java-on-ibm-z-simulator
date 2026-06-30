# ☕ Java no IBM Z Simulator

## Um Café no Bellacosa Mainframe

> **Aprendendo Java no IBM Mainframe através de uma experiência gamificada para desenvolvedores COBOL.**

------

![IBM Z](https://img.shields.io/badge/IBM-Z-blue)
![Java](https://img.shields.io/badge/Java-21-orange)
![COBOL](https://img.shields.io/badge/COBOL-Enterprise-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26)
![CSS3](https://img.shields.io/badge/CSS3-1572B6)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-yellow)
![License](https://img.shields.io/badge/License-MIT-success)

------

# ☕

## Bem-vindo

O **Java no IBM Z Simulator** é um laboratório interativo criado para mostrar que **Java e COBOL não são concorrentes**.

Eles trabalham juntos.

Durante aproximadamente cinco minutos o participante percorre uma jornada onde aprende como Java convive com COBOL, CICS, Db2, MQ e z/OS dentro do IBM Mainframe.

Todo o laboratório foi desenvolvido utilizando apenas tecnologias Web modernas, permitindo sua execução diretamente no navegador.

------

# Objetivo

Transformar um desenvolvedor COBOL iniciante em um profissional capaz de compreender:

- Java no IBM Z
- JVM
- Orientação a Objetos
- Integração COBOL + Java
- CICS
- Db2
- MQ
- APIs REST
- Modernização de aplicações

Sempre utilizando comparações diretas com aquilo que um programador COBOL já conhece.

------

# Público-alvo

Este projeto foi desenvolvido para:

- Programadores COBOL
- Desenvolvedores IBM Z
- Estudantes de Mainframe
- Universidades
- Bootcamps
- Empresas
- IBM Champions
- Instrutores
- Comunidade Mainframe

------

# Filosofia

O laboratório segue um princípio simples:

> **Ninguém aprende tecnologia lendo centenas de slides.**

Aprende explorando.

Errando.

Jogando.

Experimentando.

Por isso o projeto utiliza diversos elementos de gamificação.

------

# Principais características

- Interface moderna
- 100% HTML5
- CSS modular
- JavaScript ES Modules
- Gamificação
- Sistema de XP
- Boss Battle
- Conquistas
- Timeline
- Flash Cards
- Quiz
- Terminal Simulado
- Persistência Local
- SEO completo
- JSON-LD
- PWA Ready

------

# Fluxo do laboratório

```text
Startup

↓

Introdução

↓

Timeline

↓

Arquitetura

↓

Mapeamento COBOL ⇄ Java

↓

Laboratórios

↓

Terminal

↓

Quiz

↓

Boss Final

↓

Certificado

↓

Fim
```

------

# Tecnologias utilizadas

## Front-end

- HTML5
- CSS3
- JavaScript ES2023

## Arquitetura

- ES Modules
- Component Based
- Event Bus
- SPA
- Lazy Loading

## Persistência

- LocalStorage

## SEO

- robots.txt
- sitemap.xml
- JSON-LD
- Open Graph
- Twitter Cards
- Schema.org

## Recursos Visuais

- CSS Animations
- CSS Variables
- Glassmorphism
- Responsive Design
- Progress Bars
- Timeline
- Cards
- Modal
- Confetti
- Particle System

------

# Arquitetura Geral

```text
index.html

        │

        ▼

app.js

        │

        ▼

Router

        │

        ▼

Screens

        │

        ├───────────── Intro

        ├───────────── Timeline

        ├───────────── Mapping

        ├───────────── Architecture

        ├───────────── Labs

        ├───────────── Quiz

        ├───────────── Boss

        └───────────── Finish
```

------

# Organização do projeto

```text
project/

│

├── index.html

├── css/

├── js/

├── images/

├── audio/

├── data/

├── seo/

└── README.md
```

------

# Estrutura do JavaScript

```text
js/

│

├── app.js

├── config.js

├── router.js

├── analytics.js

├── storage.js

├── terminal.js

├── boss-engine.js

├── quiz-engine.js

├── xp-manager.js

├── event-bus.js

├── achievements.js

├── animation.js

├── particles.js

├── confetti.js

├── audio.js

├── utils.js

└── screens/
```

------

# Estrutura das telas

```text
screens/

│

├── startup.js

├── intro.js

├── timeline.js

├── mapping.js

├── architecture.js

├── lab.js

├── quiz.js

├── boss.js

└── finish.js
```

------

# Estrutura dos dados

Todo o conteúdo do laboratório é orientado por arquivos JSON.

Isso significa que praticamente todo o comportamento pode ser alterado sem modificar o código JavaScript.

```text
data/

│

├── architecture.json

├── achievements.json

├── cards.json

├── glossary.json

├── quiz.json

└── timeline.json
```

------

# Como funciona

O navegador carrega a aplicação.

O Router controla qual tela será exibida.

Cada tela possui seu próprio componente JavaScript.

Cada componente consulta arquivos JSON.

O Event Bus comunica os módulos.

O XP Manager controla a progressão.

O Storage salva o progresso.

O Analytics registra eventos.

Ao final, o usuário recebe um certificado.

------

# Princípios adotados

- Alta coesão
- Baixo acoplamento
- Componentização
- Separação de responsabilidades
- Reutilização
- Modularidade
- Escalabilidade
- Fácil manutenção
- Fácil expansão

------

# Diferenciais

Este não é apenas um site.

Também não é apenas um curso.

É um pequeno motor de gamificação que pode ser reutilizado para criar laboratórios sobre:

- COBOL
- JCL
- CICS
- Db2
- IMS
- VSAM
- MQ
- RACF
- z/OS
- DevOps
- Ansible
- Zowe
- Java
- Spring Boot
- APIs
- Modernização

bastando trocar os arquivos JSON e as telas específicas.

------

# O que você aprenderá

Ao concluir esta jornada você compreenderá:

- O papel do Java no IBM Z
- O relacionamento entre Java e COBOL
- Como funciona a JVM
- O ciclo de compilação
- Classes
- Objetos
- Métodos
- APIs
- CICS
- Db2
- MQ
- Modernização de aplicações

Tudo explicado utilizando exemplos familiares para quem já programa em COBOL.

------

## Boa jornada!

Prepare seu café.

Sua missão está prestes a começar.

**Bem-vindo ao Bellacosa Mainframe.**



# 📖 README — Parte 2

# Arquitetura Interna

O simulador foi desenvolvido utilizando uma arquitetura baseada em **ES Modules**, onde cada arquivo possui uma responsabilidade única.

Essa abordagem reduz o acoplamento, facilita testes, reutilização e manutenção.

------

# Fluxo Geral

```text
Usuário

↓

index.html

↓

app.js

↓

config.js

↓

router.js

↓

Tela Atual

↓

Motores (Engines)

↓

Storage + Analytics + Event Bus

↓

Atualização da Interface
```

------

# app.js

É o ponto de entrada da aplicação.

Responsabilidades:

- Inicializar o sistema
- Carregar configurações
- Registrar componentes
- Inicializar Router
- Inicializar Analytics
- Inicializar Audio
- Carregar primeira tela

Nunca deve conter regras de negócio.

------

# config.js

Centraliza todas as configurações.

Exemplos:

- XP por fase
- Tempo das animações
- Nome do laboratório
- Versão
- Caminhos
- Cores
- Recursos habilitados

Isso evita valores espalhados pelo projeto.

------

# router.js

Responsável pela navegação.

Ele controla:

```text
Startup

↓

Intro

↓

Timeline

↓

Architecture

↓

Mapping

↓

Labs

↓

Quiz

↓

Boss

↓

Finish
```

Cada tela é independente.

------

# event-bus.js

O Event Bus elimina dependências diretas entre módulos.

Sem Event Bus:

```text
Quiz

↓

Boss

↓

Achievements

↓

Analytics
```

Todos conhecem todos.

Com Event Bus:

```text
Quiz

↓

Event Bus

↓

Achievements

Boss

Analytics

Storage
```

Cada módulo apenas publica ou escuta eventos.

------

# storage.js

Centraliza o LocalStorage.

Nunca utilizamos localStorage diretamente.

Sempre:

```javascript
Storage.set()

Storage.get()

Storage.remove()

Storage.clear()
```

Isso facilita futuras migrações para IndexedDB ou APIs.

------

# analytics.js

Toda ação do usuário gera um evento.

Exemplos:

```text
Tela aberta

↓

Botão clicado

↓

Resposta correta

↓

Resposta errada

↓

Boss derrotado

↓

Curso concluído
```

Esses dados podem futuramente alimentar dashboards.

------

# xp-manager.js

Controla toda a progressão.

Responsável por:

- XP
- Níveis
- Evolução
- Recompensas
- Desbloqueios

Nenhuma tela calcula XP diretamente.

------

# achievements.js

Controla conquistas.

Cada conquista possui:

```text
ID

Título

Descrição

Ícone

XP

Oculta?

Desbloqueada?
```

As regras ficam centralizadas.

------

# boss-engine.js

Motor da batalha final.

Controla:

- Vida
- Ataques
- Ataque Especial
- Dano
- Vitória
- Derrota

A interface apenas exibe os resultados.

------

# quiz-engine.js

É um motor completamente independente.

Ele sabe:

- Pergunta atual
- Resposta correta
- Pontuação
- Estatísticas
- Percentual
- Próxima pergunta

As telas apenas desenham o conteúdo.

------

# terminal.js

Simula um terminal IBM Z.

Pode exibir:

```text
TSO

ISPF

JCL

Java

USS

Shell

Logs

Comandos
```

Tudo é controlado por JSON.

------

# animation.js

Centraliza todas as animações.

Exemplos:

- Fade
- Slide
- Zoom
- Pulse
- Shake
- Flip

Nenhuma tela manipula animações diretamente.

------

# particles.js

Motor das partículas.

Utilizado em:

- Vitória
- Boss
- Introdução
- Certificado

Pode ser desligado facilmente.

------

# confetti.js

Responsável pelos confetes.

Chamado apenas quando necessário.

------

# audio.js

Controla todos os sons.

```text
Click

Erro

Acerto

Boss

Vitória

Boot

Conclusão
```

Todo áudio passa por esse módulo.

------

# utils.js

Biblioteca utilitária.

Exemplos:

```javascript
$

$$

sleep()

random()

uuid()

clamp()

formatXP()

debounce()

throttle()
```

Evita repetição de código.

------

# Organização das Screens

Cada tela possui exatamente a mesma estrutura.

```text
constructor()

↓

load()

↓

render()

↓

init()

↓

bindEvents()

↓

show()

↓

hide()

↓

destroy()
```

Isso facilita criar novas telas.

------

# Fluxo das Screens

```text
Router

↓

render()

↓

HTML

↓

init()

↓

Eventos

↓

Usuário

↓

Engine

↓

Storage

↓

Analytics

↓

Router
```

------

# Estrutura dos Dados

Todo conteúdo fica em JSON.

```text
timeline.json

quiz.json

cards.json

architecture.json

glossary.json

achievements.json
```

Separar dados do código facilita:

- manutenção
- tradução
- expansão
- reutilização

------

# Comunicação

O fluxo interno acontece assim:

```text
Usuário

↓

Clique

↓

Tela

↓

Engine

↓

XP

↓

Achievements

↓

Storage

↓

Analytics

↓

Event Bus

↓

Router

↓

Próxima Tela
```

------

# Organização do CSS

Cada arquivo possui responsabilidade única.

```text
variables.css

↓

layout.css

↓

cards.css

↓

buttons.css

↓

timeline.css

↓

quiz.css

↓

modal.css

↓

progress.css

↓

responsive.css
```

------

# Organização do SEO

Todo SEO fica isolado.

```text
seo/

robots.txt

schema.js

manifest.webmanifest

sitemap.xml

llms.txt

security.txt

humans.txt

Open Graph

Twitter Cards
```

Nenhum componente precisa conhecer SEO.

------

# Princípios SOLID

O projeto procura seguir conceitos inspirados no SOLID.

- Responsabilidade única
- Baixo acoplamento
- Alta coesão
- Componentização
- Reutilização
- Facilidade de expansão

------

# Escalabilidade

O mesmo motor pode gerar laboratórios para:

- COBOL
- CICS
- Db2
- IMS
- JCL
- MQ
- RACF
- VSAM
- Java
- Spring Boot
- DevOps
- Ansible
- Zowe
- Python
- Linux on Z

Na maioria dos casos, basta substituir os arquivos JSON e criar novas telas específicas.

------

# Visão Geral da Arquitetura

```text
                    app.js
                       │
         ┌─────────────┼─────────────┐
         │             │             │
      Router       Event Bus      Config
         │             │
         │      ┌──────┼────────┐
         │      │      │        │
         ▼      ▼      ▼        ▼
      Screens Storage Analytics Audio
         │
         ▼
      Engines
         │
         ▼
     JSON Data
```

------

# Benefícios dessa arquitetura

- Código organizado
- Fácil leitura
- Fácil manutenção
- Fácil teste
- Fácil expansão
- Separação entre dados e lógica
- Reutilização dos componentes
- Baixo acoplamento
- Alto reaproveitamento
- Estrutura semelhante à utilizada em aplicações profissionais

Com essa base, novos laboratórios podem ser criados rapidamente, mantendo a mesma experiência de navegação e gamificação.



# 📖 README — Parte 3

# Instalação

O projeto não necessita de compilação.

É uma aplicação Web baseada em HTML, CSS e JavaScript.

## Estrutura mínima

```text
project/

│

├── index.html

├── css/

├── js/

├── data/

├── images/

├── seo/

└── audio/
```

------

# Executando localmente

## Opção 1

Abrir o arquivo:

```text
index.html
```

Alguns navegadores podem restringir o carregamento de arquivos JSON quando utilizados diretamente pelo protocolo `file://`.

------

## Opção 2 (Recomendado)

Executar um servidor HTTP simples.

Exemplo utilizando Python:

```bash
python -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

------

## Opção 3

Utilizar a extensão **Live Server** do Visual Studio Code.

------

# Como criar um novo laboratório

Toda a arquitetura foi desenvolvida para ser reutilizada.

Basta criar novos arquivos JSON e novas telas.

Exemplo:

```text
data/

quiz.json

timeline.json

cards.json

glossary.json

architecture.json
```

Depois:

```text
screens/

intro.js

timeline.js

quiz.js

boss.js

finish.js
```

Nenhum motor precisa ser alterado.

------

# Como criar um novo Quiz

Adicionar perguntas em:

```text
data/quiz.json
```

Cada questão possui:

```json
{
  "question": "...",
  "options": [],
  "answer": 0,
  "xp": 100
}
```

O Quiz Engine processará automaticamente.

------

# Como criar um novo Boss

Criar um novo perfil.

Exemplo:

```text
Cloud Monster

Legacy Monster

SQL Dragon

CICS Guardian

JCL Titan

Db2 Kraken

IMS Overlord
```

O Boss Engine permanece o mesmo.

------

# Como criar novas Conquistas

Editar:

```text
data/achievements.json
```

Adicionar:

- ID
- Nome
- XP
- Descrição
- Ícone

Não é necessário modificar JavaScript.

------

# Como adicionar novos Cards

Editar:

```text
cards.json
```

Cada cartão representa um conceito.

Exemplos:

- COBOL ⇄ Java
- Db2 ⇄ JDBC
- CICS ⇄ REST
- MQ ⇄ Mensageria

------

# Como adicionar novas telas

Criar:

```text
screens/

novaTela.js
```

Registrar no Router.

Pronto.

------

# Como adicionar novos eventos

Publicar:

```javascript
EventBus.emit(
    "evento"
);
```

Escutar:

```javascript
EventBus.on(
    "evento",
    callback
);
```

Nenhum módulo precisa conhecer outro.

------

# Como adicionar novas animações

Adicionar em:

```text
animations.css
```

ou

```text
animation.js
```

------

# Como adicionar novos sons

Adicionar em:

```text
audio/
```

Registrar em:

```text
audio.js
```

------

# Como adicionar novas imagens

Adicionar em:

```text
images/
```

Depois utilizar normalmente.

------

# SEO

O projeto já possui:

- robots.txt
- sitemap.xml
- JSON-LD
- Open Graph
- Twitter Cards
- PWA
- Manifest
- BrowserConfig
- Security.txt
- Humans.txt
- llms.txt

Isso facilita indexação em buscadores tradicionais e plataformas que utilizam metadados estruturados.

------

# Performance

Algumas boas práticas adotadas:

- CSS modular
- ES Modules
- Lazy Loading
- Componentização
- Reutilização
- JSON separado
- LocalStorage
- Sem frameworks pesados

------

# Roadmap

## Versão 1

- Introdução
- Timeline
- Arquitetura
- Quiz
- Boss

------

## Versão 2

- Terminal interativo
- Drag & Drop
- Mini Games
- Certificado

------

## Versão 3

- Ranking Online
- Multiplayer
- API REST
- Dashboard
- Estatísticas

------

## Versão 4

- Integração com GitHub
- IA Tutor
- Assistente Virtual
- Recomendações personalizadas

------

# FAQ

## Preciso conhecer Java?

Não.

O laboratório foi criado justamente para quem conhece COBOL.

------

## Preciso conhecer Orientação a Objetos?

Não.

Todos os conceitos são apresentados de forma gradual.

------

## Posso reutilizar a arquitetura?

Sim.

Ela foi construída para servir como base para outros simuladores.

------

## Posso criar novos laboratórios?

Sim.

Esse é um dos principais objetivos do projeto.

------

## O projeto utiliza Framework?

Não.

Toda a aplicação utiliza JavaScript moderno puro (Vanilla JavaScript), HTML5 e CSS3.

------

# Curiosidades

## Java nasceu em 1995.

Hoje executa em praticamente todas as plataformas.

Inclusive no IBM Z.

------

## O IBM Z executa Java há muitos anos.

Milhares de aplicações bancárias utilizam Java junto com COBOL.

------

## Java não substituiu COBOL.

Na maioria das empresas:

COBOL continua processando as regras de negócio.

Java cria APIs, interfaces modernas e integrações.

As duas tecnologias trabalham juntas.

------

# Dicas para o Programador COBOL

Não tente esquecer COBOL.

Utilize o conhecimento que você já possui.

Faça comparações.

Por exemplo:

```text
PROGRAM-ID

↓

class
PERFORM

↓

method
CALL

↓

invocação de método
Working-Storage

↓

atributos da classe
```

Essa abordagem torna o aprendizado muito mais natural.

------

# Filosofia Bellacosa Mainframe

Acreditamos que tecnologia deve ser ensinada de maneira acessível.

Menos decoreba.

Mais compreensão.

Menos slides.

Mais experimentação.

Menos medo.

Mais curiosidade.

------

# Contribuindo

Sugestões são bem-vindas.

Você pode contribuir:

- criando novos laboratórios;
- revisando conteúdos;
- reportando problemas;
- propondo melhorias;
- compartilhando conhecimento com a comunidade.

------

# Licença

Este projeto pode ser distribuído conforme a licença adotada pelo repositório.

Consulte o arquivo `LICENSE` para mais detalhes.

------

# Agradecimentos

A todos os profissionais que mantêm o ecossistema IBM Z em funcionamento.

À comunidade Mainframe.

Aos desenvolvedores COBOL.

Aos profissionais Java.

E a todos que acreditam que aprender é uma jornada contínua.

------

# Um convite especial

Se você gostou deste laboratório, há muito mais conteúdo esperando por você.

O **El Jefe Midnight Lunch** reúne artigos, tutoriais, laboratórios, quizzes e materiais sobre:

- COBOL
- JCL
- CICS
- Db2
- IMS
- VSAM
- RACF
- z/OS
- Java no IBM Z
- Modernização
- APIs
- DevOps
- Arquitetura
- Inteligência Artificial aplicada ao Mainframe

A proposta é transformar assuntos complexos em conteúdos claros, práticos e acessíveis, sempre conectando a tradição do Mainframe com as tecnologias atuais.

Obrigado por fazer parte desta jornada.

**Nos vemos no próximo café no Bellacosa Mainframe. ☕**
