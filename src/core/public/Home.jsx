import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Carousel from "../../components/carousel";

function Home() {
    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        const fetchRandomDoctors = async () => {
            try {
                const response = await fetch("http://localhost:4000/doctors/getRandomDoctors?count=4");
                const data = await response.json();
                setProfessionals(data.doctors || []); // Assuming backend returns { doctors: [] }
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            }
        };

        fetchRandomDoctors();
    }, []);

    const ProfessionalCard = ({ name, speciality, description, image }) => {
        return (
            <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="text-sm text-gray-500">{speciality}</p>
                    <p className="mt-2 text-gray-700">{description}</p>
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

    return (
        <div>
            <NavBar />
            <main className="min-h-screen p-8">
                <Carousel />
                <h1 className="text-3xl font-bold text-center mt-6">
                    Meet Our Professionals
                </h1>
                <div>

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

