const ChatListItem = ({ user, onClick }) => {
  return (
    <div
      onClick={() => onClick(user)}  // Pass user to parent onClick
      style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ddd' }}
    >
      {user.username}
    </div>
  );
};

export default ChatListItem;
