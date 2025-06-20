const express = require('express');
const tarefasRouter = require('./tarefas');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const { sequelize } = require('./models');
const { errorHandler, autenticarJWT } = require('./middlewares');
const authRouter = require('./auth');

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tarefas', autenticarJWT, tarefasRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}); 