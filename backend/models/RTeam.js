const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    trim: true,
  },
  teamMembers: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      },
    },
  ],
  hackathonId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  // scheduleTime: {
  //   type: Date, // Stores the scheduled session time
  //   default: null, // Initially, there’s no scheduled session
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignedMentor: {
      name: String,
      email: String
    },
  scheduleTime: Date
});

module.exports = mongoose.model('Team', teamSchema);
