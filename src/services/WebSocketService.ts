// WebSocketService.js

const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", event => {
    event.preventDefault();
  console.log("WebSocket connected");
  socket.send("Connection established");
});

// Listen for messages
socket.addEventListener("message", event => {
  console.log("Message from server: ", event.data);
});

// Function to send a message
export const sendMessage = (message:any) => {
  socket.send(JSON.stringify(message));
};

export default socket; // Export the socket instance
