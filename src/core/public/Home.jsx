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
            </main>
            <Footer />
        </div>
    );
}

export default Home;
