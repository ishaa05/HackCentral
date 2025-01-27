const mongoose = require('mongoose');

const ProjectSubmissionSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true
  },
  hackathonName: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  githubRepo: {
    type: String,
    required: true
  },
  submissionVersions: [{
    versionNumber: {
      type: Number,
      default: 1
    },
    submissionDate: {
      type: Date,
      default: Date.now
    },
    repositoryCommitHash: {
      type: String,
      required: true
    },
    submissionFiles: [{
      fileName: String,
      fileUrl: String
    }],
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'accepted', 'rejected'],
      default: 'draft'
    }
  }],
  currentVersion: {
    type: Number,
    default: 1
  },
  submittedAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('ProjectSubmission', ProjectSubmissionSchema);
