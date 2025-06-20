const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  criarTarefa,
  listarTarefas,
  buscarTarefa,
  atualizarTarefa,
  deletarTarefa
} = require('./controllers/tarefasController');
const router = express.Router();

// Middleware para tratar erros de validação
function validar(req, res, next) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }
  next();
}

// Criar tarefa
router.post('/',
  body('titulo').notEmpty().withMessage('Título é obrigatório'),
  validar,
  criarTarefa
);

// Listar tarefas
router.get('/', listarTarefas);

// Buscar tarefa por ID
router.get('/:id', buscarTarefa);

// Atualizar tarefa
router.put('/:id',
  body('titulo').optional().notEmpty().withMessage('Título não pode ser vazio'),
  validar,
  atualizarTarefa
);

// Deletar tarefa
router.delete('/:id', deletarTarefa);

module.exports = router; 