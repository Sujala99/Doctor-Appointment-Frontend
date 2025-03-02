import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/navbar";

function Profile() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");

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
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [token]);

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const isDoctor = profile.role === "doctor";

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />

      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row relative">
          {/* Edit Profile Button - floats for larger screens, stacks for mobile */}
          <div className="absolute top-4 right-4">
            <Link
              to="/editprofile"
              className="bg-[#7E3F98] text-white text-sm px-4 py-2 rounded-md hover:bg-[#652f7e] transition"
            >
              Edit Profile
            </Link>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center md:justify-start w-full md:w-1/3 mb-6 md:mb-0">
            <img
              className="h-32 w-32 object-cover rounded-full border-4 border-[#7E3F98]"
              src={`http://localhost:4000/uploads/${profile.image}`}
              alt="Profile"
            />
          </div>

          {/* Profile Info */}
          <div className="w-full md:w-2/3 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{profile.fullname}</h2>
            <h3 className="text-lg text-gray-700">@{profile.username}</h3>
            <p className="text-gray-600">📧 {profile.email}</p>
            <p className="text-gray-600">📍 {profile.address}</p>
            <p className="text-gray-600">📞 {profile.phonenumber}</p>
            <p className="text-gray-500">🎂 {profile.dob}</p>
            <p className="text-gray-500">⚧ {profile.gender}</p>

            {isDoctor && (
              <>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-700">{profile.description}</p>
                  <p className="text-sm text-gray-700">Specialization: {profile.specialization}</p>
                  <p className="text-sm text-gray-700">Qualification: {profile.qualification}</p>
                  <p className="text-sm text-gray-700">Experience: {profile.experience} years</p>
                  <h3 className="text-lg font-bold text-[#7E3F98]">Fees: Rs. {profile.fees}</h3>
                  <p className="text-xs text-gray-500">Slots Available: {profile.availableSlots}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Optional Dropdown (can be triggered with a button if needed) */}
        {isDropdownVisible && (
          <div
            id="userDropdown"
            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 absolute top-16 right-4"
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
  );
}

export default Profile;
