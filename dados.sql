-- CREATE: criação da tabela alunos
CREATE TABLE alunos (
  matricula VARCHAR(50) NOT NULL UNIQUE,
  nome VARCHAR(255) NOT NULL,
  PRIMARY KEY (matricula)
);

CREATE TABLE livros (
  registro INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  PRIMARY KEY (registro),
  UNIQUE (titulo)
);
