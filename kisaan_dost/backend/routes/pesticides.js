const express = require('express')
const router = express.Router()
const Pesticide = require('../models/Pesticide')

router.get('/', async (req, res)=>{
  const data = await Pesticide.find().limit(200)
  res.send(data)
})

module.exports = router
