import { useState, useEffect } from "react";
import { fetchSidebarUsers } from "../../components/message/chatService"; // Import fetchSidebarUsers

const ChatSidebar = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchSidebarUsers();
        setUsers(response.data); // Store the fetched users in state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call function to fetch users on component mount
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()) // Filter users based on search input
  );

  return (
    <div style={{ width: "300px", padding: "10px", backgroundColor: "#f5f5f5", height: "100%" }}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search value on input change
        placeholder="Search..."
        style={{ width: "100%", padding: "10px" }}
      />
      <ul style={{ marginTop: "10px" }}>
        {filteredUsers.map((user) => (
          <li key={user._id} style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
            <Link to={`/messages/${user._id}`} style={{ textDecoration: "none", color: "black" }}>
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
