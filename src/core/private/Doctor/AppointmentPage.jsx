import React from "react";
import { useEffect, useState } from 'react';
import Footer from "../../../components/footer"; // Corrected path
import Nav from "../../../components/navbar";
function AppointmentDoctor() {
  const [appointments, setAppointments] = useState([]);

  // Fetch all appointments for the doctor
  const getAppointments = () => {
    fetch('http://localhost:4000/appointments/doctor', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you use JWT
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) {
          setAppointments(data.appointments);
        }
      })
      .catch((err) => console.error('Failed to fetch appointments:', err));
  };

  // Handle status change (Accept/Reject) 
  const handleStatusChange = (appointmentId, newStatus) => {
    fetch(`http://localhost:4000/appointments/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ appointmentId, status: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedAppointment) => {
        console.log('Updated Appointment:', updatedAppointment);
        // Refresh appointments after status change
        getAppointments();
      })
      .catch((err) => console.error(err));
  };

  // Fetch appointments on component mount
  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div>
      <Nav />
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      {appointments.map((appointment) => (
        <div key={appointment._id} className="border p-4 rounded mb-4 bg-gray-50">
          <h2 className="font-semibold text-lg">{appointment.userId.username}</h2>
          <p className="text-sm">Email: {appointment.userId.email}</p>
          <p className="text-sm">Age: {appointment.age}</p>
          <p className="text-sm">Gender: {appointment.gender}</p>
          <p className="text-sm">Speciality: {appointment.speciality}</p>
          <p className="text-sm"> Date {appointment.date}     </p>
          <p className="text-sm">Time: {appointment.time} </p>
          <p className="text-sm">Status: {appointment.status}</p>

          <div className="mt-2 space-x-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => handleStatusChange(appointment._id, 'Accepted')}
            >
              Accept
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleStatusChange(appointment._id, 'Rejected')}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
    <Footer />
    </div>
  );
}

export default AppointmentDoctor;
