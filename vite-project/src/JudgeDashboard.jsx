import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, 
  Users, 
  Trophy, 
  Tag, 
  BarChart2, 
  Loader2 
} from 'lucide-react';

function JudgeDashboard() {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/hackathons/upcoming');
        const formattedHackathons = response.data.map(hackathon => ({
          title: hackathon.title,
          dates: hackathon.date,
          participants: hackathon.participants,
          prizePool: hackathon.prize,
          level: hackathon.difficulty,
          tracks: hackathon.skills,
          status: hackathon.status
        }));
        
        setHackathons(formattedHackathons);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch hackathons');
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  const handleNavigate = (hackathonTitle) => {
    localStorage.setItem('selectedHackathon', hackathonTitle);
    navigate(`/teams?hackathon=${encodeURIComponent(hackathonTitle)}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="w-16 h-16 animate-spin text-indigo-600" />
          <p className="mt-4 text-lg text-gray-600">Loading hackathons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-4 rounded-lg shadow-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-indigo-800 to-purple-600 text-white py-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold tracking-wide">HackCentral</h1>
          <nav>
            <ul className="flex space-x-6">
              {['About', 'Hackathons', 'Leaderboard', 'Sign Up'].map(item => (
                <li 
                  key={item} 
                  className="hover:bg-white/20 px-4 py-2 rounded-full transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Build. Compete. Innovate.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the world's most exciting virtual hackathons and showcase your skills to global tech leaders.
          </p>
        </div>

        <h3 className="text-3xl font-bold text-center text-indigo-800 mb-10">
          Upcoming Hackathons
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon) => (
            <div 
              key={hackathon.title} 
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-500"
            >
              <div className="p-6">
                <h4 className="text-2xl font-bold text-indigo-800 mb-4">
                  {hackathon.title}
                </h4>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 text-indigo-500" size={20} />
                    <span>{hackathon.dates}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="mr-2 text-indigo-500" size={20} />
                    <span>{hackathon.participants} Participants</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Trophy className="mr-2 text-indigo-500" size={20} />
                    <span>Prize Pool: {hackathon.prizePool}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Tag className="mr-2 text-indigo-500" size={20} />
                    <span>Level: {hackathon.level}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-indigo-700 mb-2">Tracks</h5>
                  <div className="flex flex-wrap gap-2">
                    {hackathon.tracks.map((track) => (
                      <span 
                        key={track} 
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                      >
                        {track}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handleNavigate(hackathon.title)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center justify-center"
                >
                  <BarChart2 className="mr-2" />
                  {hackathon.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JudgeDashboard;