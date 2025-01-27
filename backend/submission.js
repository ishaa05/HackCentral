const express = require('express');
const router = express.Router();
const ProjectSubmission = require('./models/Project');
const { simpleGit } = require('simple-git');
const path = require('path');
const fs = require('fs-extra');

// Create a new project submission
router.post('/submit', async (req, res) => {
  try {
    const { teamName, hackathonName, projectName, description, githubRepo } = req.body;

    // Clone the GitHub repository
    const repoPath = path.join(__dirname, '../temp-repos', teamName);
    await fs.ensureDir(repoPath);
    
    const git = simpleGit(repoPath);
    await git.clone(githubRepo, '.');

    // Get the latest commit hash
    const latestCommit = await git.revparse(['HEAD']);

    const projectSubmission = new ProjectSubmission({
      teamName,
      hackathonName,
      projectName,
      description,
      githubRepo,
      submissionVersions: [{
        repositoryCommitHash: latestCommit,
        status: 'submitted'
      }]
    });

    await projectSubmission.save();

    res.status(201).json(projectSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get project submissions for a hackathon
router.get('/hackathon/:hackathonName', async (req, res) => {
  try {
    const { hackathonName } = req.params;
    const submissions = await ProjectSubmission.find({ hackathonName })
      .populate('teamName', 'teamName');
    
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
