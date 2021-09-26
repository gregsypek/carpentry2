const mongoose = require('mongoose');

const stairSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Schody muszą mieć nazwę'],
    unique: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Schody muszą mieć zdjęcie poglądowe'],
  },
  description: {
    type: String,
    required: [true, 'Schody muszą mieć opis!'],
  },
  images: [String],
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Stair = mongoose.model('Stair', stairSchema);

module.exports = Stair;
