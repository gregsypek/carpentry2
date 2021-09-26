const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Stair = require('../models/stairModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Polączenie z DB zakończone sukcesem');
  });

//READ JSON FILE

const stairs = JSON.parse(fs.readFileSync(`${__dirname}/stairs.json`, 'utf-8'));

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Stair.create(stairs);
    console.log('Dane załodowane!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await Stair.deleteMany();
    console.log('Dane usunięte!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
