import { useEffect, useState } from "react";
import Card from "../../../components/card";
import Nav from "../../../components/navbar";
import Footer from "../../../components/footer"; // Corrected path
import React from "react";

function Doctor() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/doctors/getAllDoctors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDoctors(data.doctors || []))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  return (

    <div>
        <div>
            <Nav/>
        </div>
        <div>
        <div className="container mx-auto px-4">

        </div>
            <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Card key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <p className="text-center col-span-full text-lg">No doctors available.</p>
        )}
      </div>
                
            </div>
      
    </div>
    <Footer/>

    </div>
    
  );
}

export default Doctor;
