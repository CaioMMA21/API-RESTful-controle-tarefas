const express = require('express');
const { body, validationResult } = require('express-validator');
const { registrar, login } = require('./controllers/authController');
const router = express.Router();

function validar(req, res, next) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }
  next();
}

router.post('/register',
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  validar,
  registrar
);

router.post('/login',
  body('email').isEmail(),
  body('senha').notEmpty(),
  validar,
  login
);

module.exports = router; 