const express = require('express');
const router = express.Router();
const emprestimosController = require('../controllers/emprestimosController');

router.post("/", emprestimosController.create);
router.get("/", emprestimosController.read);
router.post("/:registro_emprestimo", emprestimosController.update);

module.exports = router;
