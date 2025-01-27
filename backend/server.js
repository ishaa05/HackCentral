

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"], // Allow frontend origins
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle joining a room
  socket.on("joinRoom", (roomID) => {
    socket.join(roomID);
    console.log(`User joined room: ${roomID}`);
  });

  // Handle receiving a message and broadcasting it to the room
  socket.on("message", (msgData) => {
    const { roomID, username, message } = msgData;
    io.to(roomID).emit("message", { username, message });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
