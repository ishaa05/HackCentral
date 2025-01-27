const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema({
  repo: String,
  commits: [
    {
      message: String,
      author: String,
      date: Date,
      sha: String,
    },
  ],
});

const Commit = mongoose.model('Commit', commitSchema);
