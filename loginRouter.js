const express = require('express');
const crypto = require('crypto');

const router = express.Router();

function login(req, res) {
  // const { email, password } = req.body;

  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token });
}

router.post('/', login);

module.exports = router;
