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
        const response = await fetch("http://localhost:4000/appointments/user/getallappointment", {
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

  const filteredAppointments = appointments.filter(appt =>
    activeTab === "all" ? true :
    activeTab === "past" ? new Date(appt.date) < new Date() :
    activeTab === "upcoming" ? new Date(appt.date) >= new Date() :
    false
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />

      <div className="flex-grow container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-6 border-b pb-3">
          {["all", "past", "upcoming"].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm sm:text-lg font-semibold rounded-t-md 
                ${activeTab === tab 
                  ? "text-purple-700 border-b-4 border-purple-600" 
                  : "text-gray-500 hover:text-purple-600 transition"}`}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(({ _id, doctorId, time, date, status }) => (
                <div key={_id} className="p-4 border rounded-lg shadow-md bg-white">
                  <p className="text-lg font-semibold text-purple-700 truncate">
                    {doctorId?.fullname || "Unknown Doctor"}
                  </p>
                  <p className="text-gray-600 text-sm">Date: {new Date(date).toLocaleDateString()}</p>
                  <p className="text-gray-600 text-sm">Time: {time}</p>
                  <p className={`text-sm font-medium ${status === "approved" ? "text-green-600" : status === "rejected" ? "text-red-600" : "text-orange-600"}`}>
                    Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No {activeTab} appointments found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
