import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { useUserContext } from "../../../UserContext"; // Import UserContext
import Footer from "../../../components/footer"; // Corrected path
import Nav from "../../../components/navbar";
// import AppointmentDetails from "./AppointmentDetails"; // Import AppointmentDetails component

const AppointmentBooking = () => {
  const { doctorId, appointmentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const { user } = useUserContext(); // Access the user from UserContext

  // Get doctor from navigation state
  const doctor = location.state?.doctor;

  if (!doctor) {
    return (
      <p className="text-center text-gray-600">
        Doctor information not available. Please try again.
      </p>
    );
  }

  const bookNow = async () => {
    console.log("📌 Booking function is running!");

    if (!selectedDate || !selectedTime) {
      console.log("🚨 Missing date or time");
      toast.error("Please select both date and time");
      return;
    }

    if (!user) {
      console.log("🚨 User not logged in");
      toast.error("Please log in to book an appointment");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/appointments/book`,
        {
          doctorId: doctorId,
          userId: user.id,
          doctorInfo: doctor,
          userInfo: user,
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime,
          status: "pending",
          fees: doctor.fees || 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("API response:", response.data);

      if (response.data) {
        setAppointmentDetails(response.data.data);
        setIsBooked(true);

        Swal.fire({
          title: "Appointment Request Sent!",
          text: "Your appointment request has been sent to the doctor. Please wait for their response.",
          icon: "success",
          confirmButtonText: "View Details",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment");
    }
  };

  // Fetch appointment details if appointmentId is provided
  useEffect(() => {
    if (appointmentId) {
      const fetchAppointmentDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/appointments/getappointment/${appointmentId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setAppointmentDetails(response.data);
        } catch (error) {
          console.error('Error fetching appointment details:', error);
        }
      };

      fetchAppointmentDetails();
    }
  }, [appointmentId]);

  // Fetch appointment details after booking
  useEffect(() => {
    if (isBooked && appointmentDetails) {
      const fetchAppointmentDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/appointments/getappointment/${appointmentDetails.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setAppointmentDetails(response.data);
        } catch (error) {
          console.error('Error fetching appointment details:', error);
        }
      };

      fetchAppointmentDetails();
    }
  }, [isBooked, appointmentDetails]);

  return (
    <div>
      <Nav />
      <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Doctor Appointment</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", border: "1px solid #ddd", padding: "16px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          {/* Doctor Details */}
          <div style={{ textAlign: "center" }}>
            <img
              src={`http://localhost:4000/uploads/${doctor.image}`}
              alt="Doctor"
              style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: "8px" }}
            />
            <h3 style={{ fontWeight: "bold", fontSize: "18px" }}>{doctor.fullname}</h3>
            <p style={{ color: "#555" }}>{doctor.specialization}</p>
            <p style={{ fontWeight: "bold", color: "#333" }}>{doctor.fees}</p>
          </div>

          {/* Date & Time Pickers */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h3 style={{ fontWeight: "bold", fontSize: "16px" }}>Pick a Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd-MM-yyyy"
              minDate={new Date()}
              className="px-4 py-2 border rounded-lg text-black w-full text-center"
              placeholderText="Select Date"
            />

            <h3 style={{ fontWeight: "bold", fontSize: "16px", marginTop: "16px" }}>Select Time</h3>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
        </div>

        {/* Book Appointment Button */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <button
            onClick={bookNow}
            style={{ backgroundColor: "#6B46C1", color: "white", padding: "10px 16px", borderRadius: "4px", fontWeight: "bold" }}
            disabled={!selectedDate || !selectedTime}
          >
            Book Appointment
          </button>
        </div>

        {/* Appointment Details */}
        {appointmentDetails && (
          <div style={{ marginTop: "32px", padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px", border: "1px solid #ddd" }}>
            <h3 style={{ fontWeight: "bold", fontSize: "18px" }}>Appointment Details</h3>
            <p><strong>Doctor:</strong> {appointmentDetails.doctorInfo.fullname}</p>
            <p><strong>Specialization:</strong> {appointmentDetails.doctorInfo.specialization}</p>
            <p><strong>Appointment Date:</strong> {appointmentDetails.date}</p>
            <p><strong>Time:</strong> {appointmentDetails.time}</p>
            <p><strong>Status:</strong> {appointmentDetails.status}</p>
            <p><strong>Fees:</strong> {appointmentDetails.fees}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentBooking;
