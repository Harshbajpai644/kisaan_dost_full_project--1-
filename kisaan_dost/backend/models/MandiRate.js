const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  mandi: String,
  crop: String,
  price: Number,
  city: String,
  date: { type: Date, default: Date.now }
})
module.exports = mongoose.model('MandiRate', schema)
