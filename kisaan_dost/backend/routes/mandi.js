const express = require('express');
const router = express.Router();
const MandiRate = require('../models/MandiRate');
const auth = require('../middleware/auth'); // JWT middleware

// GET /api/mandi?city=...
router.get('/', async (req, res)=>{
  const { city } = req.query;
  const q = city ? { city: new RegExp(city, 'i') } : {};
  const data = await MandiRate.find(q).sort({ date: -1 }).limit(100);
  res.json(data);
});

// POST create (protected)
router.post('/', auth, async (req, res)=>{
  // auth middleware sets req.user
  if(req.user.role !== 'admin') return res.status(403).json({ message: 'forbidden' });
  const { mandi, crop, price, city } = req.body;
  const doc = await MandiRate.create({ mandi, crop, price, city });
  res.json(doc);
});

module.exports = router;

