const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// When a client connects
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for 'message' event from the client
  socket.on("message", (msgData) => {
    console.log("Received message:", msgData);

    // Broadcast the message to all connected clients
    io.emit("message", msgData);
  });

  // When a client disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});