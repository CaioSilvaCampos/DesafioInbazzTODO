# Desafio Inbazz

Este repositório contém a solução do desafio técnico proposto pela **Inbazz**, implementada com **NestJS**, **TypeORM**, **PostgreSQL** e **Docker**.

## 📋 Requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (opcional, apenas se quiser rodar localmente sem Docker)
- [npm](https://www.npmjs.com/) (vem junto com o Node.js)

---

## 🚀 Rodando a aplicação com Docker

1. **Clone o repositório**
   ```bash
   git clone https://github.com/CaioSilvaCampos/DesafioInbazzTODO.git
   cd desafio-inbazz
   ```

2. **Crie o arquivo `.env`**  
   Use o `.env.example` como base:
   ```bash
   cp .env.example .env
   ```
   No `.env`, configure as variáveis, por exemplo:
   ```env
   DATABASE_HOST=db
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_NAME=desafio_inbazz
   JWT_SECRET=sua_chave_secreta
   ```

3. **Suba os containers**
   ```bash
   docker-compose up --build
   ```

4. **Acesse a aplicação**
   - API: `http://localhost:3000`
   - Swagger: `http://localhost:3000/docs`

---

## 🔐 Autenticação

- Para **criar, atualizar ou deletar** recursos, é necessário estar autenticado.
- O fluxo básico é:
  1. **Registrar um usuário** na rota `/usuario` enviando `email` e `senha`.
  2. **Fazer login** na rota `/auth/login` para receber um **token JWT**.
  3. Enviar o token no header `Authorization` em formato:
     ```
     Authorization: Bearer SEU_TOKEN_AQUI
     ```

---

## 📄 Endpoints principais

- `GET /` — Mensagem de boas-vindas.
- `GET /docs` — Documentação da API no Swagger.
- `GET /categories` — Lista as categorias.
- `GET /todos` — Lista as tarefas.
- **Autenticados:**
  - `POST /categories`
  - `PUT /categories/:id`
  - `DELETE /categories/:id`
  - `POST /todos`
  - `PUT /todos/:id`
  - `DELETE /todos/:id`

