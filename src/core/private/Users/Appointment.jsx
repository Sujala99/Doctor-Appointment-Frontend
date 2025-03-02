import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { useUserContext } from "../../../UserContext";
import Footer from "../../../components/footer";
import Nav from "../../../components/navbar";

const AppointmentBooking = () => {
  const { doctorId, appointmentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const { user } = useUserContext();

  const doctor = location.state?.doctor;

  if (!doctor) {
    return <p className="text-center text-gray-600">Doctor information not available. Please try again.</p>;
  }

  const bookNow = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }
    if (!user) {
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
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

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
      toast.error("Failed to book appointment");
    }
  };

  useEffect(() => {
    if (appointmentId) {
      axios.get(`http://localhost:4000/appointments/getappointment/${appointmentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then(response => {
        setAppointmentDetails(response.data);
      }).catch(error => console.error('Error fetching appointment:', error));
    }
  }, [appointmentId]);

  useEffect(() => {
    if (isBooked && appointmentDetails) {
      axios.get(`http://localhost:4000/appointments/getappointment/${appointmentDetails.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then(response => {
        setAppointmentDetails(response.data);
      }).catch(error => console.error('Error fetching appointment:', error));
    }
  }, [isBooked, appointmentDetails]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 p-4 max-w-3xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Doctor Appointment</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-200 p-4 rounded-lg shadow-lg bg-white">
          {/* Doctor Info */}
          <div className="flex flex-col items-center text-center">
            <img
              src={`http://localhost:4000/uploads/${doctor.image}`}
              alt="Doctor"
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
            <h3 className="font-bold text-lg">{doctor.fullname}</h3>
            <p className="text-gray-600">{doctor.specialization}</p>
            <p className="font-bold text-gray-800">Rs. {doctor.fees}</p>
          </div>

          {/* Date and Time Picker */}
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="font-bold text-sm">Pick a Date</h3>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                minDate={new Date()}
                className="w-full border rounded-lg p-2 text-black text-center"
                placeholderText="Select Date"
              />
            </div>

            <div>
              <h3 className="font-bold text-sm">Select Time</h3>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Book Button */}
        <div className="mt-4 text-center">
          <button
            onClick={bookNow}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg font-bold disabled:opacity-50"
            disabled={!selectedDate || !selectedTime}
          >
            Book Appointment
          </button>
        </div>

        {/* Appointment Details */}
        {appointmentDetails && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-300">
            <h3 className="font-bold text-lg mb-2">Appointment Details</h3>
            <p><strong>Doctor:</strong> {appointmentDetails.doctorInfo?.fullname}</p>
            <p><strong>Specialization:</strong> {appointmentDetails.doctorInfo?.specialization}</p>
            <p><strong>Date:</strong> {appointmentDetails.date}</p>
            <p><strong>Time:</strong> {appointmentDetails.time}</p>
            <p><strong>Status:</strong> {appointmentDetails.status}</p>
            <p><strong>Fees:</strong> Rs. {appointmentDetails.fees}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentBooking;
