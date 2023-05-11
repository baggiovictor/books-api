const express = require('express');
const alunoRouter = require('./src/routes/alunoRoute');
const livrosRouter = require('./src/routes/livrosRoute');
const emprestimosRouter = require('./src/routes/emprestimoRoute');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// Configuração do body-parser para trabalhar com requisições POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000', // Altere para a origem do seu aplicativo
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization', '*'] // Cabeçalhos permitidos
}));

// Rotas de alunos
app.use('/alunos', alunoRouter);
// Rotas de livros
app.use('/livros', livrosRouter);
// Rotas de emprestimos
app.use('/emprestimos', emprestimosRouter);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

