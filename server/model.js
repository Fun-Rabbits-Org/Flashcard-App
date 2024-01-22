const mongoose = require('mongoose');
require('dotenv').config();

const cardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
});

const deckSchema = new mongoose.Schema({
  deckName: { type: String, required: true },
  cards: [cardSchema],
});

module.exports = mongoose.model('Deck', deckSchema);
