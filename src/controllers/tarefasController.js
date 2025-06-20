const { Tarefa } = require('../models');

async function criarTarefa(req, res, next) {
  try {
    const { titulo, descricao } = req.body;
    const tarefa = await Tarefa.create({ titulo, descricao });
    res.status(201).json(tarefa);
  } catch (err) {
    next(err);
  }
}

async function listarTarefas(req, res, next) {
  try {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
  } catch (err) {
    next(err);
  }
}

async function buscarTarefa(req, res, next) {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (err) {
    next(err);
  }
}

async function atualizarTarefa(req, res, next) {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    const { titulo, descricao, concluida } = req.body;
    if (titulo !== undefined) tarefa.titulo = titulo;
    if (descricao !== undefined) tarefa.descricao = descricao;
    if (concluida !== undefined) tarefa.concluida = concluida;
    await tarefa.save();
    res.json(tarefa);
  } catch (err) {
    next(err);
  }
}

async function deletarTarefa(req, res, next) {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    await tarefa.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  criarTarefa,
  listarTarefas,
  buscarTarefa,
  atualizarTarefa,
  deletarTarefa
}; 