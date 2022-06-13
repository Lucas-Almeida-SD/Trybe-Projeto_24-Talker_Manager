const fs = require('fs/promises');

async function getAllTalker(req, res) {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf8'));

  res.status(200).json(talkers);
}

module.exports = getAllTalker;