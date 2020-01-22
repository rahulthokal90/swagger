const { Patient } = require('./models/patient');
const mongoose = require('mongoose');
const config = require('config');

const data = [
  {
    name: 'Ram Patil'
  },
  {
    name: 'Sham Patil'
  },
  {
    name: 'Raj Patil'
  },
  {
    name: 'Sachin Patil'
  }
];

async function seed() {
  await mongoose.connect(config.get('db'));
  await Patient.deleteMany({});

  for (let patient of data) {
    await new Patient({ name: patient.name }).save();
  }

  mongoose.disconnect();

  console.info('Done!');
}

seed();
