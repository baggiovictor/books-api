-- CREATE: criação da tabela alunos
CREATE TABLE alunos (
  matricula VARCHAR(50) NOT NULL UNIQUE,
  nome VARCHAR(255) NOT NULL,
  PRIMARY KEY (matricula)
);
