const express = require('express');

const app = express();

const porta = process.env.PORT || 5000;

app.listen(porta, console.log(`O server está rodando na porta:  ${porta}`));
