import { useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import React from 'react';
const ChatBox = ({ selectedUser, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Don't send empty message
    // Add the new message to the local state
    setMessages([...messages, { sender: 'You', text: newMessage }]);
    setNewMessage('');
  };

  return (
    <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column' }}>
      {selectedUser ? (
        <>
          <h3>Chatting with {selectedUser.name}</h3>
          <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
            {messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))}
          </div>
          <MessageInput
            message={newMessage}
            setMessage={setNewMessage}
            onSend={handleSendMessage}
          />
        </>
      ) : (
        <div>Select a user to chat</div>
      )}
    </div>
  );
};

export default ChatBox;
