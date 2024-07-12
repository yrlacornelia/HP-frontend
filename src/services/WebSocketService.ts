

const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", event => {
    event.preventDefault();
  console.log("WebSocket connected");
  socket.send("Connection established");
});

socket.addEventListener("message", event => {
  console.log("Message from server: ", event.data);
});

export const sendMessage = (message:any) => {
  socket.send(JSON.stringify(message));
};

export default socket; // Export the socket instance
