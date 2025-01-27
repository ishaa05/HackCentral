import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TeamListPage.css';

function TeamListPage() {
 const location = useLocation();
 const navigate = useNavigate();
 const hackathonTitle = new URLSearchParams(location.search).get('hackathon'); // Get hackathon title from URL

 const [teams, setTeams] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [feedbackData, setFeedbackData] = useState([]);
 const [allSubmitted, setAllSubmitted] = useState(false);

 useEffect(() => {
 const fetchTeams = async () => {
 try {
 const response = await axios.get(`http://localhost:3000/api/teams/${hackathonTitle}`);
 setTeams(response.data);
 setLoading(false);
 // Initialize feedback data for each team
 setFeedbackData(response.data.map((team) => ({
 teamName: team.teamName,
 members: team.teamMembers,
 innovation: '',
 creativity: '',
 ux: '',
 businessPotential: '',
 feedback: '',
 submitted: false, // Track submission status
 })));
 } catch (err) {
 setError('Failed to fetch teams');
 setLoading(false);
 }
 };

 if (hackathonTitle) {
 fetchTeams();
 }
 }, [hackathonTitle]);

 const handleChange = (index, field, value) => {
 const updatedFeedbackData = [...feedbackData];
 updatedFeedbackData[index][field] = value;
 setFeedbackData(updatedFeedbackData);
 };

 const handleSubmit = async (index) => {
 const submittedData = feedbackData[index];

 // Validate scores
 const scores = ['innovation', 'creativity', 'ux', 'businessPotential'];
 const isValid = scores.every(score => {
 const value = Number(submittedData[score]);
 return !isNaN(value) && value >= 0 && value <= 10;
 });

 if (!isValid) {
 alert('Please ensure all scores are between 0 and 10');
 return;
 }

 if (!submittedData.feedback.trim()) {
 alert('Please provide feedback before submitting');
 return;
 }

 try {
 // Send feedback data to backend
 await axios.post('http://localhost:3000/api/teams/feedback', submittedData);

 // Update the local state to mark this team as submitted
 const updatedFeedbackData = [...feedbackData];
 updatedFeedbackData[index].submitted = true;
 setFeedbackData(updatedFeedbackData);

 // Check if all teams have been submitted
 const allTeamsSubmitted = updatedFeedbackData.every(team => team.submitted);
 if (allTeamsSubmitted) {
 setAllSubmitted(true);
 navigate('/leaderboard');
 }
 } catch (error) {
 console.error('Error submitting feedback:', error);
 alert('An error occurred while submitting feedback');
 }
 };

 const getTeamAvatar = (name) => {
 return name.split(' ').map(word => word[0]).join('').toUpperCase();
 };

 const handleFinalSubmit = () => {
 // Ensure all teams have been submitted before navigating
 const allTeamsSubmitted = feedbackData.every(team => team.submitted);
 if (allTeamsSubmitted) {
 navigate('/leaderboard');
 } else {
 alert('Please submit feedback for all teams');
 }
 };

 if (loading) {
 return (
 <div className="loading-spinner">
 <div className="spinner"></div>
 Loading teams...
 </div>
 );
 }

 if (error) {
 return (
 <div className="error-message">
 {error}
 </div>
 );
 }

 return (
 <div className="team-list-page">
 <div className="page-header">
 <h1>{hackathonTitle}</h1>
 <p>Provide your feedback and scoring for each participating team</p>
 </div>
 
 <div className="feedback-table-container">
 <table className="feedback-table">
 <thead>
 <tr>
 <th>Team</th>
 <th>Members</th>
 <th>Innovation</th>
 <th>Creativity</th>
 <th>UX</th>
 <th>Business Potential</th>
 <th>Feedback</th>
 <th>Action</th>
 </tr>
 </thead>
 <tbody>
 {feedbackData.map((data, index) => (
 <tr key={data.teamName}>
 <td>
 <div className="team-name-cell">
 <div className="team-avatar">
 {getTeamAvatar(data.teamName)}
 </div>
 <div>
 <div style={{ fontWeight: 500 }}>{data.teamName}</div>
 </div>
 </div>
 </td>
 <td>
 <div>
 {data.members.map((member) => (
 <p key={member.email}>{member.name}</p>
 ))}
 </div>
 </td>
 <td>
 <input
 type="number"
 className="input-score"
 placeholder="0-10"
 value={data.innovation}
 onChange={(e) => handleChange(index, 'innovation', e.target.value)}
 max={10}
 min={0}
 />
 </td>
 <td>
 <input
 type="number"
 className="input-score"
 placeholder="0-10"
 value={data.creativity}
 onChange={(e) => handleChange(index, 'creativity', e.target.value)}
 max={10}
 min={0}
 />
 </td>
 <td>
 <input
 type="number"
 className="input-score"
 placeholder="0-10"
 value={data.ux}
 onChange={(e) => handleChange(index, 'ux', e.target.value)}
 max={10}
 min={0}
 />
 </td>
 <td>
 <input
 type="number"
 className="input-score"
 placeholder="0-10"
 value={data.businessPotential}
 onChange={(e) => handleChange(index, 'businessPotential', e.target.value)}
 max={10}
 min={0}
 />
 </td>
 <td>
 <input
 type="text"
 className="input-feedback"
 placeholder="Provide detailed feedback"
 value={data.feedback}
 onChange={(e) => handleChange(index, 'feedback', e.target.value)}
 />
 </td>
 <td>
 <button 
 className="submit-button"
 onClick={() => handleSubmit(index)}
 disabled={data.submitted}
 >
 {data.submitted ? 'Submitted' : 'Submit Feedback'}
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>

 {allSubmitted && (
 <div className="final-submit-container">
 <button 
 className="final-submit-button"
 onClick={handleFinalSubmit}
 >
 View Leaderboard
 </button>
 </div>
 )}
 </div>
 </div>
 );
}

export default TeamListPage;