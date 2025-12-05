const express = require('express');
const router = express.Router();
const Pesticide = require('../models/Pesticide');

router.get('/', async (req, res) => {
  const data = await Pesticide.find().limit(500);
  res.json(data);
});

module.exports = router;

