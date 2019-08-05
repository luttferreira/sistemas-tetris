CREATE TABLE ranking (
	nome varchar(25) not null default 'Jogador',
	pontuacao mediumint(8) unsigned not null default 0,
	nivel  tinyint(2) unsigned not null default 1
);

INSERT INTO ranking (nome, pontuacao) VALUES ('JogadorA',500);
INSERT INTO ranking (nome, pontuacao) VALUES ('JogadorB',400);
INSERT INTO ranking (nome, pontuacao) VALUES ('JogadorC',300);
INSERT INTO ranking (nome, pontuacao) VALUES ('JogadorD',200);
INSERT INTO ranking (nome, pontuacao) VALUES ('JogadorE',100);