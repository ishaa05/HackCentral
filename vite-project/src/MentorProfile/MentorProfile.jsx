// import React from 'react'
 
//  const MentorProfile = () => {
//    return (
//      <div>MentorProfile</div>
//    )
//  }
 
//  export default MentorProfile

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Users, Send } from "react-feather";

const MentorProfile = () => {
  const [messages, setMessages] = useState([]); // Stores all messages
  const [message, setMessage] = useState(""); // Current message input
  const [username, setUsername] = useState(""); // User's name
  const [roomID, setRoomID] = useState(""); // Chat room ID
  const [isJoined, setIsJoined] = useState(false); // Whether user has joined
  const [socket, setSocket] = useState(null); // Socket instance

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.close(); // Clean up socket connection on component unmount
    };
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    if (socket && isJoined) {
      socket.on("message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]); // Add to messages
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket, isJoined]);

  // Handle joining the chat
  const joinChat = (e) => {
    e.preventDefault();
    if (username.trim() && roomID.trim() && socket) {
      socket.emit("joinRoom", roomID); // Notify server about joining
      setIsJoined(true);
    }
  };

  // Handle sending a message
  // Handle sending a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const msgData = { username, message, roomID }; // Message data
      socket.emit("message", msgData); // Emit message to server
  
      // Clear input field only
      setMessage(""); 
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6">
        <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
          <Users className="mr-4" /> Professional Chat Room
        </h2>
      </div>
      <div className="p-8">
        {!isJoined ? (
          <form onSubmit={joinChat} className="space-y-6">
            <input
              type="text"
              className="w-full px-6 py-4 border-2 border-blue-200 rounded-full focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none text-lg"
              placeholder="Enter your professional username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-6 py-4 border-2 border-blue-200 rounded-full focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none text-lg"
              placeholder="Enter Room ID"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Join Chat
            </button>
          </form>
        ) : (
          <div className="flex flex-col h-[600px]">
            <div className="flex-grow overflow-y-auto border-2 border-blue-100 rounded-2xl p-6 mb-6 space-y-4 bg-blue-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-md border border-blue-100"
                >
                  <strong className="text-blue-800 mr-3 text-base">{msg.username}:</strong>
                  <span className="text-blue-700">{msg.message}</span>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex space-x-4">
              <input
                type="text"
                className="flex-grow px-6 py-4 border-2 border-blue-200 rounded-full focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none text-lg"
                placeholder="Type a professional message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-4 rounded-full hover:scale-110 transition-transform duration-300 shadow-xl"
              >
                <Send />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorProfile;


// import React, { useState } from 'react';
// import axios from 'axios';

// const MentorProfile = () => {
//   const [teamName, setTeamName] = useState('');
//   const [mentor, setMentor] = useState(null);
//   const [error, setError] = useState('');

//   const fetchMentor = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/team/mentor', {
//         params: { teamName },
//       });

//       setMentor(response.data.assignedMentor);
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//       setMentor(null);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Get Assigned Mentor</h2>
//       <input
//         type="text"
//         placeholder="Enter Team Name"
//         value={teamName}
//         onChange={(e) => setTeamName(e.target.value)}
//         style={{ padding: '10px', marginRight: '10px' }}
//       />
//       <button onClick={fetchMentor} style={{ padding: '10px' }}>
//         Fetch Mentor
//       </button>

//       {mentor && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>Assigned Mentor:</h3>
//           <p><strong>Name:</strong> {mentor.name || 'N/A'}</p>
//           <p><strong>Email:</strong> {mentor.email || 'N/A'}</p>
//         </div>
//       )}

//       {error && (
//         <div style={{ color: 'red', marginTop: '20px' }}>
//           <p>{error}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MentorProfile;