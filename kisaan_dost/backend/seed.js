const mongoose = require('mongoose');
require('dotenv').config();
const Pesticide = require('./models/Pesticide');
const MandiRate = require('./models/MandiRate');

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  await Pesticide.deleteMany({});
  await MandiRate.deleteMany({});
  await Pesticide.create({ name:'Cypermethrin', use:'Insect control', dosage:'2 ml/L', purchaseLink:'https://example.com' });
  await MandiRate.create({ mandi:'Lucknow APMC', crop:'Wheat', price:2200, city:'Lucknow' });
  console.log('seeded');
  process.exit(0);
}
seed();
