const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Adjust the minimum length as per your security requirements
  },
  role: {
    type: String,
    enum: ['user', 'organizer', 'judge', 'mentor'], // Restricts the role to these values
    required: true,
    default: 'user', // Default role is 'user'
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const User = mongoose.model('User', userSchema);

module.exports = User;

