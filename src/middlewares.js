const jwt = require('jsonwebtoken');

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    erro: err.message || 'Erro interno do servidor'
  });
}

function autenticarJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || 'segredo_super_secreto', (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido' });
    req.usuario = usuario;
    next();
  });
}

module.exports = { errorHandler, autenticarJWT }; 