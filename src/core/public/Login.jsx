import React, { useState } from "react";
import { setUser } from '../../redux/userSlice';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImage from "../../assets/images/login.png";
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Invalid login credentials.");
          }
          throw new Error("Server error. Please try again later.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user)); // Save user

          // Dispatch user data to Redux store
          dispatch(setUser(data.user));

          Swal.fire({
            title: "Login Successful",
            text: "Welcome back!",
            icon: "success",
          });

          if (data.user.role === "admin") {
            navigate("/admin");
          } else if (data.user.role === "doctor") {
            navigate("/");
          } else {
            navigate("/");
          }
        } else {
          throw new Error("Login failed. Please try again.");
        }
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-purple-200 p-4">
      <div className="text-center md:mr-8 md:w-1/2">
        <img src={loginImage} alt="Mental Health" className="w-60 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800">
          Make your mental health a priority
        </h2>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md md:w-1/2 mt-8 md:mt-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Log in</h2>
        <p className="text-sm text-gray-600 mb-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Create an account
          </a>
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                error && !username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your username or email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                  error && !password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-purple-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white ${
              !username || !password
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={!username || !password}
          >
            Log in
          </button>

          <div className="flex justify-between mt-4 text-sm">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
