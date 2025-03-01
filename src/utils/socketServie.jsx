import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000"; // Change in production

const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // Prevents auto-connection
});

// Function to register a user with their ID
export const registerUser = (userId) => {
  if (socket && userId) {
    socket.emit("register", userId);
  }
};

// Function to join a chat room
export const joinRoom = (room) => {
  if (socket) {
    socket.emit("joinRoom", room);
  }
};

// Function to send a message
export const sendMessage = (messageData) => {
  if (socket) {
    socket.emit("sendMessage", messageData);
  }
};

// Function to listen for incoming messages
export const listenForMessages = (callback) => {
  if (socket) {
    socket.on("receiveMessage", callback);
  }
};

// Function to disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

// Function to manually connect socket (useful after login)
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export default socket;
