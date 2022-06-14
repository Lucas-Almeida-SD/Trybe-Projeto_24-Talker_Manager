const express = require('express');
const crypto = require('crypto');

const router = express.Router();

function validateEmail(req, res, next) {
  const { email } = req.body;
  const regexEmail = /\S+@\S+\.com/g;

  if (!email) { 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexEmail.test(email)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

async function login(_req, res) {
  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token });
}

router.post('/', validateEmail, validatePassword, login);

module.exports = router;
