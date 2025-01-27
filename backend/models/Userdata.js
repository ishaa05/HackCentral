const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://maureenmiranda22:PqxEHalWziPVqy7n@cluster0.ive9g.mongodb.net/hack_04d?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  progress: { type: Number, required: true, min: 0, max: 100 }, // Progress percentage
  achievements: { type: [String], default: [] }, // Array of achievements
  university_name: { type: String, required: true },
  weekly_study_streak: {
    type: [
      {
        week: { type: String, required: true }, // Week identifier (e.g., "Week 1", "Week 2")
        hours: { type: Number, required: true }, // Study hours for the week
      },
    ],
    default: [],
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the User model
const User = mongoose.model('User', userSchema);

// Dummy data
const dummyUsers = [
  {
    name: 'Alice Johnson',
    progress: 85,
    achievements: ['Completed React Course', 'Hackathon Winner'],
    university_name: 'MIT',
    weekly_study_streak: [
      { week: 'Week 1', hours: 15 },
      { week: 'Week 2', hours: 10 },
    ],
  },
  {
    name: 'Bob Smith',
    progress: 60,
    achievements: ['JavaScript Basics', 'Data Structures Certification'],
    university_name: 'Stanford University',
    weekly_study_streak: [
      { week: 'Week 1', hours: 8 },
      { week: 'Week 2', hours: 12 },
    ],
  },
  {
    name: 'Charlie Lee',
    progress: 90,
    achievements: ['Machine Learning Expert', 'Top Coder Award'],
    university_name: 'Harvard University',
    weekly_study_streak: [
      { week: 'Week 1', hours: 20 },
      { week: 'Week 2', hours: 18 },
    ],
  },
];