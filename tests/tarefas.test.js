const request = require('supertest');
const express = require('express');
const tarefasRouter = require('../src/tarefas');

const app = express();
app.use(express.json());
app.use('/api/tarefas', tarefasRouter);

describe('API de Tarefas', () => {
  let idCriado;

  it('deve criar uma tarefa', async () => {
    const res = await request(app)
      .post('/api/tarefas')
      .send({ titulo: 'Nova tarefa', descricao: 'Descrição' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    idCriado = res.body.id;
  });

  it('deve listar tarefas', async () => {
    const res = await request(app).get('/api/tarefas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve buscar tarefa por ID', async () => {
    const res = await request(app).get(`/api/tarefas/${idCriado}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', idCriado);
  });

  it('deve atualizar tarefa', async () => {
    const res = await request(app)
      .put(`/api/tarefas/${idCriado}`)
      .send({ titulo: 'Atualizada', concluida: true });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('titulo', 'Atualizada');
    expect(res.body).toHaveProperty('concluida', true);
  });

  it('deve deletar tarefa', async () => {
    const res = await request(app).delete(`/api/tarefas/${idCriado}`);
    expect(res.statusCode).toBe(204);
  });
}); 