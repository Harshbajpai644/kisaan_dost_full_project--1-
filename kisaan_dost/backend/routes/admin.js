const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Pesticide = require('../models/Pesticide');

router.post('/pesticide', auth, async (req, res)=>{
  if(req.user.role !== 'admin') return res.status(403).json({ message: 'forbidden' });
  const p = await Pesticide.create(req.body);
  res.json(p);
});

module.exports = router;

