import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext"; 
import MessageInput from '../../components/message/MessageInput';
import Message from '../../components/message/Message'; 
import { fetchMessages } from '../../components/message/chatService'; 
import Nav from "../../components/navbar";
import React from "react";

const MessagePage = () => {
  const { userId } = useParams();
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await fetchMessages(userId);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatMessages();

    if (socket) {
      socket.emit("register", userId); // Register user with their socket

      socket.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [userId, socket]);

  return (
    <div>
      <Nav />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '300px', background: '#f5f5f5' }}>
          {/* Sidebar could go here */}
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          {loading ? <p>Loading...</p> : (
            <>
              <h2>Chat with {userId}</h2>
              <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
                {messages.map((msg) => (
                  <Message key={msg._id} message={msg} />
                ))}
              </div>
              <MessageInput receiverId={userId} setMessages={setMessages} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
