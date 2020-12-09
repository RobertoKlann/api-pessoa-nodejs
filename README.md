Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Funcionalidades](#-funcionalidades)   
   * [Como executar o projeto](#-como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Rodando a aplicação web (Frontend)](#user-content--rodando-a-aplicação-web-frontend)
   * [Autor](#-autor)
   * [Licença](#user-content--licença)
<!--te-->

## 💻 Sobre o projeto

API Agenda - api para cadastro de pessoas e endereços.

---

## ⚙️ Funcionalidades

- [x] Cadastro de pessoas, com campos:
  - [x] nome
  - [x] tipo da pessoa
  - [x] cep ou cnpj
  - [x] telefone
  - [x] email
- [x] Cadastro de endereços para a pessoa, com campos:
  - [x] cep
  - [x] logradouro
  - [x] bairro
  - [x] localidade
  - [x] uf
  - [x] número
  - [x] tipo endereço
---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [PostgreSQL](https://www.postgresql.org/).

#### 🧭 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/RobertoKlann/api-pessoa-nodejs.git

# Vá para a pasta do projeto
$ cd api-pessoa-nodejs

# Instale as dependências
$ npm install

# Vá para a pasta database e edite o arquivo index.js com as suas configurações do Banco de Dados
$ cd src/database

# Execute o script de criação das tabelas do BD
$ node src/database/createTables.js

# Execute a aplicação em modo de desenvolvimento
$ node server.js

# O servidor inciará na porta:5000
```
---

## 🦸 Autor

Roberto Oswaldo Klann
---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).
