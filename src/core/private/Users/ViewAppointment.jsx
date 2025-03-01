import { useState, useEffect } from "react";
import Nav from "../../../components/navbar";
import React from "react";

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:4000/appointments//user/getallappointment", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data.appointments);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(appt => activeTab === "all" || appt.status.toLowerCase() === activeTab);

  return (
    <div>
      <Nav />
      <div className="p-4 max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-around mb-6 border-b pb-2">
          {['all', 'past', 'upcoming'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 text-lg font-semibold ${activeTab === tab ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Appointments
            </button>
          ))}
        </div>

        {/* Loading and Error Messages */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {/* Appointment List */}
        {!loading && !error && (
          <div className="space-y-4">
            {filteredAppointments.map(({ _id, doctorId, time, date, status }) => (
              <div key={_id} className="p-4 border rounded-lg shadow-md bg-white">
                <p className="text-lg font-semibold text-purple-700">{doctorId ? doctorId.fullname : "Unknown Doctor"}</p>
                <p className="text-gray-600">Time: {time}</p>
                <p className="text-gray-600">Date: {new Date(date).toLocaleDateString()}</p>
                <p className="text-gray-600">Status: {status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
