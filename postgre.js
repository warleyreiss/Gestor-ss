CREATE TABLE IF NOT EXISTS insumos
    (
        id serial NOT NULL,
        item text NOT NULL,
        tipo text NOT NULL,
        valor  numeric(8, 2) NOT NULL,
        PRIMARY KEY(id)
    );
    CREATE TABLE IF NOT EXISTS contratos
    (
        id serial NOT NULL,
        nome text NOT NULL UNIQUE,
        cnpj text NOT NULL,
        endereco text  NOT NULL,
        responsavel text NOT NULL,
        telefone text  NOT NULL,
        email text NOT NULL,
        irpj  numeric(8, 2) NOT NULL,
        pis  numeric(8, 2) NOT NULL,
        cofis  numeric(8, 2) NOT NULL,
        csl  numeric(8, 2) NOT NULL,
        ibpt  text NOT NULL,
        status text NOT NULL  DEFAULT '1',
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id)
    );

CREATE TABLE IF NOT EXISTS clientes
    (
        id serial NOT NULL,
        contrato_id integer NOT NULL,
        nome text NOT NULL, 
        cnpj text NOT NULL,
        responsavel text NOT NULL,
        telefone text  NOT NULL,
        email text NOT NULL,
        responsavel2 text NULL,
        telefone2 text  NULL,
        email2 text NULL,
        responsavel3 text NULL,
        telefone3 text  NULL,
        email3 text NULL,
        endereco text  NOT NULL,
        gps text  NOT NULL,
        distancia integer NOT NULL,
        valor_iss    numeric(8, 2) NOT NULL,
        valor_hora  numeric(8, 2) NOT NULL,
        valor_atendimento_frustado  numeric(8, 2) NOT NULL,
        valor_ociosidade  numeric(8, 2) NOT NULL,
        valor_violacao  numeric(8, 2) NOT NULL,
        valor_km numeric(8, 2) NOT NULL,
        valor_hospedagem numeric(8, 2) NOT NULL,
        valor_alimentacao numeric(8, 2) NOT NULL,
        valor_instalacao_leve numeric(8, 2) NOT NULL,
        valor_remocao_leve numeric(8, 2) NOT NULL,
        valor_substituicao_leve numeric(8, 2) NOT NULL,
        valor_instalacao_pesada numeric(8, 2) NOT NULL,
        valor_remocao_pesada numeric(8, 2) NOT NULL,
        valor_substituicao_pesada numeric(8, 2) NOT NULL,
        status text NOT NULL  DEFAULT '1',
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(contrato_id) REFERENCES contratos(id)
    );



CREATE TABLE IF NOT EXISTS usuarios
    (
        id serial NOT NULL,
        tipo text NOT NULL,
        setor text NOT NULL,
        cliente_id integer NOT NULL,
        nome text NOT NULL,
        email text NOT NULL UNIQUE,
        senha text NOT NULL  DEFAULT '$2b$12$1LSZOhhI2UkLEQZYn48ZSOBdh9vVoK4K2jYkrRRjI/9PydJRSWh2S',
        imagem text  NULL,
        status text NOT NULL  DEFAULT 1,
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id)
    );
    CREATE TABLE IF NOT EXISTS frota_internas
    (
        id serial NOT NULL,
        placa text NOT NULL,
        frota text NOT NULL,
        usuario_id integer NULL,
        status text NOT NULL  DEFAULT 1,
        PRIMARY KEY(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    );

CREATE TABLE IF NOT EXISTS veiculos
    (
        id serial NOT NULL,
        tipo text NOT NULL,
        placa text NOT NULL UNIQUE,
        frota text NOT NULL,
        cliente_id integer NOT NULL,
        status text NOT NULL  DEFAULT 1,
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id)
    );

CREATE TABLE IF NOT EXISTS equipamentos
    (
        id serial NOT NULL,
        numero_serie text NOT NULL,
        identificador text NOT NULL,
        tipo text NOT NULL,
        usuario_id integer NOT NULL,
        cliente_id integer NOT NULL,
        status text NOT NULL  DEFAULT '1',
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)

    );


CREATE TABLE IF NOT EXISTS movimento_equipamentos
    (
        id serial NOT NULL,
        equipamento_id integer NOT NULL,
        cliente_id_saiu integer NOT NULL,
        usuario_id_saiu integer NOT NULL,
        cliente_id_entrou integer NOT NULL,
        usuario_id_entrou integer NOT NULL,
        motivo text NOT NULL,
        chamado text NULL,
        status text NOT NULL  DEFAULT '1',
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(equipamento_id) REFERENCES equipamentos(id),
        FOREIGN KEY(cliente_id_saiu) REFERENCES clientes(id),
        FOREIGN KEY(cliente_id_entrou) REFERENCES clientes(id),
        FOREIGN KEY(usuario_id_saiu) REFERENCES usuarios(id),
        FOREIGN KEY(usuario_id_entrou) REFERENCES usuarios(id)

    );

CREATE TABLE IF NOT EXISTS servicos
    (
        id serial NOT NULL,
        chamado text NOT NULL,
        inicio date NOT NULL,
        termino date NOT NULL,
        turno text NOT NULL,
        usuario_id  integer ARRAY NOT NULL,
        cliente_id integer NOT NULL,
        motivo_cancelamento text NULL,
        data_finalizado date NULL,
        status text NOT NULL  DEFAULT '1',
        observacao text NULL,
        km text NOT NULL,
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id)
    );
CREATE TABLE IF NOT EXISTS ordem_servicos
    (
        id serial NOT NULL,
        crypt_id text NULL,
        servico_id integer NOT NULL,
        usuario_id integer NOT NULL,
        veiculo_id integer NOT NULL,
        tipo text NOT NULL,
        produto text NOT NULL,
        inicio timestamp NULL,
        termino timestamp NULL,
        duracao time NULL,
        atendimento text NULL,
        motivo_nao_atendimento text NULL,
        material_usado integer ARRAY NULL,
        material_retirado integer ARRAY NULL,
        periferico text ARRAY NULL, 
        efeito_falha text NULL,
        causa_falha text NULL,
        deteccao_falha text NULL,
        responsavel_falha text NULL,
        solucao text ARRAY NULL,
        violacao text NULL,
        danos text NULL,
        descricao_violacao text NULL,
        veiculo_remocao_id text NULL,
        assinatura text NULL,
        observacao text NULL,
        status text NOT NULL  DEFAULT '1',
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(servico_id) REFERENCES servicos(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY(veiculo_id) REFERENCES veiculos(id)
    );

CREATE TABLE IF NOT EXISTS equipamento_descartados
    (
        id serial NOT NULL,
        equipamento_id integer NOT NULL,
        identificador text NOT NULL,
        numero_serie text NOT NULL,
        motivo text NOT NULL,
        justificativa text NOT NULL,
        usuario_id integer NOT NULL,
        status text NOT NULL  DEFAULT '1',
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(equipamento_id) REFERENCES equipamentos(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    );

CREATE TABLE IF NOT EXISTS avaliacao_atendimentos
    (
        id serial NOT NULL,
        servico_id integer NOT NULL,
        entrevistado text NOT NULL,
        pergunta1 text NOT NULL,
        pergunta2 text NULL,
        pergunta3 text  NULL,
        pergunta4 text  NULL,
        pergunta5 text  NULL,
        sugestao_reclamacao text NULL,
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(servico_id) REFERENCES servicos(id)
    );

CREATE TABLE IF NOT EXISTS registro_fotograficos
    (
        id serial NOT NULL,
        ordem_servico_id integer NOT NULL,
        diretorio text NOT NULL,
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(ordem_servico_id) REFERENCES ordem_servicos(id)
    );

CREATE TABLE IF NOT EXISTS faturamentos
    (
        id serial NOT NULL,
        servico_id integer NULL,
        usuario_id integer NOT NULL,
        ordem_servico_id integer NULL,
        visita_id integer NULL,
        cliente_id integer NOT NULL,
        chamado_id integer NULL,
        tipo text NOT NULL,
        setor text NOT NULL,
        quantidade integer NOT NULL,
        unidade text NOT NULL,
        descricao text NOT NULL,
        valor numeric(8, 2) NOT NULL,
        observacao text NULL,
        data_liberacao timestamp NULL,
        data_faturamento timestamp NULL,
        status text NOT NULL  DEFAULT '1',
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        cancelado text NULL,
        retorno text NULL DEFAULT 'false',
        PRIMARY KEY(id),
        FOREIGN KEY(servico_id) REFERENCES servicos(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id)
    );

CREATE TABLE IF NOT EXISTS atendimento_chamados
    (
        id serial NOT NULL,
        usuario_id integer NOT NULL,
        cliente_id integer NOT NULL,
        chamado text NULL,
        situacao text NULL,
        equipamento_id text ARRAY NULL,
        insumo_desc text ARRAY NULL,
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id)
    );

CREATE TABLE IF NOT EXISTS dano_equipamentos
    (
        id serial NOT NULL,
        usuario_id integer NOT NULL,
        servico_id integer NULL,
        ordem_servico_id integer NOT NULL,
        equipamento_id integer NOT NULL,
        cliente_id integer NULL,
        valor_dano  numeric(8, 2) NULL,
        diagnostico text NULL,
        data_diagnostico timestamp NULL,
        usuario_id_diagnostico text NULL,
        status text NOT NULL  DEFAULT '1',
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(servico_id) REFERENCES servicos(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id),
        FOREIGN KEY(equipamento_id) REFERENCES equipamentos(id),
        FOREIGN KEY(ordem_servico_id) REFERENCES ordem_servicos(id)
    );
	
    CREATE TABLE IF NOT EXISTS faturamento_gerados
    (
        id serial NOT NULL,
        cliente_id integer NOT NULL,
        faturamento_id integer ARRAY NOT NULL,
        data_finalizado timestamp NULL,
        status text NOT NULL  DEFAULT '1',
        motivo_cancelamento text NULL,
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id)

    );
CREATE TABLE IF NOT EXISTS movimento_faturamentos
    (
        id serial NOT NULL,
        usuario_id integer NOT NULL,
        faturamento_id integer NOT NULL,
        motivo text NOT NULL,
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY(faturamento_id) REFERENCES faturamentos(id)

    );

CREATE TABLE IF NOT EXISTS visitas
    (
        id serial NOT NULL,
        servico_id integer NOT NULL,
        usuario_id integer NOT NULL,
        cliente_id integer NULL,
        inicio timestamp NOT NULL,
        termino timestamp NULL,
        duracao time NULL,
        turno text NOT NULL,
        hora_base time NULL,
        excedente time NULL,
        hospedagem text NULL,
        alimentacao text NULL,
        distancia text NULL,
        veiculo text  NULL,
        ajuste text  NULL,
        justificativa text NULL,
        status text NOT NULL  DEFAULT '1',
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(servico_id) REFERENCES servicos(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    );

    CREATE TABLE IF NOT EXISTS ociosidade
    (
        id serial NOT NULL,
        servico_id integer NOT NULL,
        cliente_id integer NULL,
        usuario_id integer NOT NULL,
        visita_id integer NULL,
        inicio timestamp NULL, 
        motivo text NULL,
        termino timestamp NULL,
        duracao timestamp NULL,
        status text NOT NULL  DEFAULT '1',
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(servico_id) REFERENCES servicos(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY(visita_id) REFERENCES visitas(id)
    );


    CREATE TABLE IF NOT EXISTS movimento_insumos
    (
        id serial NOT NULL,
        chamado_id text NOT NULL,
        insumo_id integer NOT NULL,
        quantidade integer NOT NULL,
        usuario_id integer NOT NULL,
        cliente_id integer NOT NULL,
        situacao text NOT NULL,
        data_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id),
        FOREIGN KEY(insumo_id) REFERENCES insumos(id)
    );
    CREATE TABLE IF NOT EXISTS movimento_frota_internas
    (
        id serial NOT NULL,
        frota_interna_id integer NOT NULL,
        usuario_id integer NOT NULL,
        assinatura text NULL,
        km_atual text NOT NULL,
        farol_baixo text NOT NULL,
        farol_alto text NOT NULL,
        farolete_dianteiro text NOT NULL,
        farolete_traseiro text NOT NULL,
        luz_seta text NOT NULL,
        luz_freio text NOT NULL,
        luz_re text NOT NULL,
        freio_mao text NOT NULL,
        oleo_motor text NOT NULL,
        oleo_motor_validade text NOT NULL,
        liq_arrefecimento text NOT NULL,
        oleo_freio text NOT NULL,
        retrovisor  text NOT NULL,
        plotagem text NOT NULL,
        limpeza_interna text NOT NULL,
        limpeza_externa text NOT NULL,
        limpeza_banco text NOT NULL,
        alarme text NOT NULL,
        buzina text NOT NULL,
        pneus text NOT NULL,
        rodas text NOT NULL,
        estepe text NOT NULL,
        vidro text NOT NULL,
        palheta text NOT NULL,
        tag_pedagio text NOT NULL,
        observacao text NOT NULL,
        imagem text NOT NULL,
        tipo text NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(frota_interna_id) REFERENCES frota_internas(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)

    );
    ALTER TABLE movimento_frota_internas
    ADD CONSTRAINT movimento_frota_internas_frota_interna_id_fkey FOREIGN KEY (frota_interna_id) REFERENCES frota_internas(id) 
    ON DELETE CASCADE ON UPDATE CASCADE;

    ALTER TABLE movimento_frota_internas
    ADD CONSTRAINT movimento_frota_internas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
    ON DELETE CASCADE ON UPDATE CASCADE;
    
    CREATE TABLE IF NOT EXISTS abastecimento_frota_internas
    (
        id serial NOT NULL,
        frota_interna_id integer NOT NULL,
        usuario_id integer NOT NULL,
        km_atual text NOT NULL,
        km_anterior text NOT NULL,
        tipo_combustivel text NOT NULL,
        quantidade integer NOT NULL,
        valor  numeric(8, 2) NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(frota_interna_id) REFERENCES frota_internas(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)

    );
    CREATE TABLE IF NOT EXISTS manutencao_frota_internas
    (
        id serial NOT NULL,
        frota_interna_id integer NOT NULL,
        usuario_id integer NOT NULL,
        kmAtual text NOT NULL,
        tipoServico text NOT NULL,
        valor  numeric(8, 2) NOT NULL,
        observacao text NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(frota_interna_id) REFERENCES frota_internas(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    );

    CREATE TABLE IF NOT EXISTS hardware_servicos
    (
        id serial NOT NULL,
        usuario_id integer NOT NULL,
        cliente_id integer NOT NULL,
        aceito timestamp NULL,
        iniciado timestamp NULL ,
        concluido timestamp NULL,
        status text NULL, // 1-pendente aceite, 2-aceito, 3-iniciado, 4-concluido
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY(cliente_id) REFERENCES clientes(id)
    );

    ALTER TABLE hardware_servicos
    ADD CONSTRAINT hardware_servicos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
    ON DELETE CASCADE ON UPDATE CASCADE;
    
    ALTER TABLE hardware_servicos
    ADD CONSTRAINT hardware_servicos_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES clientes(id) 
    ON DELETE CASCADE ON UPDATE CASCADE;
    
    CREATE TABLE IF NOT EXISTS hardware_ordem_servicos
    (
        id serial NOT NULL,
        hardware_servicos_id integer NOT NULL,
        usuario_id integer NOT NULL,
        equipamento_id integer NOT NULL,
        inicio_inspecao timestamp,
        termino_inspecao timestamp,
        inicio_manutencao timestamp,
        termino_manutenção timestamp,
        observacao_inspecao TEXT NULL,
        observacao_manutencao TEXT NULL,
        status text NULL, 
        hardware_custo_servico_id text NULL,
        hardware_custo_servico_desc text NULL
        usuario_id_manutencao integer NULL,
        usuario_id_inspecao integer NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY( hardware_servicos_id) REFERENCES  hardware_servicos(id),
        FOREIGN KEY(equipamento_id) REFERENCES  equipamentos(id),
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    );
     
    ALTER TABLE hardware_ordem_servicos
    ADD CONSTRAINT hardware_ordem_servicos_hardware_servicos_id_fkey FOREIGN KEY (hardware_servicos_id) REFERENCES hardware_servicos(id) 
    ON DELETE CASCADE ON UPDATE CASCADE;

    ALTER TABLE financial.hardware_ordem_servicos ADD equipamento_id integer NOT NULL;
    ALTER TABLE hardware_ordem_servicos
    ADD CONSTRAINT hardware_ordem_servicos_equipamento_id_fkey FOREIGN KEY (equipamento_id) REFERENCES equipamentos(id) 
    ON DELETE CASCADE ON UPDATE CASCADE;

    ALTER TABLE hardware_ordem_servicos
    ADD CONSTRAINT hardware_ordem_servicos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
    ON DELETE CASCADE ON UPDATE CASCADE;

   /* DROPS___________________________________________________________________*/
    DROP table atendimento_chamados CASCADE;
    
    DROP table avaliacao_atendimentos CASCADE;
    
    DROP table clientes CASCADE; 
    
    DROP table contratos CASCADE;
    
    DROP table dano_equipamentos CASCADE;
    
    DROP table  equipamento_descartados CASCADE;
    
    DROP table equipamentos CASCADE;
    
    DROP table faturamento_gerados CASCADE;
    
    DROP table faturamentos CASCADE;

    DROP table frota_internas CASCADE;
    
    DROP table insumos CASCADE;
    
    DROP table movimento_equipamentos CASCADE;
    
    DROP table movimento_faturamentos CASCADE;

    DROP table ociosidade CASCADE;

    DROP table ordem_servicos CASCADE;

    DROP table registro_fotograficos CASCADE;

    DROP table servicos CASCADE;

    DROP table usuarios CASCADE;

    DROP table veiculos CASCADE;

    DROP table visitas CASCADE;
    DROP table movimento_insumos CASCADE;

    /*CLEAR________________________________________________________________ */
    DELETE FROM atendimento_chamados;
    
    DELETE FROM  avaliacao_atendimentos;
    
    DELETE FROM clientes; 
    
    DELETE FROM  contratos;
    
    DELETE FROM dano_equipamentos;
    
    TRUNCATE TABLE   equipamento_descartados;
    
    TRUNCATE TABLE  equipamentos;
    
    TRUNCATE TABLE  faturamento_gerados;
    
    TRUNCATE TABLE faturamentos;

    TRUNCATE TABLE  frota_internas;
    
    TRUNCATE TABLE  insumos;
    
    TRUNCATE TABLE  movimento_equipamentos;
    
    TRUNCATE TABLE  movimento_faturamentos;

    TRUNCATE TABLE  ociosidade;

    TRUNCATE TABLE  ordem_servicos;

    TRUNCATE TABLE  registro_fotograficos;

    TRUNCATE TABLE  servicos;

    TRUNCATE TABLE usuarios;

    TRUNCATE TABLE  veiculos;

    TRUNCATE TABLE  visitas; 
    TRUNCATE TABLE  movimento_insumos;
