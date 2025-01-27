import React, { useState } from 'react';

const TeamForm = () => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([{ name: '', email: '' }]);

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: '', email: '' }]);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamData = { teamName, teamMembers };

    try {
      const response = await fetch('http://localhost:3000/api/teams', { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Team created successfully!');
        console.log('Response:', data);
        setTeamName('');
        setTeamMembers([{ name: '', email: '' }]); // Reset form
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while creating the team.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 text-white">
          <h2 className="text-2xl font-bold text-center">Create Your Team</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />

          {teamMembers.map((member, index) => (
            <div key={index} className="space-y-3">
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                placeholder={`Member ${index + 1} Name`}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              />
              <input
                type="email"
                value={member.email}
                onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                placeholder={`Member ${index + 1} Email`}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMember(index)}
                  className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  Remove Member
                </button>
              )}
            </div>
          ))}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleAddMember}
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
            >
              + Add Member
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
