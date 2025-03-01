import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import ProfessionalCard from "../../components/ProfessionalCard";
import Carousel from "../../components/carousel";

function Home() {
    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        const fetchRandomDoctors = async () => {
            try {
                const response = await fetch("http://localhost:4000/doctors/random-doctors");
                const data = await response.json();
                setProfessionals(data.doctors || []); // Assuming backend returns { doctors: [] }
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            }
        };

        fetchRandomDoctors();
    }, []);



    return (
        
        <div>
            <NavBar />
            <main className="min-h-screen p-8">
                <Carousel />
            
                <div>
                <h1 className="text-3xl font-bold text-center mt-6">
                    Meet Our Professionals
                </h1>
                <div className="flex flex-wrap justify-center gap-6 bg-gray-100 py-8">
                    {professionals.map((professional) => (
                        <ProfessionalCard
                            key={professional._id}
                            fullname={professional.fullname}
                            image={professional.image}
                            specialization={professional.specialization}
                            qualification={professional.qualification}
                            experience={professional.experience}
                        />
                    ))}
                </div>


                <div className="flex flex-wrap justify-center gap-6 bg-gray-100 py-8">
                    {professionals.map((professional) => (
                        <ProfessionalCard
                            key={professional._id}
                            name={professional.name}
                            speciality={professional.speciality}
                            description={professional.description}
                            image={professional.image}
                        />
                    ))}
                </div>
                <div>

                <div className="flex flex-col items-center justify-center py-12 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">What They Say About Us</h2>
      <div className="flex justify-center mb-4">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          className="text-teal-500"
        >
          <circle cx="12" cy="12" r="12" fill="currentColor" />
        </svg> */}
      </div>
      <p className="max-w-lg text-center text-gray-600 mb-4">
        I have been a client to Bharat Sir since my first session in late 2016. He has always made me feel safe and supported, and I have recommended him to many of my friends, relatives, and connections.
      </p>
      <p className="text-gray-500 italic">Anonymous</p>
      <div className="flex justify-center mt-4">
      </div>
    </div>
    
                </div>
                <div>

                <div className="flex flex-col items-center justify-center py-12 bg-gray-50">

      <p className="max-w-lg text-center text-gray-600 mb-4">
        I have given up on everything, I was depressed for 2 months and i tried online therapy sesson with Dr. Pratima. she changes my life she gave me a ray of hope in my life. Now I am  manager of Markiting in famous company.
      </p>
      <p className="text-gray-500 italic">Aapsara</p>
      <div className="flex justify-center mt-4">
      </div>
    </div>
    
                </div>
                </div>
                
            </main>
            <Footer />
        </div>
    );
}

export default Home;

