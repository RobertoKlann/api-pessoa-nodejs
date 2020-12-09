//Importando pacotes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Criando aplicação
const app = express();

//Setando confs
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./src/controllers/pessoaController')(app);

//Fazer o servidor rodar
app.listen(5000);