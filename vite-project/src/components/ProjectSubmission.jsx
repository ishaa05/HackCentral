import React, { useState } from 'react';
import axios from 'axios';

const ProjectSubmission = ({ teamName, hackathonName }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [githubRepo, setGithubRepo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/submissions/submit', {
        teamName,
        hackathonName,
        projectName,
        description,
        githubRepo
      });

      // Handle successful submission
      console.log('Project submitted:', response.data);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Project Submission</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">GitHub Repository URL</label>
          <input
            type="url"
            value={githubRepo}
            onChange={(e) => setGithubRepo(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default ProjectSubmission;
