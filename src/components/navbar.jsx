import React from "react";
import logoimg from "../assets/images/logo.png";
import { Link } from "react-router-dom"; // Use Link for client-side routing

function NavBar({ isLoggedIn, userRole }) {
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
            <li><Link to="/home">Home</Link></li>
            {isLoggedIn && data.user.role === "user"&& (
              <li><Link to="/doctor">Doctor</Link></li>
            )}
            {isLoggedIn && (
              <li><Link to="/message">Message</Link></li>
            )}
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="#contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-4">
          <li><Link to="/home">Home</Link></li>
          {isLoggedIn && data.user.role === "user" && (
            <li><Link to="/doctor">Doctor</Link></li>
          )}
          {isLoggedIn && (
            <li><Link to="/message">Message</Link></li>
          )}
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="#contact">Contact Us</Link></li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
              <img
                src="https://via.placeholder.com/40"
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

