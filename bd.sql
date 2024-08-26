DROP TABLE IF EXISTS notas_visitas CASCADE ;
DROP TABLE IF EXISTS anomalias_visita CASCADE    ;
DROP TABLE IF EXISTS tarefas_servicos_visita CASCADE  ;
DROP TABLE IF EXISTS chefe_equipa CASCADE  ;
DROP TABLE IF EXISTS responsavel_departamento CASCADE ;
DROP TABLE IF EXISTS servicos_has_tarefas CASCADE  ;
DROP TABLE IF EXISTS equipamentos_manutencao CASCADE ;
DROP TABLE IF EXISTS historico_equipamentos CASCADE ;
DROP TABLE IF EXISTS visitas CASCADE  ;
DROP TABLE IF EXISTS agenda_servicos CASCADE   ;
DROP TABLE IF EXISTS equipamentos_necessarios CASCADE ;
DROP TABLE IF EXISTS contratos_has_servicos CASCADE ;
DROP TABLE IF EXISTS contratos CASCADE ;
DROP TABLE IF EXISTS equipamentos_has_servicos CASCADE ;
DROP TABLE IF EXISTS equipas_has_equipamentos CASCADE ;
DROP TABLE IF EXISTS equipas_has_servicos CASCADE ;
DROP TABLE IF EXISTS equipamentos CASCADE ;
DROP TABLE IF EXISTS tipo_equipamentos CASCADE ;
DROP TABLE IF EXISTS servicos CASCADE ;
DROP TABLE IF EXISTS conta_utilizadores CASCADE  ;
DROP TABLE IF EXISTS clientes CASCADE ;
DROP TABLE IF EXISTS funcionarios CASCADE ;
DROP TABLE IF EXISTS equipas CASCADE ;
DROP TABLE IF EXISTS departamentos CASCADE ;
DROP TABLE IF EXISTS plano_subscricao_empresas CASCADE   ;
DROP TABLE IF EXISTS empresas CASCADE ;
DROP TABLE IF EXISTS plano_subscricao CASCADE ;
DROP TABLE IF EXISTS tipo_servicos CASCADE ;


-- -----------------------------------------------------
-- Table tipo_servicos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tipo_servicos (
  tipo_servico_id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL
  );


-- -----------------------------------------------------
-- Table plano_subscricao
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS plano_subscricao (
  plano_subscricao_id SERIAL PRIMARY KEY,
  tipo_plano TEXT NOT NULL,
  limite_equipas INT NOT NULL,
  limite_servicos INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo SMALLINT NOT NULL
);


-----------------------------------------------------


-- -----------------------------------------------------
-- Table empresas
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS empresas (
  empresa_id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  nif VARCHAR(9) NOT NULL,
  email TEXT NOT NULL,
  contacto INT NOT NULL,
  morada TEXT NOT NULL,
  cod_postal VARCHAR(8) NOT NULL,
  localidade TEXT NOT NULL,
  ramo_atividade TEXT NOT NULL,
  data_adesao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  logo_empresa TEXT
);



-- -----------------------------------------------------
-- Table plano_subscricao
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS plano_subscricao_empresas (
  plano_subscricao_empresa_id SERIAL PRIMARY KEY,
  data_subscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo SMALLINT NOT NULL,
  plano_subscricao_id INTEGER REFERENCES plano_subscricao (plano_subscricao_id),
  empresa_id INTEGER UNIQUE REFERENCES empresas (empresa_id) 
  );




-- -----------------------------------------------------
-- Table departamentos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS departamentos (
  departamento_id SERIAL PRIMARY KEY,
  empresa_id INTEGER REFERENCES empresas (empresa_id),
  nome TEXT NOT NULL
  );


-- -----------------------------------------------------
-- Table equipas
-- -----------------------------------------------------


  CREATE TABLE IF NOT EXISTS equipas (
    equipa_id SERIAL PRIMARY KEY,
    empresa_id INTEGER REFERENCES empresas (empresa_id),
    nome TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo SMALLINT NOT NULL,
    criado_por_id INT NOT NULL,
    departamento_id INTEGER REFERENCES departamentos (departamento_id),
    cor_equipa TEXT UNIQUE 
    );


-- -----------------------------------------------------
-- Table funcionarios
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS funcionarios (
  funcionario_id SERIAL PRIMARY KEY,
  empresa_id INTEGER REFERENCES empresas (empresa_id),
  equipa_id INTEGER REFERENCES equipas (equipa_id),
  numero_mecanografico INT NOT NULL,
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  contacto INT NOT NULL,
  morada TEXT NOT NULL,
  cod_postal VARCHAR(8) NOT NULL,
  localidade TEXT NOT NULL,
  cargo TEXT NOT NULL,
  ativo SMALLINT NOT NULL,
  departamento_id INTEGER REFERENCES departamentos (departamento_id),
  criado_por_id INT NOT NULL
  );



-- -----------------------------------------------------
-- Table clientes
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS clientes (
  cliente_id SERIAL PRIMARY KEY,
  empresa_id INTEGER REFERENCES empresas (empresa_id),
  nome_completo TEXT NOT NULL,
  nif INT NOT NULL,
  email TEXT NOT NULL,
  contacto INT NOT NULL,
  morada TEXT NOT NULL,
  cod_postal VARCHAR(8) NOT NULL,
  localidade TEXT NOT NULL,
  ativo SMALLINT NOT NULL
  );



-- -----------------------------------------------------
-- Table conta_utilizadores
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS conta_utilizadores (
  conta_utilizador_id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes (cliente_id),
  funcionario_id INTEGER REFERENCES funcionarios (funcionario_id),
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  tipo_utilizador TEXT CHECK (tipo_utilizador IN ('nivel1', 'nivel2', 'nivel3', 'nivel4', 'nivel5')) NOT NULL,
  ativo SMALLINT NOT NULL,
  reset SMALLINT,
  criado_por_id INTEGER REFERENCES conta_utilizadores (conta_utilizador_id),
  notification TEXT
  );




  

-- -----------------------------------------------------
-- Table servicos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS servicos (
  servico_id SERIAL PRIMARY KEY,
  empresa_id INTEGER REFERENCES empresas (empresa_id),
  tipo_servico_id INTEGER REFERENCES tipo_servicos (tipo_servico_id),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  ativo SMALLINT NOT NULL,
  preco_hora DECIMAL,
  tempo_estimado INT,
  tipo_tempo_estimado TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultima_atualizacao TIMESTAMP,
  criado_por_id INTEGER REFERENCES conta_utilizadores (conta_utilizador_id)
  );


-- -----------------------------------------------------
-- Table tipo_equipamentos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS tipo_equipamentos (
  tipo_equipamento_id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL
);



-- -----------------------------------------------------
-- Table equipamentos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS equipamentos (
  equipamento_id SERIAL PRIMARY KEY,
  tipo_equipamento_id INTEGER REFERENCES tipo_equipamentos (tipo_equipamento_id),
  nome INT NOT NULL,
  data_aquisicao DATE,
  descricao TEXT NOT NULL,
  estado TEXT NOT NULL,
  nrserie TEXT NOT NULL,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  responsavel TEXT,
  ativo SMALLINT NOT NULL
  ); 



-- -----------------------------------------------------
-- Table equipas_has_servicos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS equipas_has_servicos (
  equipa_id INTEGER REFERENCES equipas (equipa_id),
  servico_id INTEGER REFERENCES servicos (servico_id),
  nivel_experiencia INT NOT NULL DEFAULT 0
 );



-- -----------------------------------------------------
-- Table equipas_has_equipamentos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS equipas_has_equipamentos (
  equipa_id INTEGER REFERENCES equipas (equipa_id),
  equipamento_id INTEGER REFERENCES equipamentos (equipamento_id),
  data DATE NOT NULL,
  ativo SMALLINT NOT NULL
 );



-- -----------------------------------------------------
-- Table equipamentos_has_servicos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS equipamentos_has_servicos (
  equipamento_id INTEGER REFERENCES equipamentos (equipamento_id),
  servico_id INTEGER REFERENCES servicos (servico_id),
  data DATE NOT NULL,
  ativo SMALLINT NOT NULL
  );



-- -----------------------------------------------------
-- Table contratos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS contratos (
  contrato_id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes (cliente_id),
  nome TEXT NOT NULL,
  morada_servico TEXT NOT NULL,
  cod_postal_servico VARCHAR(8) NOT NULL,
  localidade_servico TEXT NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  descricao TEXT NOT NULL,
  ativo SMALLINT NOT NULL,
  tipo_contrato TEXT NOT NULL,
  criado_por_id INTEGER REFERENCES conta_utilizadores (conta_utilizador_id),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );



-- -----------------------------------------------------
-- Table contratos_has_servicos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS contratos_has_servicos (
  servico_id INTEGER REFERENCES servicos (servico_id),
  contrato_id INTEGER REFERENCES contratos (contrato_id),
  prioritario TEXT,
  data_contratacao DATE NOT NULL
  );



-- -----------------------------------------------------
-- Table equipamentos_necessarios
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS equipamentos_necessarios (
  equipamento_id INTEGER REFERENCES equipamentos (equipamento_id),
  contrato_id INTEGER REFERENCES contratos (contrato_id)
  );



-- -----------------------------------------------------
-- Table agenda_servicos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS agenda_servicos (
  agenda_servico_id SERIAL PRIMARY KEY,
  empresa_id INTEGER REFERENCES empresas (empresa_id),
  equipa_id INTEGER REFERENCES equipas (equipa_id),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo SMALLINT NOT NULL,
  criado_por_id INTEGER REFERENCES conta_utilizadores (conta_utilizador_id),
  aprovado_por_id INTEGER REFERENCES conta_utilizadores (conta_utilizador_id)
  );



-- -----------------------------------------------------
-- Table visitas
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS visitas (
  visita_id SERIAL PRIMARY KEY,
  contrato_id INTEGER REFERENCES contratos (contrato_id),
  agenda_servico_id INTEGER REFERENCES agenda_servicos (agenda_servico_id),
  tipo_marcacao INT,
  data_visita DATE NOT NULL,
  hora_visita_inicio TIME,
  hora_visita_fim TIME,
  estado_servico TEXT CHECK (estado_servico IN ('agendada', 'terminada', 'cancelada', 'em andamento', 'pendente', 'a aguardar', 'nao aprovada')) NOT NULL,
  inicio_visita TIMESTAMP,
  fim_visita TIMESTAMP,
  iniciado_por_id INTEGER REFERENCES conta_utilizadores (conta_utilizador_id)
  );

  -- -----------------------------------------------------
-- Table notas_visitas
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS notas_visitas (
  notas_id SERIAL PRIMARY KEY,
  visita_id INTEGER REFERENCES visitas (visita_id),
  nota TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  criado_por_id INT NOT NULL
  );




-- -----------------------------------------------------
-- Table historico_equipamentos
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS historico_equipamentos (
  equipamento_id INTEGER REFERENCES equipamentos (equipamento_id),
  visita_id INTEGER REFERENCES visitas (visita_id),
  incidentes TEXT NOT NULL,
  observacoes TEXT NOT NULL,
  horas_funcionamento INT NOT NULL
  );




-- -----------------------------------------------------
-- Table equipamentos_manutencao
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS equipamentos_manutencao (
  equipamentos_manutencao_id SERIAL PRIMARY KEY,
  equipamento_id INTEGER REFERENCES equipamentos (equipamento_id),
  data DATE NOT NULL,
  descricao TEXT NOT NULL,
  custo DECIMAL,
  observacao TEXT,
  responsavel TEXT NOT NULL
  );



-- -----------------------------------------------------
-- Table servicos_has_tarefas
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS servicos_has_tarefas (
  servico_has_tarefas_id SERIAL PRIMARY KEY,
  servico_id INTEGER REFERENCES servicos (servico_id),
  tarefa TEXT NOT NULL,
  criado_por_id INTEGER REFERENCES conta_utilizadores (conta_utilizador_id),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );


-- -----------------------------------------------------
-- Table responsavel_departamento
-- -----------------------------------------------------



CREATE TABLE IF NOT EXISTS responsavel_departamento (
  departamento_id INTEGER UNIQUE REFERENCES departamentos (departamento_id),
  funcionario_id INTEGER UNIQUE REFERENCES funcionarios (funcionario_id)
);




-- -----------------------------------------------------
-- Table chef_equipa
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS chefe_equipa (
  funcionario_id INTEGER REFERENCES funcionarios (funcionario_id),
  equipa_id INTEGER REFERENCES equipas (equipa_id)
  );



-- -----------------------------------------------------
-- Table tarefas_servicos_visita
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS tarefas_servicos_visita (
  tarefa_servico_visita_id SERIAL PRIMARY KEY,
  visita_id INTEGER REFERENCES visitas (visita_id),
  tarefa TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado TEXT CHECK (estado IN ('em andamento', 'concluido')) NOT NULL
  );



-- -----------------------------------------------------
-- Table anomalias_visita
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS anomalias_visita (
  anomalia_visita_id SERIAL PRIMARY KEY,
  visita_id INTEGER REFERENCES visitas (visita_id),
  anomalia TEXT NOT NULL,
  fotografia TEXT NULL,
  estado TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  criado_por_id INT REFERENCES conta_utilizadores (conta_utilizador_id)
  );

