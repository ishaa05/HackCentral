import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamDetails = () => {
  const [team, setTeam] = useState(null);
  const [scheduleTime, setScheduleTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId"); // Get userId from local storage

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    // Fetch team data by userId
    axios
      .get(`/api/teams?userId=${userId}`) // Replace with your backend API endpoint
      .then((response) => {
        setTeam(response.data);
        setScheduleTime(response.data.scheduleTime || ""); // Pre-fill if scheduleTime exists
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching team data");
        setLoading(false);
      });
  }, [userId]);

  const handleSchedule = (e) => {
    e.preventDefault();

    // Update scheduleTime in the backend
    axios
      .patch(`/api/teams/schedule`, { userId, scheduleTime }) // Use userId to update scheduleTime
      .then((response) => {
        setTeam(response.data); // Update team data with new scheduleTime
        alert("Session scheduled successfully!");
      })
      .catch((err) => {
        alert("Failed to schedule session");
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">
        Team Details
      </h2>
      <p>
        <strong>Team Name:</strong> {team.teamName}
      </p>
      <p>
        <strong>Hackathon ID:</strong> {team.hackathonId}
      </p>
      <p>
        <strong>Registered:</strong> {team.isRegistered ? "Yes" : "No"}
      </p>
      <p>
        <strong>Session Scheduled:</strong>{" "}
        {team.scheduleTime
          ? new Date(team.scheduleTime).toLocaleString()
          : "Not Scheduled"}
      </p>

      <h3 className="text-xl font-semibold text-blue-600 mt-6 mb-2">
        Schedule a Session
      </h3>
      <form onSubmit={handleSchedule} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Select Date & Time:</span>
          <input
            type="datetime-local"
            className="block w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Schedule
        </button>
      </form>
    </div>
  );
};

export default TeamDetails;
