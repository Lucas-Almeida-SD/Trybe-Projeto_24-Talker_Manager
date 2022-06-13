const fs = require('fs/promises');
const express = require('express');

const router = express.Router();

async function getAllTalker(req, res) {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf8'));

  res.status(200).json(talkers);
}

async function getTalkerById(req, res) {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf8'));

  const { id } = req.params;

  const findTalker = talkers.find((talker) => talker.id === Number(id));

  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findTalker);
}

router.get('/', getAllTalker);

router.get('/:id', getTalkerById);

module.exports = router;