import React, { useState, useEffect } from "react";
import logoimg from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useUserContext } from "../userContext"; // Import useUserContext hook

function NavBar() {
  const { user } = useUserContext(); // Access user data from context
  const isLoggedIn = !!user; // Check if the user is logged in
  const userRole = user?.role; // Get the user's role

  const [profile, setProfile] = useState(null); // Initialize profile as null until fetched
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
  const token = localStorage.getItem("token"); // Assuming you have a token in local storage

  useEffect(() => {
    if (token) {
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
    }
  }, [token]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="navbar bg-base-100 px-4 lg:px-8">
      {/* Navbar Start */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          <img src={logoimg} alt="Mental Health" className="w-40 h-auto" />
        </Link>
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box shadow mt-3 w-52 p-2 z-10"
          >
            {/* Conditional Rendering for User Role */}
            <li><Link to="/home">Home</Link></li>
            
            {userRole === "user" && (
              <>
                <li><Link to="/doctor">Doctor</Link></li>
                <li><Link to="/message">Chat</Link></li>
              </>
            )}
            {userRole === "doctor" && (
              <>
                <li><Link to="/appointment">Appointment</Link></li>
                <li><Link to="/message">Chat</Link></li>
              </>
            )}
            
            {/* Common items */}
            <li><Link to="/blog">Blog</Link></li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Us
              </a>
            </li>

            {/* Profile */}
            {isLoggedIn && (
              <li><Link to="/profile">Profile</Link></li>
            )}
          </ul>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-4">
          {/* Conditional Rendering for User Role */}
          <li><Link to="/home">Home</Link></li>

          {userRole === "user" && (
            <>
              <li><Link to="/doctor">Doctor</Link></li>
              <li><Link to="/message">Chat</Link></li>
              <li><Link to="/viewappointments">Appointments</Link></li> 
            </>
          )}
          {userRole === "doctor" && (
            <>
              <li><Link to="/doctor/viewAppointment">Appointment</Link></li>
              <li><Link to="/chat">Chat</Link></li>
            </>
          )}

          {/* Common items */}
          <li><Link to="/blog">Blog</Link></li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
              {/* Use the actual profile image if available */}
              <img
                src={profile?.image ? `http://localhost:4000/uploads/${profile.image}` : "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box shadow mt-3 w-40 p-2 z-10"
            >
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
              <li><Link to="/viewappointments">Appointments</Link></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">Join Us Now</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
