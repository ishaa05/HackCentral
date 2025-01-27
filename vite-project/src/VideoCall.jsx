import React from "react";

const VideoCall = () => {
  // Hardcoded Google Meet link
  const meetLink = "https://meet.google.com/def-nvfy-exc"; // Replace with your Google Meet link

  // Function to handle the button click and redirect to Google Meet link
  const joinMeeting = () => {
    window.location.href = meetLink;
  };

  return (
    <div>
      <h2>Join Video Conference</h2>
      <button onClick={joinMeeting} style={styles.button}>
        Join Now
      </button>
    </div>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#1a73e8",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default VideoCall;
