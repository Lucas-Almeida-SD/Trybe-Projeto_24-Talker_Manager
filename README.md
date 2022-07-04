# Projeto Talker Manager

Esse projeto foi realizado para exercitar o que foi aprendido no Bloco 22 do Módulo de Back End do curso da [Trybe](https://www.betrybe.com/), no qual foi sobre `Node.js`, `fluxo assíncrono`, `Express`, e testes com `Mocha`, `Chai` e `Sinon`.

Nesse projeto foi desenvolvido uma API de cadastro de talkers (palestrantes) em que é possível realizar um `CRUD` (create, read, update, delete), ou seja, cadastrar, visualizar, editar e excluir informações através de requisiçoes feitas à API, utilizando `endpoints` específicos para cada ação.

Foi utilizado um arquivo `json` para simular um banco de dados.

## Tecnologias
  - Node.js;
  - Express;
  - módulo __fs__ do Node.js.

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:Lucas-Almeida-SD/Trybe-Projeto_24-Talker_Manager.git
$ cd Trybe-Projeto_24-Talker_Manager
```

Para iniciá-lo, siga os passos abaixo:

<details>
  <summary><strong>Com Docker</strong></summary>

  ```bash
  # Criar container
  $ docker-compose up -d

  # Abrir terminal interativo do container
  $ docker container exec -it talker_manager bash

  # Instalar as dependências
  $ npm install

  # Iniciar o projeto
  $ npm start
  ```
</details>

<details>
  <summary><strong>Sem Docker</strong></summary>

  ```bash
  # Instalar as dependências
  $ npm install

  # Iniciar o projeto
  $ npm start
  ```
</details>

A API estará disponível na URL base `localhost:3000`.