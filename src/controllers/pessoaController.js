const express = require('express');
const db = require('../database/index');

const router = express.Router();

/**
 * Rota de cadastro das pessoas e endereços
 */
router.post('/store', async (req, res) => {
    try {

        //pegando os parametros que vieram do frontend
        const { pesnome, pestipo, pescpfcnpj, pestelefone, pesemail, enderecos} = req.body;

        //executando a query de INSERT
        await db.query(`
            INSERT INTO tbpessoa(pesnome, pestipo, pescpfcnpj, pestelefone, pesemail)
                 VALUES ('${pesnome}', ${pestipo}, '${pescpfcnpj}', '${pestelefone}', '${pesemail}')
        `);

        //buscando a pessoa que acabou de ser inserida
        pessoa = await db.query(`
            SELECT pescodigo
              FROM tbpessoa
          ORDER BY pescodigo DESC
             LIMIT 1
        `);

        //percorre todos os endereços passados para incluir os mesmo
        for(var i = 0; i < enderecos.length; i++) {
                //executando a query de INSERT DO ENDERECO
                await db.query(`
                INSERT INTO tbendereco(pescodigo, endcep, endlogradouro, endbairro, endlocalidade, enduf, endtipo, endnumero)
                    VALUES (
                        ${pessoa.rows[0].pescodigo},
                        '${enderecos[i].endcep}',
                        '${enderecos[i].endlogradouro}',
                        '${enderecos[i].endbairro}',
                        '${enderecos[i].endlocalidade}',
                        '${enderecos[i].enduf}',
                        ${enderecos[i].endtipo},
                        '${enderecos[i].endnumero}'
                    )
            `);
        }

        return res.status(200).send({message: 'Registro inserido com sucesso!'});
    } catch(err) {
        return res.status(400).send({message: 'Não foi possível incluir o registro!'});
    }
});

/**
 * Rota de consulta das pessoas
 */
router.get('/get', async (req, res) => {
    try {

        //executando a query de SELECT
        let result = await db.query(`
            SELECT *
              FROM tbpessoa
        `);

        return res.status(200).send({data: result.rows});
    } catch(err) {
        return res.status(400).send({message: err.message});
    }
});

/**
 * Rota de consulta dos endereços da pessoa
 */
router.get('/enderecos', async (req, res) => {
    try {

        //executando a query de SELECT
        let result = await db.query(`
            SELECT *
              FROM tbendereco
             WHERE pescodigo = ${req.query.codigo_pessoa}
        `);

        return res.status(200).send({data: result.rows});
    } catch(err) {
        return res.status(400).send({message: err.message});
    }
});

module.exports = app => app.use('/pessoas', router);