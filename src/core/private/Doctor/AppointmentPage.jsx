import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Nav from "../../../components/navbar";

function AppointmentDoctor() {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = () => {
    fetch("http://localhost:4000/appointments/doctor", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) {
          setAppointments(data.appointments);
        }
      })
      .catch((err) => console.error("Failed to fetch appointments:", err));
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    fetch("http://localhost:4000/appointments/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ appointmentId, status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        getAppointments();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="p-5 flex-grow">
        <h1 className="text-2xl font-bold mb-6 text-center">Appointments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="border p-4 rounded-lg shadow-lg bg-gray-50">
              <h2 className="font-semibold text-lg">{appointment.userId.username}</h2>
              <p className="text-sm text-gray-600">Email: {appointment.userId.email}</p>
              <p className="text-sm text-gray-600">Age: {appointment.age}</p>
              <p className="text-sm text-gray-600">Gender: {appointment.gender}</p>
              <p className="text-sm text-gray-600">Speciality: {appointment.speciality}</p>
              <p className="text-sm text-gray-600">Date: {appointment.date}</p>
              <p className="text-sm text-gray-600">Time: {appointment.time}</p>
              <p className="text-sm text-gray-600 font-medium">Status: {appointment.status}</p>

              <div className="mt-4 flex justify-between">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={() => handleStatusChange(appointment._id, "Accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => handleStatusChange(appointment._id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppointmentDoctor;
