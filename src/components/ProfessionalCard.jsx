import React, { useState, useEffect } from "react";
const ProfessionalCard = ({ fullname, image, specialization, qualification, experience }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
            {/* Adjusted image URL */}
            <img
                src={`http://localhost:4000/UploadImage/${image}`} // Prepending the filename with the path
                alt={image}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
                <h3 className="text-xl font-bold">{fullname}</h3>
                <p className="text-sm text-gray-500">{specialization}</p>
                <p className="mt-2 text-gray-700">
                    Qualification: {qualification} <br />
                    Experience: {experience} years
                </p>
                <a
                    href="#"
                    className="mt-4 inline-block text-blue-500 font-semibold hover:underline"
                >
                    Book Appointment &rarr;
                </a>
            </div>
        </div>
    );
};

export default ProfessionalCard;
