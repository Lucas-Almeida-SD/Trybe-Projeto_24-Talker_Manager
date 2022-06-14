const fs = require('fs/promises');
const express = require('express');
const moment = require('moment');

const router = express.Router();
const fileName = './talker.json';

async function getAllTalker(req, res) {
  const talkers = JSON.parse(await fs.readFile(fileName, 'utf8'));

  res.status(200).json(talkers);
}

async function getTalkerById(req, res) {
  const talkers = JSON.parse(await fs.readFile(fileName, 'utf8'));

  const { id } = req.params;

  const findTalker = talkers.find((talker) => talker.id === Number(id));

  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findTalker);
}

async function validateToken(req, res, next) {
  const bodyToken = req.headers.authorization;

  if (!bodyToken) return res.status(401).json({ message: 'Token não encontrado' });

  if (bodyToken.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
}

function validateName(req, res, next) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  next();
}

function validateWatchedAtOfTalk(req, res, next) {
  const { talk: { watchedAt } } = req.body; 

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });

  const isValidDate = moment(watchedAt, 'DD/MM/YYYY').isValid();
  const regexDate = /\d{2}\/\d{2}\/\d{4}/;
  if (!isValidDate || !regexDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

function validateRateOfTalk(req, res, next) {
  const { talk: { rate } } = req.body; 

  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }

  next();
}

async function createTalk(req, res) {
  const talkers = JSON.parse(await fs.readFile(fileName, 'utf8'));
  const { name, age, talk } = req.body;

  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);

  await fs.writeFile(fileName, JSON.stringify(talkers));

  res.status(201).json(newTalker);
}

async function editTalker(req, res) {
  const talkers = JSON.parse(await fs.readFile(fileName, 'utf8'));
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
  await fs.writeFile(fileName, JSON.stringify(talkers));

  res.status(200).json(talkers[talkerIndex]);
}

async function deleteTalker(req, res) {
  const talkers = JSON.parse(await fs.readFile(fileName, 'utf8'));
  const { id } = req.params;
  
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

  talkers.splice(talkerIndex, 1);

  await fs.writeFile(fileName, JSON.stringify(talkers));
  
  res.status(204).end();
}

router.get('/', getAllTalker);

router.get('/:id', getTalkerById);

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAtOfTalk,
  validateRateOfTalk,
  createTalk);

router.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAtOfTalk,
  validateRateOfTalk,
  editTalker);

router.delete('/:id', validateToken, deleteTalker);

module.exports = router;