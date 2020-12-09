const express = require('express');
const db = require('../database/index');

const router = express.Router();

router.post('/store', async (req, res) => {
    try {
        await db.connect();

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

        await db.end();

        return res.status(200).send({message: 'Registro inserido com sucesso!'});
    } catch(err) {
        return res.status(400).send({message: 'Não foi possível incluir o registro!'});
    }
});

router.get('/get', async (req, res) => {
    try {
        await db.connect();

        //executando a query de SELECT
        let result = await db.query(`
            SELECT *
              FROM tbpessoa
        `);

        await db.end();

        return res.status(200).send({data: result.rows});
    } catch(err) {
        return res.status(400).send({message: 'Não foi possível buscar os registros!'});
    }
});

module.exports = app => app.use('/pessoas', router);