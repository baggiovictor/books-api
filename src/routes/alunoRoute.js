const express = require('express');
const router = express.Router();
const alunosController = require('../controllers/alunosController');

// Listar todos os alunos
router.get('/', alunosController.listarAlunos);

// Buscar um aluno pela matrícula
router.get('/:matricula', alunosController.buscarAlunoPorMatricula);

// Cadastrar um novo aluno
router.post('/', alunosController.cadastrarAluno);

// Atualizar um aluno pela matrícula
router.put('/:matricula', alunosController.atualizarAluno);

// Excluir um aluno pela matrícula
router.delete('/:matricula', alunosController.excluirAluno);

module.exports = router;
