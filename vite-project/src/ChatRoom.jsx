import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001"); // Connect to backend

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Receive messages from server
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup socket on unmount
    return () => {
      socket.off("message");
    };
  }, []);

  const joinChat = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (username.trim()) {
      setIsJoined(true); // Allow the user to enter the chat room
    }
  };

  const sendMessage = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (message.trim()) {
      const msgData = { username, message };
      socket.emit("message", msgData); // Send message to server
      setMessage(""); // Clear input
    }
  };

  return (

      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Chat Room
        </h2>
        {!isJoined ? (
          <form onSubmit={joinChat} className="flex flex-col items-center">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Join Chat
            </button>
          </form>
        ) : (
          <div>
            <div
              className="border border-gray-300 rounded-lg p-4 mb-4 h-[700px] overflow-y-scroll"
              style={{ scrollbarWidth: "thin" }}
            >
              {messages.map((msg, index) => (
                <p key={index} className="text-sm mb-2">
                  <strong className="text-gray-800">{msg.username}</strong>:{" "}
                  {msg.message}
                </p>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
   
  );
};

export default ChatRoom;