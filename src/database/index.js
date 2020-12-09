//Importando pacotes
const pg = require('pg');

//Parametros para a conexão
const client = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

module.exports = client;