import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidebar";
import Swal from "sweetalert2";
import { FiMenu } from 'react-icons/fi';

function AddDoctor() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [doctor, setDoctor] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    address: "",
    gender: "",
    dob: "",
    specialization: "",
    experience: "",
    fees: "",
    availableSlots: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const doctorData = {
      username: doctor.username,
      email: doctor.email,
      fullname: doctor.fullName,
      password: doctor.password,
      phonenumber: doctor.phoneNumber,
      gender: doctor.gender,
      dob: doctor.dob,
      specialization: doctor.specialization,
      experience: doctor.experience,
      fees: doctor.fees,
      availableSlots: doctor.availableSlots,
      description: doctor.description || "",
    };

    fetch("http://localhost:4000/doctors/addDoctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(doctorData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Failed to add doctor");
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "Unsuccessful Doctor Creation",
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Doctor Added Successfully",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            setDoctor({
              fullName: "",
              email: "",
              username: "",
              password: "",
              phoneNumber: "",
              address: "",
              gender: "",
              dob: "",
              specialization: "",
              experience: "",
              fees: "",
              availableSlots: "",
            });
            navigate("/viewDoctor");
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex h-screen">
      {/* Hamburger Menu for Mobile */}
      <div
        className="fixed top-0 left-0 z-50 p-4 sm:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu className="text-white text-3xl" />
      </div>

      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={doctor.fullName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={doctor.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={doctor.username}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={doctor.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={doctor.phoneNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={doctor.address}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Gender</label>
              <select
                name="gender"
                value={doctor.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={doctor.dob}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Experience (in years)</label>
              <input
                type="number"
                name="experience"
                value={doctor.experience}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Consultation Fees</label>
              <input
                type="number"
                name="fees"
                value={doctor.fees}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Available Slots</label>
              <input
                type="text"
                name="availableSlots"
                value={doctor.availableSlots}
                onChange={handleChange}
                placeholder="E.g., 9 AM - 12 PM, 3 PM - 5 PM"
                className="input input-bordered w-full"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;