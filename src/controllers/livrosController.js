const db = require('../db');

exports.listarLivros = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM livros');
    const livros = JSON.parse(JSON.stringify(rows));
    res.json(livros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar livros' });
  }
};

exports.buscarLivro = async (req, res) => {
  const registro = req.params.registro;
  try {
    const livro = await db.query('SELECT * FROM livros WHERE registro = ?', [registro]);
    if (livro.length > 0) {
      res.json(livro[0]);
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar livro' });
  }
};

exports.cadastrarLivro = async (req, res) => {
  const { titulo, autor } = req.body;
  try {
    const result = await db.query('INSERT INTO livros (titulo, autor) VALUES (?, ?)', [titulo, autor]);
    res.json({ message: 'Livro cadastrado com sucesso', registro: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar livro' });
  }
};

exports.atualizarLivro = async (req, res) => {
  const registro = req.params.registro;
  const { titulo, autor } = req.body;
  try {
    const result = await db.query('UPDATE livros SET titulo = ?, autor = ? WHERE registro = ?', [titulo, autor, registro]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Livro atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar livro' });
  }
};

exports.excluirLivro = async (req, res) => {
  const registro = req.params.registro;
  try {
    const result = await db.query('DELETE FROM livros WHERE registro = ?', [registro]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Livro excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erro ao excluir livro' });
  }
}