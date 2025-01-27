import React, { useState } from 'react';
import axios from 'axios';
import { Award, FileText, Users } from 'lucide-react';

const CertificatesSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <CertificateGenerator />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <CommonTeamsForm />
      </div>
    </div>
  );
};

const CertificateGenerator = () => {
  const [username, setUsername] = useState("");
  const [hackname, setHackname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/generate-certificate", {
        username,
        hackname,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Failed to generate certificate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Award className="w-8 h-8 text-blue-500 mr-3" />
        <h2 className="text-2xl font-bold">Certificate Generator</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Your Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Hackathon Name</label>
          <input
            type="text"
            placeholder="Enter hackathon name"
            value={hackname}
            onChange={(e) => setHackname(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <FileText className="w-5 h-5" />
          <span>{isLoading ? 'Generating...' : 'Generate Certificate'}</span>
        </button>
      </form>
    </div>
  );
};

const CommonTeamsForm = () => {
  const [hackathonId, setHackathonId] = useState('');
  const [commonTeams, setCommonTeams] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/get-common-teams', { hackathonId });
      setCommonTeams(response.data.commonTeams);
    } catch (err) {
      console.error('Error fetching common teams:', err);
      alert('Failed to fetch common teams');
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Users className="w-8 h-8 text-blue-500 mr-3" />
        <h2 className="text-2xl font-bold">Find Common Teams</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Hackathon ID</label>
          <input
            type="text"
            placeholder="Enter Hackathon ID"
            value={hackathonId}
            onChange={(e) => setHackathonId(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Find Common Teams
        </button>
      </form>

      {commonTeams.length > 0 && (
        <div className="mt-6 max-h-64 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Common Teams</h3>
          <div className="space-y-2">
            {commonTeams.map((team, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg">
                <h4 className="font-bold">{team.teamName}</h4>
                <ul className="text-sm">
                  {team.members.map((member, i) => (
                    <li key={i} className="text-gray-700">
                      {member.name} ({member.email})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesSection;