INSERT INTO tipo_servicos (nome) VALUES 
('Manutenção de Jardins'),
('Paisagismo'),
('Podagem de Árvores'),
('Controle de Pragas'),
('Irrigação Automática');


INSERT INTO plano_subscricao (tipo_plano, limite_equipas, limite_servicos,  ativo) VALUES
('A', 3, 5,  1),
('B', 5, 10,  1),
('C', 7, 20,  1);

INSERT INTO empresas (nome, nif, email, contacto, morada, cod_postal, localidade, ramo_atividade,logo_empresa) VALUES
('Empresa A', '12345678', 'empresaA@example.com', 123456789, 'Rua da Empresa A, 123', '1234-678', 'Cidade A', 'Tecnologia',  'https://res.cloudinary.com/dfm8oiovu/image/upload/v1714830224/Logo_x8ks2j.png'),
('Empresa B', '98765432', 'empresaB@example.com', 987654321, 'Avenida da Empresa B, 456', '5432-876', 'Cidade B', 'Saúde',   NULL);


INSERT INTO plano_subscricao_empresas ( ativo, plano_subscricao_id, empresa_id) VALUES
( 1, 1 , 1),
( 1, 2 , 2);



-- Inserir os departamentos
INSERT INTO departamentos (empresa_id, nome) VALUES
(1,'Manutenção de Jardins'),
(2,'Paisagismo');


INSERT INTO equipas (empresa_id, nome,  ativo, criado_por_id, departamento_id,cor_equipa) VALUES
(1, 'Equipa de Vendas A',  1, 1, 1,'#FF5733'),
(1, 'Equipa de Marketing A',  1, 1, 1, '#FF5732'),
(1, 'Equipa de RH A',  1, 1, 1, '#FF5731'),
(1, 'Equipa de TI A',  1, 1, 1, '#FF5730'),
(1, 'Equipa Financeira A',  1, 1, 1, '#FF5734');

INSERT INTO funcionarios (empresa_id, equipa_id, numero_mecanografico, nome_completo, email, contacto, morada, cod_postal, localidade, cargo, ativo, departamento_id, criado_por_id) VALUES
(1, 1, 1001, 'Wilson Ferreira', 'funcionario1@example.com', 123456789, 'Rua A, 123', '1235-678', 'Cidade A', 'Vendedor', 1, 1, 1),
(1, 2, 1002, 'Diogo Costa', 'funcionario2@example.com', 987654321, 'Avenida B, 456', '5321-876', 'Cidade B', 'Marketeer', 1, 1, 1),
(1, 2, 1002, 'funcionario3', 'funcionario3@example.com', 987644321, 'Avenida B, 456', '5321-876', 'Cidade B', 'Marketeer', 1, 1, 1),
(1, 2, 1002, 'funcionario4', 'funcionario4@example.com', 987633321, 'Avenida B, 456', '5321-876', 'Cidade B', 'Marketeer', 1, 1, 1),
(1, 2, 1002, 'funcionario5', 'funcionario5@example.com', 987622321, 'Avenida B, 456', '5321-876', 'Cidade B', 'Marketeer', 1, 1, 1);

-- Inserir os clientes
INSERT INTO clientes (empresa_id,nome_completo, nif, email, contacto, morada, cod_postal, localidade, ativo) VALUES
(1,'João Silva', 123456789, 'joao@example.com', 912345678, 'Rua das Flores, 123', '1234-567', 'Lisboa', 1),
(1,'Maria Santos', 987654321, 'maria@example.com', 987654321, 'Avenida Principal, 456', '9876-543', 'Porto', 1),
(1,'Pedro Costa', 456789123, 'pedro@example.com', 923456789, 'Rua das Oliveiras, 789', '4567-890', 'Faro', 1),
(1,'Ana Oliveira', 789123456, 'ana@example.com', 934567890, 'Travessa das Rosas, 234', '2345-678', 'Coimbra', 1),
(1,'Carlos Pereira', 654321987, 'carlos@example.com', 945678901, 'Avenida das Árvores, 567', '8765-432', 'Braga', 1);


INSERT INTO conta_utilizadores (funcionario_id, email, password, tipo_utilizador, ativo, reset) 
VALUES 
( 1, 'chefequipa@a.pt', '$2b$10$bXGHRVy4GtFBVvLcJ8Nti.M6smycbROh23YHNvA8KQwgOkChSECE.', 'nivel2', 1, 0),
( 2, 'supervisor@a.pt', '$2b$10$bXGHRVy4GtFBVvLcJ8Nti.M6smycbROh23YHNvA8KQwgOkChSECE.', 'nivel3', 1, 0),
( 3, 'diretor@a.pt','$2b$10$bXGHRVy4GtFBVvLcJ8Nti.M6smycbROh23YHNvA8KQwgOkChSECE.', 'nivel4', 1, 0 ),
( 4, 'admin@a.pt','$2b$10$bXGHRVy4GtFBVvLcJ8Nti.M6smycbROh23YHNvA8KQwgOkChSECE.', 'nivel5', 1, 0 );



-- Inserir os serviços
INSERT INTO servicos (empresa_id, tipo_servico_id, nome, descricao, ativo, preco_hora, tempo_estimado, tipo_tempo_estimado, criado_por_id) VALUES
(1, 1, 'Manutenção de Jardim Residencial', 'Serviço de manutenção de jardim para residências.', 1, 25.00, 2, 'horas',   1),
(1, 2, 'Paisagismo de Quintal', 'Transformação do quintal em um espaço paisagístico agradável.', 1, 50.00, 4, 'dias',   1),
(1, 3, 'Podagem de Árvores Ornamentais', 'Podagem e cuidado de árvores ornamentais.', 1, 30.00, 3, 'horas',   2),
(1, 4, 'Controle de Pragas em Jardins', 'Serviço de controle de pragas em jardins.', 1, 40.00, 1, 'dia',   2),
(1, 5, 'Instalação de Sistema de Irrigação', 'Instalação de sistema de irrigação automática para jardins.', 1, 60.00, 8, 'horas',   1);

-- Inserir os registros
INSERT INTO equipas_has_servicos (equipa_id, servico_id, nivel_experiencia) VALUES
(1, 1, 0),
(2, 2, 0),
(3, 3, 0),
(4, 4, 0),
(5, 5, 0);

-- Inserir os contratos
INSERT INTO contratos (cliente_id, nome, morada_servico, cod_postal_servico, localidade_servico, data_inicio, data_fim, descricao, ativo, tipo_contrato, criado_por_id ) VALUES
(1, 'Contrato de Manutenção Mensal', 'Rua das Flores, 123', '1234-567', 'Lisboa', '2024-04-01', '2024-12-31', 'Contrato para prestação de serviços de manutenção mensal de jardim.', 1, 'Mensal', 1),
(2, 'Contrato de Paisagismo Anual', 'Avenida Principal, 456', '9876-543', 'Porto', '2024-03-01', '2025-02-28', 'Contrato para realização de paisagismo ao longo do ano.', 1, 'Anual', 2),
(3, 'Contrato de Podagem Trimestral', 'Rua das Oliveiras, 789', '4567-890', 'Faro', '2024-05-01', '2024-12-31', 'Contrato para podagem trimestral de árvores.', 1, 'Trimestral', 1),
(4, 'Contrato de Controle de Pragas Semestral', 'Travessa das Rosas, 234', '2345-678', 'Coimbra', '2024-04-01', '2024-09-30', 'Contrato para controle de pragas semestral em jardins.', 1, 'Semestral', 1),
(5, 'Contrato de Instalação de Irrigação Automática', 'Avenida das Árvores, 567', '8765-432', 'Braga', '2024-05-01', '2024-12-31', 'Contrato para instalação de sistema de irrigação automática.', 1, 'Anual', 1),
(1, 'Contrato de Manutenção Semanal', 'Rua das Flores, 123', '1234-567', 'Lisboa', '2024-04-01', '2024-12-31', 'Contrato para prestação de serviços de manutenção semanal de jardim.', 1, 'Semanal', 1),
(2, 'Contrato de Paisagismo Único', 'Avenida Principal, 456', '9876-543', 'Porto', '2024-03-01', '2025-02-28', 'Contrato para realização de paisagismo único.', 1, 'Único', 2),
(3, 'Contrato de Podagem Mensal', 'Rua das Oliveiras, 789', '4567-890', 'Faro', '2024-05-01', '2024-12-31', 'Contrato para podagem mensal de árvores.', 1, 'Mensal', 1),
(4, 'Contrato de Controle de Pragas Bimestral', 'Travessa das Rosas, 234', '2345-678', 'Coimbra', '2024-04-01', '2024-09-30', 'Contrato para controle de pragas bimestral em jardins.', 1, 'Bimestral', 1),
(5, 'Contrato de Instalação de Irrigação Único', 'Avenida das Árvores, 567', '8765-432', 'Braga', '2024-05-01', '2024-12-31', 'Contrato para instalação de sistema de irrigação único.', 1, 'Único', 1);


-- Inserir os registros
INSERT INTO contratos_has_servicos (servico_id, contrato_id, prioritario, data_contratacao) VALUES
(1, 1, 'Sim',  '2024-01-15'),
(2, 2, 'Não',  '2024-02-20'),
(3, 3, 'Sim',  '2024-03-10'),
(4, 4, 'Não', '2024-04-05'),
(5, 5, 'Sim',  '2024-05-10');





-- Inserir os registros
INSERT INTO servicos_has_tarefas (servico_id, tarefa, criado_por_id) VALUES
(1, 'Corte de grama', 1),
(2, 'Desenho do projeto', 2),
(3, 'Podar árvores', 1),
(4, 'Inspeção de pragas', 1),
(5, 'Instalação de sistema de irrigação', 1);



INSERT INTO responsavel_departamento (departamento_id, funcionario_id) VALUES
(1, 2);



-- Inserir os registros
INSERT INTO chefe_equipa (funcionario_id, equipa_id) VALUES
(1, 1);
