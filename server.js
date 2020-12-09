//importando pacotes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//criando aplicação
const app = express();

//setando confs
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./src/controllers/pessoaController')(app);

//iniciando o servidor
app.listen(5000);