import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getAuthToken } from "../components/message/chatService"; 
import React from 'react';
const SOCKET_URL = "http://localhost:4000"; // Change for production

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = getAuthToken();

    if (!token) return; // Prevents connecting without a token

    const newSocket = io(SOCKET_URL, {
      query: { token },
      transports: ["websocket"],
      withCredentials: true,
      autoConnect: false, // Prevents auto-connect until `connectSocket` is called
    });

    newSocket.connect(); // Connect manually once the token is available
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
