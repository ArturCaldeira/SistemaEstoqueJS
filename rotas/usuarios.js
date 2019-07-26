const express = require('express');
const rota = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// carrega o modelo do usuario
const Usuario = require('../modelos/usuarios');
const { forwardAuthenticated } = require('../config/banco');

// pagina de login
rota.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// pagina de cadastro
rota.get('/cadastro', forwardAuthenticated, (req, res) => res.render('cadastro'));

// cadastro
rota.post('/cadastro', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Faltou campo.' });
  }

  if (password != password2) {
    errors.push({ msg: 'Senhas não batem' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Senha precisa ter ao menos 6 caracteres' });
  }

  if (errors.length > 0) {
    res.render('cadastro', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email já cadastrado.' });
        res.render('cadastro', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Você está registrado.'
                );
                res.redirect('/usuarios/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
rota.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
rota.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = rota;
