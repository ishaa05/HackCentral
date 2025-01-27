import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, Users, MessageCircle, Code, Award, ClipboardCheck, Box } from 'lucide-react';
import { motion } from "framer-motion";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import TeamForm from '../version/ver_detail';
import Leaderboard from './Leaderboard';
const EventsPage = () => {
  const [iframeVisible, setIframeVisible] = useState(false);
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const [projectFormVisible, setProjectFormVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([{ name: '', email: '' }]);
  const [hackathonData, setHackathonData] = useState({ title: '', participants: 0 });

  const navigate = useNavigate();
  const { title } = useParams();
   

  useEffect(() => {
    const fetchHackathonData = async () => {
      try {
        const hackathonTitle = new URLSearchParams(location.search).get('hackname'); 
        const response = await fetch(`http://localhost:3000/api/event/${hackathonTitle}`);
        if (response.ok) {
          const data = await response.json();
          setHackathonData(data);
        } else {
          console.error('Failed to fetch hackathon data');
        }
      } catch (error) {
        console.error('Error fetching hackathon data:', error);
      }
    };

    fetchHackathonData();
  }, [title]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, duration: 0.8 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const features = [
    {
      title: "Team Formation",
      description: "Find and build your ideal team",
      icon: Users,
      gradient: "from-indigo-600 to-blue-500",
      onClick: () => setIframeVisible(true)
    },
    {
      title: "Mentorship",
      description: "Get expert coding and project guidance",
      icon: MessageCircle,
      gradient: "from-teal-600 to-emerald-500",
      onClick: () => navigate('/mentor')
    },
    {
      title: "Project Submission",
      description: "Engage in innovative coding challenges",
      icon: Code,
      gradient: "from-cyan-600 to-sky-500",
      onClick: () => setProjectFormVisible(true)
    },
    {
      title: "Team Registration",
      description: "Register your team for the hackathon",
      icon: ClipboardCheck,
      gradient: "from-rose-600 to-pink-500",
      onClick: () => setRegisterFormVisible(true)
    },
    {
      title: "Team Workspace",
      description: "Collaborate in a shared digital environment",
      icon: Box,
      gradient: "from-violet-600 to-purple-500",
      onClick: () => navigate('/document')
    }
  ];

  const timelinePhases = [
    { phase: "Ideation", date: "2024-02-01", description: "Team formation and initial concept" },
    { phase: "Development", date: "2024-03-01", description: "Build and refine project" },
    { phase: "Presentation", date: "2024-04-01", description: "Final submissions and demos" }
  ];

  const leaderboard = [
    { name: "Quantum Innovators", points: 120, rank: 1 },
    { name: "Code Wizards", points: 105, rank: 2 },
    { name: "Tech Titans", points: 90, rank: 3 },
    { name: "Digital Dreamers", points: 75, rank: 4 }
  ];

  const isPhaseElapsed = (date) => {
    const currentDate = new Date();
    const phaseDate = new Date(date);
    return currentDate > phaseDate;
  };

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

    const teamData = { teamName, teamMembers,userId,hackathonId,isRegistered:true };

    console.log('Submitting team data:', teamData);

    try {
      const response = await fetch('http://localhost:3000/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Team registered successfully!');
        localStorage.setItem('isRegistered', 'true');
        setTeamName('');
        setTeamMembers([{ name: '', email: '' }]);
        setRegisterFormVisible(false);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while registering the team.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-rose-500 to-indigo-500">
            {hackathonData.title}
          </h1>
          <p className="text-xl text-gray-300">
            Total Participants: {hackathonData.participants}
          </p>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              variants={cardVariants}
              onClick={feature.onClick || null}
            >
              <div className="flex flex-col items-center text-center">
                <feature.icon className="w-12 h-12 text-white mb-4 opacity-80" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-100 opacity-80">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Leaderboard */}
          <div>
            <h2 className="text-3xl  font-bold text-white flex items-center mb-6">
              <Trophy className="mr-3 text-amber-400" /> Leaderboard
            </h2>
            <div className="mt-10 bg-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <Leaderboard />
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center mb-6">
              <Calendar className="mr-3 text-cyan-400" /> Event Timeline
            </h2>
            <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl">
              {timelinePhases.map((phase) => {
                const elapsed = isPhaseElapsed(phase.date);
                return (
                  <div 
                    key={phase.phase} 
                    className="px-6 py-5 border-b border-slate-700 last:border-b-0 hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className={`text-lg font-bold ${elapsed ? 'text-gray-500' : 'text-white'}`}>
                          {phase.phase}
                        </h3>
                        <p className="text-sm text-gray-400">{phase.description}</p>
                      </div>
                      <span className={`text-sm ${elapsed ? 'text-gray-500' : 'text-cyan-400'}`}>
                        {phase.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modals/Forms */}
      {iframeVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-4xl h-[80vh] relative">
            <button 
              onClick={() => setIframeVisible(false)}
              className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Close
            </button>
            <iframe 
              src="http://localhost:8501"  // Assuming Streamlit app runs on default port
              className="w-full h-full border-none rounded-xl"
              title="Team Formation"
            />
          </div>
        </div>
      )}

      {registerFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Team Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Team Name</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your team name"
                  required
                />
              </div>


              {teamMembers.map((member, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Member Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter member name"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Member Email</label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                        className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter member email"
                        required
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(index)}
                        className="self-end bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Member
                </button>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Register Team
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterFormVisible(false)}
                  className="flex-1 bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Submission Form */}
      {projectFormVisible && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-lg text-gray-300"> {/* Set text color here */}
      <h2 className="text-2xl font-bold text-white mb-6">Submit Your Project</h2>
      {/* Add TeamForm here */}
      <TeamForm />
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={() => setProjectFormVisible(false)}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default EventsPage;
