const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const authRouter = require('../src/auth');
const tarefasRouter = require('../src/tarefas');
const { autenticarJWT } = require('../src/middlewares');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/tarefas', autenticarJWT, tarefasRouter);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Autenticação e proteção de rotas', () => {
  let token;
  const email = 'teste@exemplo.com';
  const senha = '123456';

  it('deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email, senha });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', email);
  });

  it('deve fazer login e receber um token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, senha });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('deve negar acesso a rota protegida sem token', async () => {
    const res = await request(app).get('/api/tarefas');
    expect(res.statusCode).toBe(401);
  });

  it('deve acessar rota protegida com token', async () => {
    const res = await request(app)
      .get('/api/tarefas')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
}); 