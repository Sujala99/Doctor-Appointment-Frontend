const Message = ({ message }) => {
    return (
      <div className={`message ${message.sender === 'You' ? 'sent' : 'received'}`} style={{ padding: '10px' }}>
        <p>{message.text}</p>
      </div>
    );
  };
  
  export default Message;
  