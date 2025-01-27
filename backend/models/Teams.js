const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: { type: [String], required: true },
  project: { type: String },
  description: { type: String},
  innovation: { type: Number, required: true, min: 0, max: 10 },
  creativity: { type: Number, required: true, min: 0, max: 10 },
  ux: { type: Number, required: true, min: 0, max: 10 },
  businessPotential: { type: Number, required: true, min: 0, max: 10 },
  feedback: { type: String, required: true },
  });
  
  const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;