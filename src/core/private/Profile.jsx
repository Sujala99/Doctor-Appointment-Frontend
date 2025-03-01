import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import loginImage from "../../assets/images/login.png";
import Nav from "../../components/navbar";

function Profile() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [profile, setProfile] = useState(null); // Initialize profile as null until fetched
  const token = localStorage.getItem("token"); // Assuming you have a token in local storage

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    fetch("http://localhost:4000/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data)) // Set the whole data as profile
      .catch((err) => console.error("Error fetching profile:", err));
  }, [token]);

  if (!profile) {
    return <div>Loading...</div>; // Display loading while data is being fetched
  }

  // Assuming 'role' is part of the profile data
  const isDoctor = profile.role === "doctor"; // Check if the logged-in user is a doctor

  return (
    <div>
        <div>
            <Nav/>
        </div>
    
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row relative">
        {/* Edit Profile Button */}
        <Link
          to="/editprofile"
          className="absolute top-4 right-4 bg-[#7E3F98] text-white px-4 py-2 rounded-md"
        >
          Edit Profile
        </Link>

        {/* Profile Image */}
        <div className="w-full sm:w-2/5 flex justify-center mb-4 sm:mb-0">
          <img
            className="h-32 w-32 object-cover rounded-full border-4 border-[#7E3F98]"
            src={`http://localhost:4000/uploads/${profile.image}`}
            alt="Profile"
          />
        </div>

        {/* Profile Info */}
        <div className="w-full sm:w-3/5 flex flex-col justify-between space-y-4">
          <div>
            {/* Common Profile Data for User and Admin */}
            <h2 className="text-xl font-semibold text-gray-800">{profile.fullname}</h2>
            <h3 className="text-lg text-gray-700">{profile.username}</h3>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-gray-600">{profile.address}</p>
            <p className="text-gray-600">{profile.phonenumber}</p>
            <p className="text-sm text-gray-500">{profile.dob}</p>
            <p className="text-sm text-gray-500">{profile.gender}</p>

            {isDoctor && (
              <>
                {/* Doctor-Specific Profile Data */}
                <p className="text-sm text-gray-500">{profile.description}</p>
                <p className="text-sm text-gray-500">{profile.specialization}</p>
                <p className="text-sm text-gray-500">{profile.qualification}</p>
                <p className="text-sm text-gray-500">{profile.experience} years of experience</p>
                <h3 className="text-lg font-semibold text-[#7E3F98] mt-2">Rs. {profile.fees}</h3>
                <p className="text-xs text-gray-500 mt-2">{profile.availableSlots}</p>
              </>
            )}
          </div>

          {/* Dropdown */}
          <div>
            {isDropdownVisible && (
              <div
                id="userDropdown"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 absolute mt-2"
              >
                <div className="px-4 py-3 text-sm text-gray-900">
                  <div>{profile.fullname}</div>
                  <div className="font-medium truncate">{profile.email}</div>
                  <div className="font-medium truncate">{profile.username}</div>
                  <div className="font-medium truncate">{profile.address}</div>
                </div>
                
                <div className="py-1">
                  <a
                    href="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;
