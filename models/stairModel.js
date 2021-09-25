const mongoose = require('mongoose');

const stairSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Schody muszą mieć imię'],
    unique: true,
  },
  summary: String,
  description: String,
  imageCover: String,
  images: [String],
});

const Stair = mongoose.model('Stair', stairSchema);

module.exports = Stair;
