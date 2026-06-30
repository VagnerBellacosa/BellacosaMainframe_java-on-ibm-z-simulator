# Contributing Guide

Obrigado pelo interesse em contribuir com o **Java on IBM Z Simulator**.

Este projeto faz parte do ecossistema **Bellacosa Mainframe Learning Framework**, cujo objetivo é tornar o aprendizado de tecnologias IBM Z mais acessível por meio de laboratórios práticos, gamificação e simuladores interativos.

------

# Como contribuir

Existem diversas formas de colaborar.

## 🐞 Reportar bugs

Abra uma Issue contendo:

- descrição do problema;
- passos para reproduzir;
- comportamento esperado;
- comportamento observado;
- navegador e sistema operacional;
- capturas de tela, quando aplicável.

------

## 💡 Sugerir funcionalidades

São bem-vindas sugestões relacionadas a:

- IBM Z
- Java
- COBOL
- CICS
- Db2
- MQ
- JCL
- z/OS
- gamificação
- acessibilidade
- interface
- documentação

Explique claramente:

- o problema;
- a proposta;
- os benefícios esperados.

------

## 🧪 Criar laboratórios

Novos laboratórios são uma das principais formas de contribuição.

Sempre que possível, inclua:

- objetivo;
- nível de dificuldade;
- pré-requisitos;
- solução;
- explicação;
- referências.

------

## 📚 Melhorar documentação

São aceitas melhorias em:

- README
- FAQ
- API
- Architecture
- Roadmap
- comentários de código
- tutoriais

------

## 🌍 Traduções

O projeto suporta internacionalização.

Os arquivos ficam em:

```text
lang/
```

Exemplo:

```text
pt-BR.json
en-US.json
```

Novos idiomas devem manter exatamente as mesmas chaves.

------

# Fluxo de desenvolvimento

1. Faça um Fork.
2. Crie uma branch.

```text
feature/minha-feature
```

ou

```text
fix/corrige-bug
```

1. Faça commits pequenos e objetivos.
2. Execute os testes.
3. Atualize a documentação quando necessário.
4. Abra um Pull Request.

------

# Estrutura do projeto

```text
assets/
css/
data/
js/
lang/
seo/
tests/
```

------

# Convenções

## JavaScript

- ES Modules
- async/await
- camelCase
- sem bibliotecas desnecessárias
- código modular

------

## HTML

- HTML5 semântico
- acessível
- atributos ARIA quando apropriado

------

## CSS

- responsivo
- reutilizável
- uso de variáveis do `theme.css`
- evitar duplicação

------

## JSON

- UTF-8
- indentação de 2 espaços
- chaves em inglês
- valores traduzíveis via i18n

------

# Commits

Recomendamos o padrão Conventional Commits.

Exemplos:

```text
feat: adiciona novo laboratório de JVM
fix: corrige cálculo de XP
docs: atualiza README
refactor: simplifica router
test: adiciona testes do leaderboard
```

------

# Pull Requests

Um Pull Request deve:

- resolver apenas um assunto;
- possuir descrição clara;
- passar nos testes;
- não introduzir erros de lint;
- atualizar documentação quando necessário.

------

# Código

Antes de enviar:

- remova código morto;
- remova `console.log` de depuração;
- mantenha funções pequenas;
- reutilize componentes existentes.

------

# Testes

Sempre que possível, inclua testes para novas funcionalidades.

Atualmente o projeto possui testes para:

- Router
- XP
- Boss
- Quiz

------

# Performance

Contribuições devem priorizar:

- carregamento rápido;
- baixo consumo de memória;
- modularização;
- lazy loading.

------

# Acessibilidade

Sempre considere:

- navegação por teclado;
- contraste adequado;
- textos alternativos em imagens;
- atributos ARIA quando necessários;
- compatibilidade com leitores de tela.

------

# Licença

Ao contribuir com este projeto, você concorda que seu código poderá ser distribuído sob a mesma licença do projeto.

------

# Código de Conduta

Todos os colaboradores devem seguir o conteúdo de **CODE_OF_CONDUCT.md**.

------

# Agradecimento

Toda contribuição, seja código, documentação, tradução, correção de bugs ou novas ideias, ajuda a fortalecer a comunidade IBM Z e a tornar o aprendizado mais acessível para novos profissionais.

Muito obrigado por contribuir com o **Bellacosa Mainframe Learning Framework**.