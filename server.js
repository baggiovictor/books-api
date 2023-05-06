const express = require('express');
const db = require('./src/db')
const alunoRouter = require('./src/routes/alunoRoute');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// Configuração do body-parser para trabalhar com requisições POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Rotas de alunos
app.use('/alunos', alunoRouter);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

