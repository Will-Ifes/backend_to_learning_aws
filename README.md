# Projeto Base

## Introdução

Este projeto é uma aplicação backend que utiliza Express e PostgreSQL, gerenciado pelo Prisma. Abaixo estão as instruções para configurar o ambiente, inserir dados de teste, executar o backend, e utilizar as rotas disponíveis.

## Configuração do Ambiente

1. **Instale o PostgreSQL**:

   - Certifique-se de que o PostgreSQL está instalado na sua máquina.

2. **Configure o Banco de Dados**:

   - Crie um banco de dados chamado `bancscccobase`.

   ```sql
   CREATE DATABASE bancscccobase;
   ```

3. **Configuração do Arquivo .env**:

   - Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   - exemplo

   ```env
   DATABASE_URL="postgresql://chapolin:senha@localhost:5300/bancscccobase?schema=public"
   JWT_SECRET="sua_chave_secreta"
   ```

4. **Instale as Dependências**:

   - Execute o comando abaixo para instalar as dependências do projeto.

   ```bash
   npm install
   ```

5. **Execute as Migrações do Prisma**:

   - Execute o comando abaixo para aplicar as migrações do Prisma e criar as tabelas no banco de dados.

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Iniciar o Servidor**:

   - Execute o comando abaixo para iniciar o servidor.

   ```bash
   npm start
   ```

   O backend estará rodando em [http://localhost:3001](http://localhost:3001).

## Rotas Disponíveis

### Autenticação

- **Registrar Usuário**: `POST /auth/register`

  ```json
  Body: { "email": "string", "password": "string", "name": "string", "tenantId": "number" }
  ```

- **Login**: `POST /auth/login`

  ```json
  Body: { "email": "string", "password": "string" }
  ```

### Usuários

- **Listar Todos os Usuários**: `GET /auth/users`
- **Buscar Usuário por Email**: `GET /auth/user/:email`

### Tenants

- **Listar Todos os Tenants**: `GET /auth/tenants`

### Rotas Protegidas

- **Rota Protegida**: `GET /protected`
  - Requer autenticação com token JWT.

## Execução de Testes

- **Executar Testes Automatizados**:

  - Se você tiver testes automatizados configurados, execute-os para garantir que tudo está funcionando conforme o esperado.

  ```bash
  npm test
  ```

## Backup do Banco de Dados

- **Backup**:

  - Execute o comando abaixo para fazer o backup do banco de dados.

  - exemplo

  ```bash
  pg_dump -U chapolin -h localhost -p 5300 -d bancscccobase -F c -b -v -f bancscccobase_backup.dump
  ```
