const db = require('../db');

exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await db.query('SELECT * FROM alunos');
    res.json(alunos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar alunos' });
  }
};

exports.cadastrarAluno = async (req, res) => {
  console.log(req.body)
  const { nome } = req.body;

  try {
    await db.query('INSERT INTO alunos (nome) VALUES (?)', [nome]);
    res.status(201).json({ message: 'Aluno cadastrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar aluno' });
  }
};

exports.atualizarAluno = async (req, res) => {
  const matricula = req.params.matricula;
  const { nome } = req.body;
  try {
    const result = await db.query('UPDATE alunos SET nome = ? WHERE matricula = ?', [nome, matricula]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Aluno atualizado com sucesso' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
};

exports.excluirAluno = async (req, res) => {
  const matricula = req.params.matricula;
  try {
    const result = await db.query('DELETE FROM alunos WHERE matricula = ?', [matricula]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Aluno excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao excluir aluno' });
  }
};

exports.buscarAlunoPorMatricula = async (req, res) => {
  const matricula = req.params.matricula;
  try {
    const aluno = await db.query('SELECT * FROM alunos WHERE matricula = ?', [matricula]);
    if (aluno.length > 0) {
      res.json(aluno[0]);
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
};