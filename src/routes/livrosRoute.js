const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');

router.get('/', livrosController.listarLivros);
router.get('/:registro', livrosController.buscarLivro);
router.post('/', livrosController.cadastrarLivro);
router.put('/:registro', livrosController.atualizarLivro);
router.delete('/:registro', livrosController.excluirLivro);

module.exports = router;
