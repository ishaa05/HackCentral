import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Trophy, 
  Star, 
  Users, 
  BarChart2, 
  Loader2, 
  AlertTriangle 
} from 'lucide-react';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hackathonTitle = localStorage.getItem('selectedHackathon');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leaderboard/${encodeURIComponent(hackathonTitle)}`
        );
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leaderboard');
        setLoading(false);
      }
    };

    if (hackathonTitle) {
      fetchLeaderboard();
    }
  }, [hackathonTitle]);

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-yellow-500';
    if (score >= 6) return 'text-gray-500';
    if (score >= 4) return 'text-yellow-700';
    return 'text-red-500';
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Trophy className="w-6 h-6 text-gray-500" />;
      case 3: return <Trophy className="w-6 h-6 text-yellow-700" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="w-16 h-16 animate-spin text-indigo-600" />
          <p className="mt-4 text-lg text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-4 rounded-lg shadow-md flex items-center">
          <AlertTriangle className="mr-3 text-red-500" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <BarChart2 className="mr-3" />
              {hackathonTitle} Leaderboard
            </h1>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  {['Rank', 'Team', 'Members', 'Innovation', 'Creativity', 'UX', 'Business Potential', 'Total Score', 'Feedback'].map((header) => (
                    <th 
                      key={header} 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboardData.map((team) => (
                  <tr 
                    key={team.teamName} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      {getRankIcon(team.rank)}
                      <span className="ml-2">{team.rank}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {team.teamName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Users className="mr-2 text-indigo-500" />
                        <div>
                          {team.teamMembers.map((member) => (
                            <div key={member.email} className="text-sm text-gray-600">
                              {member.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    {['innovation', 'creativity', 'ux', 'businessPotential'].map((metric) => (
                      <td 
                        key={metric} 
                        className={`px-6 py-4 ${getScoreColor(team[metric])} font-semibold`}
                      >
                        {team[metric]}
                      </td>
                    ))}
                    <td className={`px-6 py-4 font-bold ${getScoreColor(team.averageScore)}`}>
                      {team.totalScore.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {team.feedback}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;