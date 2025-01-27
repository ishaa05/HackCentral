const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Setup Socket.IO with CORS for the frontend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust to your frontend's address
    methods: ["GET", "POST"],
  },
});

// WebRTC signaling logic
io.on("connection", (socket) => {
  console.log("A user connected");

  // Hardcoded room for simplicity
  const roomId = "single-room";
  socket.join(roomId);
  console.log(`User joined room: ${roomId}`);

  // Handle WebRTC offer
  socket.on("offer", (offer) => {
    console.log("Received offer:", offer);
    socket.to(roomId).emit("receive-offer", offer); // Broadcast offer to other participants
  });

  // Handle WebRTC answer
  socket.on("answer", (answer) => {
    console.log("Received answer:", answer);
    socket.to(roomId).emit("receive-answer", answer); // Broadcast answer to other participants
  });

  // Handle ICE candidates
  socket.on("ice-candidate", (candidate) => {
    console.log("Received ICE candidate:", candidate);
    socket.to(roomId).emit("receive-candidate", candidate); // Broadcast ICE candidates to other participants
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
