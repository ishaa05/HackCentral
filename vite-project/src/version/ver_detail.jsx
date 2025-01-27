import React, { useState } from 'react';
import axios from 'axios';

const TeamForm = () => {
  const [hackname, setHackname] = useState('');
  const [teamName, setTeamName] = useState('');
  const [gitUrl, setGitUrl] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleHacknameChange = (e) => {
    setHackname(e.target.value);
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleGitUrlChange = (e) => {
    setGitUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hackname || !teamName || !gitUrl) {
      setResponseMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/ver', {
        hackname,
        teamName,
        gitUrl,
      });
      setResponseMessage('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-navy-800">Enter Team Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="hackname" 
            className="block text-navy-700 font-bold mb-2"
          >
            Hackname:
          </label>
          <input
            type="text"
            id="hackname"
            value={hackname}
            onChange={handleHacknameChange}
            required
            className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="teamName" 
            className="block text-navy-700 font-semibold mb-2"
          >
            Team Name:
          </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={handleTeamNameChange}
            required
            className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="mb-6">
          <label 
            htmlFor="gitUrl" 
            className="block text-navy-700 font-semibold mb-2"
          >
            GitHub Repository URL:
          </label>
          <input
            type="url"
            id="gitUrl"
            value={gitUrl}
            onChange={handleGitUrlChange}
            required
            className="w-full px-3 py-2 border border-navy-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Submit
        </button>
      </form>
      {responseMessage && (
        <p className="mt-4 text-center text-navy-700">{responseMessage}</p>
      )}
    </div>
  );
};

export default TeamForm;