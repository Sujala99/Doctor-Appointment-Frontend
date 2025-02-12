import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";

const ViewDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [editDoctor, setEditDoctor] = useState(null);
  const [deleteDoctorId, setDeleteDoctorId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4000/doctors/getAllDoctors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDoctors(data.doctors || []))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  const handleEdit = (doctor) => setEditDoctor({ ...doctor });

  const handleUpdateDoctor = () => {
    fetch(`http://localhost:4000/doctors/updateDoctor/${editDoctor._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editDoctor),
    })
      .then((res) => res.json())
      .then((updatedDoctor) => {
        setDoctors(doctors.map((doc) => (doc._id === updatedDoctor._id ? updatedDoctor : doc)));
        setEditDoctor(null);
      })
      .catch((err) => console.error("Error updating doctor:", err));
  };

  const handleDeleteConfirm = (id) => setDeleteDoctorId(id);

  const handleDeleteDoctor = () => {
    if (!deleteDoctorId) return;

    fetch(`http://localhost:4000/doctors/deleteDoctor/${deleteDoctorId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setDoctors(doctors.filter((doctor) => doctor._id !== deleteDoctorId));
      })
      .catch((err) => console.error("Error deleting doctor:", err))
      .finally(() => setDeleteDoctorId(null));
  };

  return (
    <div className="flex h-screen">
      <Sidebar className="w-64 fixed h-full bg-gray-800" />
      <div className="ml-64 flex-1 p-6 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">View Doctors</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-purple-600 text-white">
                {["Username", "Phone", "Full Name", "DOB", "Gender", "Email", "Specialization", "Qualification", "Experience", "Fees", "Actions"].map((header) => (
                  <th key={header} className="p-3 border border-gray-400 text-center text-sm md:text-base">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="bg-white text-gray-700 hover:bg-purple-100 text-sm md:text-base">
                  <td className="p-3 border border-gray-300">{doctor.username}</td>
                  <td className="p-3 border border-gray-300">{doctor.phonenumber}</td>
                  <td className="p-3 border border-gray-300">{doctor.fullname}</td>
                  <td className="p-3 border border-gray-300">{doctor.dob ? new Date(doctor.dob).toLocaleDateString() : "N/A"}</td>
                  <td className="p-3 border border-gray-300">{doctor.gender}</td>
                  <td className="p-3 border border-gray-300">{doctor.email}</td>
                  <td className="p-3 border border-gray-300">{doctor.specialization}</td>
                  <td className="p-3 border border-gray-300">{doctor.qualification}</td>
                  <td className="p-3 border border-gray-300">{doctor.experience} years</td>
                  <td className="p-3 border border-gray-300">Rs.{doctor.fees}</td>
                  <td className="p-3 border border-gray-300 flex justify-center space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded w-20" onClick={() => handleEdit(doctor)}>Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded w-20" onClick={() => handleDeleteConfirm(doctor._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
           {/* Edit Doctor Modal */}
         {editDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Doctor</h2>
            <div className="grid grid-cols-2 gap-4">
              {["username", "phonenumber", "fullname", "dob", "gender", "email", "specialization", "qualification", "experience","description", "fees"].map((field) => (
                <input
                  key={field}
                  type={field === "dob" ? "date" : "text"}
                  value={editDoctor[field]}
                  onChange={(e) => setEditDoctor({ ...editDoctor, [field]: e.target.value })}
                  className="border border-gray-300 p-2 rounded"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setEditDoctor(null)}>Cancel</button>
              <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={handleUpdateDoctor}>Update</button>
            </div>
          </div>
        </div>
      )}
        </div>

        {deleteDoctorId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg text-center">
              <p className="text-lg font-semibold">Are you sure you want to delete this doctor?</p>
              <div className="flex justify-center space-x-4 mt-4">
                <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setDeleteDoctorId(null)}>No</button>
                <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={handleDeleteDoctor}>Yes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDoctor;
