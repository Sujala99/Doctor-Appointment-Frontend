import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const token = localStorage.getItem("token");

  // Get all users
  useEffect(() => {
    fetch("http://localhost:4000/users/getallusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized - Please log in again.");
        return res.json();
      })
      .then((data) => setUsers(data.users || []))
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, []);

  // Handle edit user
  const handleEdit = (user) => {
    setEditUser({ ...user });
  };

  // Handle update user
  const handleUpdateUser = () => {
    fetch(`http://localhost:4000/users/updateuser/${editUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editUser),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
        setEditUser(null); // Close the form after saving
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (id) => {
    setDeleteUserId(id);
  };

  // Handle delete user
  const handleDeleteUser = () => {
    if (!deleteUserId) return;

    fetch(`http://localhost:4000/users/deleteuser/${deleteUserId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setUsers(users.filter((user) => user._id !== deleteUserId));
      })
      .catch((err) => console.error("Error deleting user:", err))
      .finally(() => setDeleteUserId(null));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">View Users</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-purple-600 text-white">
                {[
                  "Username",
                  "Phone",
                  "Email",
                  "Full Name",
                  "DOB",
                  "Gender",
                  "Address",
                  "Role",
                  "Actions",
                ].map((header) => (
                  <th key={header} className="p-3 border border-gray-400 text-center text-sm md:text-base">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-white text-gray-700 hover:bg-purple-100 text-sm md:text-base">
                  <td className="p-3 border border-gray-300">{user.username}</td>
                  <td className="p-3 border border-gray-300">{user.phonenumber}</td>
                  <td className="p-3 border border-gray-300">{user.email}</td>
                  <td className="p-3 border border-gray-300">{user.fullname}</td>
                  <td className="p-3 border border-gray-300">{user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}</td>
                  <td className="p-3 border border-gray-300">{user.gender}</td>
                  <td className="p-3 border border-gray-300">{user.address}</td>
                  <td className="p-3 border border-gray-300 font-bold">
                    <span className={user.role === "admin" ? "text-red-500" : "text-blue-500"}>{user.role}</span>
                  </td>
                  <td className="p-3 border border-gray-300 flex justify-center space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded w-20" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded w-20" onClick={() => handleDeleteConfirm(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit User Form */}
        {editUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-xl font-bold mb-4">Edit User</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {["username", "phonenumber", "fullname", "dob","addres","Role", "gender", "email", ].map((field) => (
                        <input
                          key={field}
                          type={field === "dob" ? "date" : "text"}
                          value={editUser[field]}
                          onChange={(e) => setEditUser({ ...editUser, [field]: e.target.value })}
                          className="border border-gray-300 p-2 rounded"
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                      ))}
                    </div>
                    <div className="flex justify-end space-x-3 mt-4">
                      <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setEditUser(null)}>Cancel</button>
                      <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={handleUpdateUser}>Update</button>
                    </div>
                  </div>
                </div>
              )}

        {/* Delete Confirmation Modal */}
        {deleteUserId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg text-center">
              <p className="text-lg font-semibold">Are you sure you want to delete this user?</p>
              <div className="flex justify-center space-x-4 mt-4">
                <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setDeleteUserId(null)}>
                  No
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={handleDeleteUser}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;














