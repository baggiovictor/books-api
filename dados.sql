create database biblioteca

-- CREATE: criação da tabela alunos
CREATE TABLE alunos (
  matricula INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  PRIMARY KEY (matricula)
);

-- CREATE: criação da tabela livros
CREATE TABLE livros (
  registro INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  PRIMARY KEY (registro),
  UNIQUE (titulo)
);


ALTER TABLE livros ADD emprestado BOOLEAN DEFAULT false;

CREATE TABLE emprestimos (
  registro_emprestimo INT UNIQUE AUTO_INCREMENT PRIMARY KEY NOT NULL,
  registro_livro INT NOT NULL,
  titulo_livro VARCHAR(255),
  matricula_aluno INT NOT NULL,
  nome_aluno VARCHAR(255),
  data_emprestimo DATE,
  data_devolucao DATE,
  FOREIGN KEY (registro_livro) REFERENCES livros(registro),
  FOREIGN KEY (matricula_aluno) REFERENCES alunos(matricula)
);
