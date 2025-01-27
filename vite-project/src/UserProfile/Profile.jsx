import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaUniversity, FaGraduationCap, FaBookOpen,
  FaProjectDiagram, FaArrowRight, FaMedal,
  FaGraduationCap as CapIcon,
  FaBriefcase,
  FaCode
} from 'react-icons/fa';
import axios from 'axios';

const StudentProfile = ({ userId }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    institution: '',
    major: '',
    graduationYear: '',
    avatar: '',
    badges: [],
    details: [],
    progress: { courses: 0, internships: 0, projects: 0 },
    progressDetails: []
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 'User33';
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        const user = response.data;
        setProfileData({
          name: user.name,
          institution: user.university,
          major: user.major,
          graduationYear: user.graduationYear,
          avatar: `https://api.dicebear.com/6.x/adventurer/svg?seed=${user.name}`,
          badges: user.badges || [],
          details: [
            {
              icon: <FaGraduationCap className="text-[#560bad] mr-3" />,
              label: 'Major',
              value: user.major,
            },
            {
              icon: <FaUniversity className="text-[#560bad] mr-3" />,
              label: 'Graduation',
              value: user.graduationYear,
            },
          ],
          progress: { courses: 75, internships: 2, projects: 5 },
          progressDetails: user.progressDetails || [],
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const streakData = [
    { day: 'Jan', study: 3 },
    { day: 'Feb', study: 4 },
    { day: 'Mar', study: 5 },
    { day: 'Apr', study: 4 },
    { day: 'May', study: 3 },
    { day: 'Jun', study: 2 },
    { day: 'Jul', study: 1 }
  ];

  const leaderboardData = [
    { name: 'Rhea Chopra', institution: 'Global Tech', points: 1200, medal: '🥇' },
    { name: 'Michael Smith', institution: 'Innovation Institute', points: 1100, medal: '🥈' },
    { name: 'Rohan Shah', institution: 'Future Academy', points: 1000, medal: '🥉' },
    { name: 'Alex Rodriguez', institution: 'Tech University', points: 950, medal: '' },
    { name: 'Tanya', institution: 'Pioneer College', points: 900, medal: '' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bbd0ff]/20 to-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-[#560bad]/20"
      >
        {/* Header with Avatar */}
        <div className="bg-gradient-to-r from-[#c8b6ff] to-[#c8b6ff] p-8 border-b-4 border-[#560bad]/20" style={{ color: '#560bad' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                src={profileData.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                <p className="text-xl flex items-center opacity-90">
                  <FaUniversity className="mr-2" />{profileData.institution}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-[#560bad] rounded-lg
                         hover:bg-[#bbd0ff]/10 flex items-center
                         transition-all duration-300 shadow-md hover:shadow-lg
                         border-2 border-[#560bad]/30"
              style={{ color: '#560bad' }}
            >
              Explore Events <FaArrowRight className="ml-2" />
            </motion.button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Enhanced Details Box */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="col-span-1 bg-gradient-to-br from-[#bbd0ff]/10 to-[#c8b6ff]/10
                       p-6 rounded-xl shadow-lg hover:shadow-xl
                       transition-all border-4 border-[#560bad]/30
                       flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-6 text-[#560bad] flex items-center">
              <FaGraduationCap className="mr-2" />Academic Profile
            </h2>
            <div className="space-y-4 flex-grow">
              {profileData.details.map((detail, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-center bg-white
                             p-4 rounded-lg shadow-md
                             hover:bg-[#bbd0ff]/10 transition-all"
                >
                  {detail.icon}
                  <div>
                    <div className="text-gray-600 text-sm">{detail.label}</div>
                    <div className="font-semibold text-[#560bad]">{detail.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Progress Box */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="col-span-1 bg-gradient-to-br from-[#bbd0ff]/10 to-[#c8b6ff]/10
                       p-6 rounded-xl shadow-lg hover:shadow-xl
                       transition-all border-4 border-[#560bad]/30"
          >
            <h2 className="text-xl font-semibold mb-6 text-[#560bad] flex items-center">
              <FaBookOpen className="mr-2" />Academic Progress
            </h2>
            <div className="space-y-6">
              {/* Course Progress */}
              <div>
                <div className="flex justify-between mb-2 items-center">
                  <span className="text-gray-600">Courses Completed</span>
                  <span className="font-semibold text-[#560bad]">{profileData.progress.courses}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${profileData.progress.courses}%` }}
                    transition={{ duration: 1, type: "spring" }}
                    className="bg-[#560bad] h-3 rounded-full"
                  />
                </div>
              </div>

              {/* Additional Progress Details */}
              <div className="grid grid-cols-2 gap-4">
                {profileData.progressDetails.map((detail, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center bg-white
                               p-3 rounded-lg shadow-md
                               hover:bg-[#bbd0ff]/10 transition-all"
                  >
                    {detail.icon}
                    <div>
                      <div className="text-gray-600 text-sm">{detail.label}</div>
                      <div className="font-semibold text-[#560bad]">{detail.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="col-span-1 bg-[#bbd0ff]/10 p-6 rounded-xl
                       shadow-md hover:shadow-lg transition-all
                       border-4 border-[#560bad]/30"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#560bad]">
              Achievements
            </h2>
            <div className="space-y-4">
              {profileData.badges.map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center p-3 rounded-lg
                             bg-gradient-to-r ${badge.color}
                             transform transition-all duration-300`}
                >
                  <span className="text-2xl mr-3">{badge.icon}</span>
                  <div className="text-black">
                    <div className="font-semibold">{badge.name}</div>
                    <div className="text-xs opacity-90">{badge.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Streak Graph and Leaderboard Container */}
          <motion.div
            className="col-span-1 md:col-span-2 lg:col-span-3
                       grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Streak Graph */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#b8c0ff]/20 p-6 rounded-xl
                         shadow-md hover:shadow-lg transition-all
                         border-4 border-[#560bad]/30"
            >
              <h2 className="text-xl font-semibold mb-6 text-[#560bad] flex items-center">
                <FaProjectDiagram className="mr-2" />Yearly Stats
              </h2>
              <div className="flex justify-between items-end h-48">
                {streakData.map((day, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      style={{ height: `${day.study * 20}px` }}
                      className="w-12 bg-gradient-to-t from-[#b8c0ff] to-[#c8b6ff]
                               rounded-t-lg hover:opacity-80 transition-all duration-300"
                    />
                    <span className="mt-2 text-gray-600 font-medium">{day.day}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Global Leaderboard */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#bbd0ff]/10 p-6 rounded-xl
                         shadow-md hover:shadow-lg transition-all
                         border-4 border-[#560bad]/30"
            >
              <h2 className="text-xl font-semibold mb-6 text-[#560bad] flex items-center">
                <FaMedal className="mr-2" />Global Leaderboard
              </h2>
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="flex justify-between items-center p-4
                               bg-[#b8c0ff]/10 rounded-lg
                               shadow-md hover:shadow-lg transition-all
                               border border-[#560bad]/20"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-semibold">{user.medal}</span>
                      <div>
                        <div className="font-medium text-gray-800" style={{ color: '#560bad' }}>{user.name}</div>
                        <div className="text-sm text-gray-600">{user.institution}</div>
                      </div>
                    </div>
                    <div className="text-[#560bad] font-semibold">{user.points} pts</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentProfile;