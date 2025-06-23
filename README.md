# API RESTful para Controle de Tarefas

Projeto universitário/pessoal para gerenciamento de tarefas, com autenticação JWT, testes automatizados e documentação Swagger.

## Tecnologias Utilizadas
- Node.js
- Express
- Sequelize + SQLite
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- Jest + Supertest
- Swagger (OpenAPI)

## Funcionalidades
- Cadastro e login de usuário
- CRUD de tarefas (criar, listar, buscar, atualizar, remover)
- Autenticação e autorização via JWT
- Testes automatizados
- Documentação interativa

## Como rodar o projeto

1. Instale as dependências:
   ```
   npm install
   ```
2. Inicie o servidor:
   ```
   npm start
   ```
3. Acesse a documentação Swagger:
   - [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Testes
Execute os testes automatizados com:
```
npm test
```

## Variáveis de ambiente
Você pode criar um arquivo `.env` para definir a variável `JWT_SECRET` (opcional).



---

