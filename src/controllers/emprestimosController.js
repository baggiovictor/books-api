const db = require('../db');

exports.create = async (req, res) => {
  const registro_livro = req.body.registro_livro;
  const matricula_aluno = req.body.matricula_aluno;

  try {
    // Consultar informações do livro e verificar se está disponível para empréstimo
    const [[livro]] = await db.execute(
      `SELECT titulo, emprestado FROM livros WHERE registro = ?`,
      [registro_livro]
    );

    if (!livro) {
      res.status(404).send("Livro não encontrado");
      return;
    }

    if (livro.emprestado) {
      res.status(400).send("Livro já está emprestado");
      return;
    }

    // Consultar informações do aluno
    const [[aluno]] = await db.execute(
      `SELECT nome FROM alunos WHERE matricula = ?`,
      [matricula_aluno]
    );

    if (!aluno) {
      res.status(404).send("Aluno não encontrado");
      return;
    }

    const nome_aluno = aluno.nome;

    // Inserir novo empréstimo na tabela e atualizar o status do livro
    const [result] = await db.execute(
      `INSERT INTO emprestimos (registro_livro, titulo_livro, matricula_aluno, nome_aluno, data_emprestimo) VALUES (?, ?, ?, ?, ?)`,
      [registro_livro, livro.titulo, matricula_aluno, nome_aluno, new Date()]
    );

    await db.execute(
      `UPDATE livros SET emprestado = 1 WHERE registro = ?`,
      [registro_livro]
    );

    // Consultar informações do empréstimo recém-inserido
    const [[emprestimo]] = await db.execute(
      `SELECT * FROM emprestimos WHERE registro_emprestimo = ?`,
      [result.insertId]
    );

    res.json(emprestimo);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao criar empréstimo");
  }
};

exports.read = async (req, res) => {
  try {
    const emprestimos = await db.query('SELECT * FROM emprestimos');
    res.json(emprestimos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar emprestimos' });
  }
};

exports.update = async (req, res) => {
  try {
    const { registro_emprestimo } = req.params;
    console.log(registro_emprestimo)
    const [emprestimo] = await db.query('SELECT * FROM emprestimos WHERE registro_emprestimo = ?', [registro_emprestimo]);

    if (!emprestimo) {
      return res.status(404).json({ message: 'Empréstimo não encontrado' });
    }

    const [livro] = await db.query('SELECT * FROM livros WHERE registro = ?', [registro_emprestimo]);

    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    await db.query('UPDATE livros SET emprestado = false WHERE registro = ?', [livro.map(x => registro = x.registro)]);
    await db.query('UPDATE emprestimos SET data_devolucao = ? WHERE registro_emprestimo = ?', [new Date(), registro_emprestimo]);


    res.status(200).json({ message: 'Devolução registrada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};