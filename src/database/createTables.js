const db = require('./index');

async function createTables() {
    await db.connect();

    await db.query(`
        CREATE SEQUENCE tbpessoa_pescodigo_seq;

        CREATE TABLE tbpessoa (
            pescodigo INTEGER NOT NULL DEFAULT nextval('tbpessoa_pescodigo_seq'),
            pesnome VARCHAR NOT NULL,
            pestipo CHAR(1) NOT NULL,
            pescpfcnpj VARCHAR(14) NOT NULL,
            pestelefone VARCHAR NOT NULL,
            pesemail VARCHAR NOT NULL,
            CONSTRAINT pk_pessoa PRIMARY KEY (pescodigo)
        );
        COMMENT ON TABLE tbpessoa IS 'Tabela de pessoas da aplicação';
        COMMENT ON COLUMN tbpessoa.pestipo IS '1 = Física
        2 = Jurídica';
        
        ALTER SEQUENCE tbpessoa_pescodigo_seq OWNED BY tbpessoa.pescodigo;
    `);

    await db.query(`
        CREATE SEQUENCE tbendereco_endcodigo_seq;

        CREATE TABLE tbendereco (
            endcodigo INTEGER NOT NULL DEFAULT nextval('tbendereco_endcodigo_seq'),
            pescodigo INTEGER NOT NULL,
            endcep VARCHAR(8) NOT NULL,
            endlogradouro VARCHAR NOT NULL,
            endbairro VARCHAR NOT NULL,
            endlocalidade VARCHAR NOT NULL,
            enduf VARCHAR NOT NULL,
            endtipo CHAR(1) NOT NULL,
            endnumero VARCHAR(6),
            CONSTRAINT pk_endereco PRIMARY KEY (endcodigo, pescodigo)
        );
        COMMENT ON COLUMN tbendereco.endtipo IS '1 = Residencial
        2 = Comercial';
        
        ALTER SEQUENCE tbendereco_endcodigo_seq OWNED BY tbendereco.endcodigo;
        
        ALTER TABLE tbendereco ADD CONSTRAINT tbpessoa_tbendereco_fk
        FOREIGN KEY (pescodigo)
        REFERENCES tbpessoa (pescodigo)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
        NOT DEFERRABLE;
    `);

    await db.end();

    console.log('Tabelas criadas');
}

createTables();