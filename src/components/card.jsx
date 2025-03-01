import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ doctor }) {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate(`/appointments/${doctor._id}`, { state: { doctor } });
  };

  return (
    <div className=" bg-black-100 w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg hover:shadow-xl transition-all p-10 rounded-2xl flex flex-col sm:flex-row gap-6 border border-gray-200">
      {/* Doctor Image */}
      <div className="w-full sm:w-2/5 flex justify-center">
        <img
          className="h-32 w-32 object-cover rounded-full border-4 border-[#7E3F98]"
          src={`http://localhost:4000/uploads/${doctor.image}`}
          alt={doctor.fullname}
        />
      </div>

      {/* Doctor Info */}
      <div className="w-full sm:w-3/5 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">{doctor.fullname}</h2>
          <h4 className="text-sm text-gray-600">{doctor.specialization}</h4>
          <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
          <h3 className="text-lg font-semibold text-[#7E3F98] mt-2">Rs. {doctor.fees}</h3>
          <p className="text-xs text-gray-500 mt-2">{doctor.description}</p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleBookAppointment}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-600 mt-4"
          >
            Book Appointment
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-600 mt-4">
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
