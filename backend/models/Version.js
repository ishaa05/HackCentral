const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  hackname: {
    type: String,
    required: true,
    trim: true,
  },
  teamName: {
    type: String,
    required: true,
    trim: true,
  },
  gitUrl: {
    type: String,
    required: true,
    trim: true,
  },
});

const Version = mongoose.model('Version', teamSchema);

module.exports = Version;