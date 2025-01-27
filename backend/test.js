const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // CORS middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow frontend (localhost:5173)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

// Enable CORS for Express routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Hardcoded document state
let document = {
  docId: 'doc1', // Hardcoded document ID
  content: '',    // Document content, initially empty
};

// Serve the document
app.get('/document/:id', (req, res) => {
  const docId = req.params.id;
  if (docId === 'doc1') {
    return res.json(document); // Return the document if it's "doc1"
  }
  res.status(404).send('Document not found');
});

// Real-time collaboration with socket.io
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Emit the current document content when a user connects
  socket.emit('document-updated', document);

  // Handle users joining the document
  socket.on('join-document', (docId) => {
    if (docId === 'doc1') {
      socket.join(docId); // Join "doc1" room
    }
  });

  // Handle document edits
  socket.on('edit-document', (docId, change) => {
    if (docId === 'doc1') {
      document.content = change.content; // Update the document content
      // Broadcast the updated content to all users connected to "doc1"
      io.to(docId).emit('document-updated', document);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
