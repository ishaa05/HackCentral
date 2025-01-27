import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const navigate = useNavigate();

  const profileData = {
    name: 'Alex Rodriguez',
    institution: 'Tech University',
    major: 'Computer Science',
    graduationYear: 2025,
    badges: [
      { name: 'Hackathon Winner', color: 'bg-purple-500' },
      { name: 'Dean\'s List', color: 'bg-blue-500' },
      { name: 'Research Assistant', color: 'bg-green-500' }
    ],
    progress: {
      courses: 75,
      internships: 2,
      projects: 5
    }
  };

  // Yearly activity data
  const yearlyActivity = [
    { month: 'Jan', activity: 25 },
    { month: 'Feb', activity: 20 },
    { month: 'Mar', activity: 30 },
    { month: 'Apr', activity: 15 },
    { month: 'May', activity: 40 },
    { month: 'Jun', activity: 35 },
    { month: 'Jul', activity: 25 },
    { month: 'Aug', activity: 30 },
    { month: 'Sep', activity: 20 },
    { month: 'Oct', activity: 10 },
    { month: 'Nov', activity: 15 },
    { month: 'Dec', activity: 50 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{profileData.name}</h1>
            <p className="text-xl">{profileData.institution}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50"
          >
            Explore Events
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-6 grid grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="col-span-1 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Details</h2>
            <div className="space-y-2">
              <p><strong>Major:</strong> {profileData.major}</p>
              <p><strong>Graduation:</strong> {profileData.graduationYear}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="col-span-1 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Badges</h2>
            <div className="space-y-2">
              {profileData.badges.map((badge, index) => (
                <div 
                  key={index} 
                  className={`${badge.color} text-white px-3 py-1 rounded-full inline-block mr-2`}
                >
                  {badge.name}
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="col-span-1 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Progress</h2>
            <div className="space-y-2">
              <p>Courses Completed: {profileData.progress.courses}%</p>
              <p>Internships: {profileData.progress.internships}</p>
              <p>Projects: {profileData.progress.projects}</p>
            </div>
          </div>

          {/* Yearly Activity Graph */}
          <div className="col-span-3 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Yearly Activity</h2>
            <div className="flex justify-between items-end">
              {yearlyActivity.map((month, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center"
                >
                  <div 
                    style={{ height: `${month.activity * 2}px` }} // Adjust bar height multiplier for better visualization
                    className="w-6 bg-purple-500 mb-2 rounded"
                  ></div>
                  <span className="text-sm">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;






