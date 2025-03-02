import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    phonenumber: "",
    dob: "",
    gender: "",
    address: "",
    image: "",
  });

  const [newProfilePic, setNewProfilePic] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmNewPassword") setConfirmNewPassword(value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await fetch("http://localhost:4000/users/uploadImage", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          setUser((prevUser) => ({ ...prevUser, image: data.filename }));
        } else {
          console.error("Error uploading image:", data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    const updatedUserData = { ...user };
    if (newPassword) {
      updatedUserData.password = newPassword;
    }

    try {
      const response = await fetch("http://localhost:4000/users/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        navigate(-1);
      } else {
        console.error("Error updating profile:", data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Edit Profile</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              newProfilePic ||
              (user.image ? `http://localhost:4000/uploads/${user.image}` : "/default-avatar.png")
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-purple-500 object-cover"
          />
          <label className="mt-2 text-sm text-purple-600 cursor-pointer hover:underline">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            Change Profile Picture
          </label>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Full Name", name: "fullname", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phonenumber", type: "text" },
            { label: "Gender", name: "gender", type: "text" },
            { label: "Address", name: "address", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={user[name] || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          ))}

          {/* Password Change Section */}
          <div className="space-y-3 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
