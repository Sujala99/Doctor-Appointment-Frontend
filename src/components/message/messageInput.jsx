import { useState } from "react";
import { useSocket } from "../../context/SocketContext";

const MessageInput = ({ receiverId, setMessages }) => {
  const [message, setMessage] = useState("");
  const socket = useSocket();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      senderId: localStorage.getItem("userId"), 
      receiverId,
      message,
    };

    // Emit message to socket server
    if (socket) {
      socket.emit("sendMessage", {
        room: receiverId, 
        ...newMessage,
      });

      // Update UI instantly
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
