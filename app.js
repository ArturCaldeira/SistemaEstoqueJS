    ////<------------------------------------->modulos para execução da API dependencias diretas <-------------------------------------> 
    const express = require('express');
    const mongoose = require('mongoose');
    const body_parser = require('body-parser');
    const expressLayouts = require('express-ejs-layouts');
    const passport = require('passport');
    const flash = require('connect-flash');
    const session = require('express-session');
        ////<------------------------------------->modulos para execução da API dependencias diretas <-------------------------------------> 
        const app = express();
        //<-------------------------------------> ÁREA DO BANCO <------------------------------------->
    // configuração do banco
    const banco = require('./config/banco').mongoURI;
    // conexão com o banco 
    mongoose.connect(banco, {useNewUrlParser: true}
    ).then(() => {
        console.log("conectado ao banco")
    }).catch(err => {
        console.log(err);
    })
    //<-------------------------------------> ÁREA DO BANCO <------------------------------------->
    
    // <------------------------------------->  EJS <-------------------------------------> 
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    // <-------------------------------------> EJS <------------------------------------->
    
    // <-------------------------------------> listando server na porta 5000 <-------------------------------------> 
    const porta = process.env.PORT || 5000;
    app.listen(porta, console.log(`O server está rodando na porta:  ${porta}`));
    // <-------------------------------------> listando server na porta 5000 <-------------------------------------> 
    
    
    //<-------------------------------------> ÁREA DAS ROTAS <------------------------------------->
    app.use('/', require('./rotas/index'));
    app.use('/users', require('./rotas/usuarios'));
    //<-------------------------------------> ÁREA DAS ROTAS <------------------------------------->
    
    