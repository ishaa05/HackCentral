import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
 
  BarChart2, 
  X, 
  ExternalLink 
} from 'lucide-react';
import CommitHistory from './Version';

const Sub = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState({ owner: '', repo: '' });
  const location = useLocation();
  const hackname = new URLSearchParams(location.search).get('hackname');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams for:', hackname);
        const response = await fetch(`http://localhost:3000/sub?hackname=${encodeURIComponent(hackname)}`);
        const data = await response.json();

        if (response.ok) {
          setTeams(data.teams);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    if (hackname) {
      fetchTeams();
    }
  }, [hackname]);

  const extractOwnerAndRepo = (gitUrl) => {
    const regex = /github.com\/([^\/]+)\/([^\/]+)/;
    const match = gitUrl.match(regex);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
    return null;
  };

  const handleTrackProgress = (gitUrl) => {
    const repoInfo = extractOwnerAndRepo(gitUrl);
    if (repoInfo) {
      setSelectedRepo(repoInfo);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-3xl font-extrabold text-white flex items-center">
            <BarChart2 className="mr-3 w-10 h-10" />
            Teams for {hackname}
          </h2>
        </div>
        
        <div className="p-6">
          {teams.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl">No teams found for this hackathon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                     
                      <h3 className="text-xl font-bold text-gray-800">{team.teamName}</h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 flex items-center">
                        Repository: 
                        <a 
                          href={team.gitUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="ml-2 text-blue-600 hover:underline flex items-center"
                        >
                          {team.gitUrl.replace('https://github.com/', '')}
                          <ExternalLink className="ml-1 w-4 h-4" />
                        </a>
                      </p>
                    </div>
                    <button 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                      onClick={() => handleTrackProgress(team.gitUrl)}
                    >
                      <BarChart2 className="mr-2" />
                      Track Progress
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-4xl max-h-[90vh] overflow-auto relative">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="p-6">
              <CommitHistory owner={selectedRepo.owner} repo={selectedRepo.repo} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sub;