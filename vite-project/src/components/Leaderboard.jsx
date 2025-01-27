// Leaderboard.js
import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const hackathonTitle = new URLSearchParams(location.search).get('hackname'); 
        const response = await axios.get(`http://localhost:3000/api/leaderboard/${hackathonTitle}`);
        setLeaderboard(response.data.slice(0, 3));  // Fetch top 3 teams only
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div>
      
      <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {leaderboard.map((team) => (
          <div
            key={team.teamName} 
            className="px-6 py-4 border-b border-slate-700 last:border-b-0 hover:bg-slate-700 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-gray-200 mr-3">#{team.rank}</span>
                <span className="text-lg font-bold text-white">{team.teamName}</span>
              </div>
              <span className="text-emerald-400 font-bold">{team.totalScore} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
