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
    image: "", // Ensure it's 'image' as per backend response
  });

  const [newProfilePic, setNewProfilePic] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Fetch user profile
  useEffect(() => {
    fetch("http://localhost:4000/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [token]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmNewPassword") setConfirmNewPassword(value);
  };

  // Handle profile picture change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(URL.createObjectURL(file)); // Show preview

      const formData = new FormData();
      formData.append("profilePicture", file); // Use "image" (matches backend)

      try {
        const response = await fetch("http://localhost:4000/users/uploadImage", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          setUser((prevUser) => ({ ...prevUser, image: data.filename })); // Ensure "image" field is updated
        } else {
          console.error("Error uploading image:", data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate new password
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    const updatedUserData = { ...user };

    // If new password is provided, add it to the request payload
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
        navigate(-1); // Go back
      } else {
        console.error("Error updating profile:", data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

        {/* Profile Picture Preview */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={
              newProfilePic ||
              (user.image ? `http://localhost:4000/uploads/${user.image}` : "/default-avatar.png")
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
          />
          <label className="mt-2 text-sm text-purple-600 cursor-pointer hover:underline">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            Change Profile Picture
          </label>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[{ label: "Full Name", name: "fullname", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phonenumber", type: "text" },
            { label: "Gender", name: "gender", type: "text" },
            { label: "Address", name: "address", type: "text" }]
            .map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={user[name]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
            ))}

          {/* Password Fields */}
          <div>
            <label className="block text-sm font-medium">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 w-1/2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 w-1/2"
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
