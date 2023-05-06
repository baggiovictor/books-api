const express = require('express');
const alunoRouter = require('./src/routes/alunoRoute');
const livrosRouter = require('./src/routes/livrosRoute');
const emprestimosRouter = require('./src/routes/emprestimoRoute');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// Configuração do body-parser para trabalhar com requisições POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Rotas de alunos
app.use('/alunos', alunoRouter);
// Rotas de livros
app.use('/livros', livrosRouter);
// Rotas de emprestimos
app.use('/emprestimos', emprestimosRouter);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

