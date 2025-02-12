import React, { useState, useEffect, useContext } from "react";
import loginImage from "../../assets/images/login.png";
import UserContext from "@/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // State for form fields
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Enable submit button only when all fields are filled
  useEffect(() => {
    setIsActive(
      fullname !== "" &&
      username !== "" &&
      email !== "" &&
      dob !== "" &&
      phonenumber !== "" &&
      password !== ""
    );
  }, [fullname, username, email, dob, phonenumber, password]);

  // Handle form submission
  const registerUser = async (e) => {
    e.preventDefault();

    const userData = {
      fullname,
      username,
      email,
      dob,
      phonenumber,
      password,
    };

    console.log("Sending Data:", userData); // Debugging

    try {
      const response = await fetch("http://localhost:4000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server error: ${response.status}, ${errorData.message}`);
      }

      const data = await response.json();
      console.log("Response:", data);

      if (data.message === "User registered successfully") {
        setUser({ id: data.userId, isAdmin: false });
        Swal.fire({
          title: "Registration Successful",
          icon: "success",
          text: "Thank you for registering!",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Registration Failed",
          icon: "error",
          text: data.message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Failed to connect to the server. Please check the server status.",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-purple-200 p-4">
      {/* Left Section - Image and Text */}
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center mb-8 md:mb-0">
        <img src={loginImage} alt="Mental Health" className="w-48 md:w-64 lg:w-80 mx-auto" />
        <h2 className="text-xl font-bold text-gray-800 mt-4 text-center">
          Make your mental health a priority
        </h2>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-md rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>
        <p className="text-sm text-gray-600 mb-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
        <form onSubmit={registerUser}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="w-full p-3 border rounded-md mt-1 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border rounded-md mt-1 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-md mt-1 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              required
              className="w-full p-3 border rounded-md mt-1 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-gray-700">Birth Date</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full p-3 border rounded-md mt-1 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-md mt-1 focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-purple-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isActive}
            className={`w-full py-2 px-4 rounded-md text-white ${
              isActive ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400"
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
