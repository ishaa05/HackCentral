import React, { useState } from "react";
import axios from "axios";

const Team = () => {
  const [skill, setSkill] = useState("");
  const [interest, setInterest] = useState("");
  const [participation, setParticipation] = useState(5); // Default participation value
  const [topStudents, setTopStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    const userData = { skill, interest, participation };

    try {
      console.log("Sending data:", userData); // Log data being sent
      const response = await axios.post("http://localhost:3000/api/recommendStudents", userData);
      setTopStudents(response.data); // Update top students list
    } catch (error) {
      console.error("Error fetching top students:", error);
      setErrorMessage("Could not fetch students. Please try again later.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Find Your Top 10 Students</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "15px" }}>
          <label>Skill:</label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            required
            placeholder="e.g., Python"
            style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Interest:</label>
          <input
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            required
            placeholder="e.g., AI"
            style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Participation Level (1-10):</label>
          <input
            type="number"
            value={participation}
            onChange={(e) => setParticipation(Number(e.target.value))}
            min="1"
            max="10"
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Find Top 10 Students
        </button>
      </form>

      {errorMessage && (
        <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>{errorMessage}</div>
      )}

      <h2 style={{ textAlign: "center", marginTop: "30px" }}>Top 10 Students:</h2>
      <ul style={{ maxWidth: "400px", margin: "0 auto", listStyle: "none", padding: 0 }}>
        {topStudents.map((student, index) => (
          <li
            key={index}
            style={{
              backgroundColor: "#f9f9f9",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{student.Name}</span>
            <span>Score: {student.SimilarityScore.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
