// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './TeamList.css'; // Updated CSS file for improved styling

// function TeamList() {
//   const location = useLocation();
//   const hackathonTitle = new URLSearchParams(location.search).get('hackathon'); // Get hackathon title from URL

//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/teams/${hackathonTitle}`);
//         setTeams(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch teams');
//         setLoading(false);
//       }
//     };

//     if (hackathonTitle) {
//       fetchTeams();
//     }
//   }, [hackathonTitle]);

//   const getTeamAvatar = (name) => {
//     return name.split(' ').map((word) => word[0]).join('').toUpperCase();
//   };

//   if (loading) {
//     return (
//       <div className="loading-spinner">
//         <div className="spinner"></div>
//         Loading teams...
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="team-list-page">
//       <div className="page-header">
//         <h1>{hackathonTitle}</h1>
//         <p>Participating Teams</p>
//       </div>

//       <div className="team-list-container">
//         <ul className="team-list">
//           {teams.map((team) => (
//             <li key={team.teamName} className="team-item">
//               <div className="team-avatar">{getTeamAvatar(team.teamName)}</div>
//               <span className="team-name">{team.teamName}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default TeamList;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Clock, User, Star, CheckCircle } from 'lucide-react';

const AdditionalInfoCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden transform transition-all hover:scale-105">
      <div className="bg-gradient-to-r from-green-600 to-blue-800 p-6">
        <h2 className="text-3xl font-bold text-white text-center">
          Mentor Mentee Connect
        </h2>
      </div>
      <div className="p-8 text-center">
        <p className="text-green-800 mb-6 text-lg font-medium">
          Find the perfect time slot for your mentor connection
        </p>
        <a
          href="http://localhost:8504/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-green-600 to-blue-800 text-white py-4 px-8 rounded-full text-lg font-semibold hover:scale-110 transition-transform duration-300 shadow-xl hover:shadow-2xl"
        >
          Get Timeslot
        </a>
      </div>
    </div>
  );
};

function TeamList() {
  const location = useLocation();
  const hackathonTitle = new URLSearchParams(location.search).get('hackathon');

  const [teams, setTeams] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMentors, setSelectedMentors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsResponse = await axios.get(
          `http://localhost:3000/api/teams/${hackathonTitle}`
        );
        setTeams(teamsResponse.data);

        const eventResponse = await axios.get(
          `http://localhost:3000/api/event/${hackathonTitle}`
        );
        setMentors(eventResponse.data.mentors || []);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    if (hackathonTitle) {
      fetchData();
    }
  }, [hackathonTitle]);

  const getTeamAvatar = (name) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();

  const handleMentorAssignmentWithTime = async (
    teamName,
    mentorName,
    mentorEmail,
    scheduleTime
  ) => {
    if (!scheduleTime) {
      alert('Please enter a schedule time for the mentor assignment.');
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/teams/${teamName}/mentor`,
        {
          mentorName,
          mentorEmail,
          scheduleTime,
        }
      );

      const updatedTeam = response.data;
      setTeams(
        teams.map((team) =>
          team.teamName === teamName
            ? {
                ...team,
                assignedMentor: { mentorName, mentorEmail },
                scheduleTime: scheduleTime,
              }
            : team
        )
      );

      // Update selected mentors state
      setSelectedMentors(prev => ({
        ...prev,
        [teamName]: { mentorName, mentorEmail }
      }));
    } catch (err) {
      console.error(
        'Failed to assign mentor',
        err.response ? err.response.data : err
      );
      alert('Failed to assign mentor: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleScheduleTimeChange = (teamName, scheduleTime) => {
    setTeams(
      teams.map((team) =>
        team.teamName === teamName
          ? { ...team, scheduleTime }
          : team
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin w-16 h-16 border-t-4 border-blue-600 rounded-full"></div>
          <p className="text-xl text-blue-800 font-semibold">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-red-600 text-2xl font-bold mb-4">Oops!</p>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            {hackathonTitle}
          </h1>
          <p className="text-xl text-gray-600 flex items-center justify-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            Participating Teams
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team._id}
              className="bg-white rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold rounded-full shadow-md">
                    {getTeamAvatar(team.teamName)}
                  </div>
                  {team.assignedMentor && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {team.teamName}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign Mentor
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      onChange={(e) => {
                        const [mentorName, mentorEmail] = e.target.value.split('|');
                        handleMentorAssignmentWithTime(
                          team.teamName,
                          mentorName,
                          mentorEmail,
                          team.scheduleTime || new Date().toISOString()
                        );
                      }}
                      value={
                        selectedMentors[team.teamName]
                          ? `${selectedMentors[team.teamName].mentorName}|${selectedMentors[team.teamName].mentorEmail}`
                          : ''
                      }
                    >
                      <option value="" disabled>
                        Select a Mentor
                      </option>
                      {mentors.map((mentor) => (
                        <option
                          key={mentor._id}
                          value={`${mentor.name}|${mentor.email}`}
                        >
                          {mentor.name} ({mentor.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      Schedule Time
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      value={team.scheduleTime || ''}
                      onChange={(e) =>
                        handleScheduleTimeChange(team.teamName, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div>
            <AdditionalInfoCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamList;