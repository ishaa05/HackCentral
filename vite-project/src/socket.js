import io from 'socket.io-client';

// Connect to Socket.IO
const socket = io("http://localhost:4000", {
  withCredentials: true,  // Allow sending cookies if needed
});

// Listen for events
socket.on('document-updated', (updatedDocument) => {
  console.log("Document updated:", updatedDocument);
});

// Emit events
socket.emit('join-document', docId);
socket.emit('edit-document', docId, { content: 'new content' });
