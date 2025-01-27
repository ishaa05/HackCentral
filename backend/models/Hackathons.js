const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  title: String,
  date: String,
  participants: Number,
  prize: String,
  difficulty: String,
  skills: [String],
  status: String,
  winners: [String],
  mentors: [{
    name: String,
    email: String
  }]
});

module.exports = mongoose.model('Hackathon', hackathonSchema);