import React from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import ProfessionalCard from "../../components/ProfessionalCard";
import Carousel from "../../components/carousel";
import docf1 from "../../assets/images/docf1.png";
import docf2 from "../../assets/images/2.jpeg"; // Fixed incorrect filename
import docm1 from "../../assets/images/docm1.png";
import docm2 from "../../assets/images/doctor1.jpeg";
// import loginImage from "../../assets/images/login.png";

function Home() {
    const profiles = [
        {
            name: "Shradha Gadtaula",
            location: "Bhaktapur, Kathmandu, Lalitpur",
            profession: "Psychologist",
            imageUrl: docf1, 
            testimonial: "This website is an amazing platform where I have helped numerous patients find peace and mental well-being."
        },
        {
            name: "Dr. Pashupati Mahat",
            location: "Kathmandu",
            profession: "Clinical Psychologist",
            imageUrl: docf2, 
            testimonial: "Mental health is just as important as physical health. This platform allows me to reach and support those in need."

        },
        {
            name: "Subhash Chandra Sharma",
            location: "Kathmandu",
            profession: "Clinical Psychologist",
            imageUrl: docm1, 
            testimonial: "I appreciate how this platform connects professionals with people who require immediate psychological support."

        },
        {
            name: "Rabindra Basnet",
            location: "Kathmandu",
            profession: "Psychologist",
            imageUrl: docm2, 
            testimonial: "Spreading awareness about mental health is crucial, and this website plays a significant role in that mission."

        },
    ];

    return (
        <div>
            <NavBar />
            <main className="min-h-screen p-8">
                <Carousel />

                <div>
                    <h1 className="text-3xl font-bold text-center mt-6">Meet Our Professionals</h1>

                    <div className="flex flex-wrap justify-center space-x-4 mt-6">
                        {profiles.map((profile, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-lg max-w-xs mb-6">
                                <img className="rounded-lg mb-4 w-full h-48 object-cover" 
                                     src={profile.imageUrl} 
                                     alt={profile.name} />
                                <h2 className="text-xl font-semibold">{profile.name}</h2>
                                {/* <p className="text-gray-500">{profile.location}</p> */}
                                <p className="text-gray-700">{profile.profession}</p>
                                <p className="text-gray-700">{profile.testimonial}</p>
                                {/* <a href="#" className="text-blue-500 hover:underline">Read More →</a> */}
                            </div>
                        ))}
                    </div>

                    {/* Testimonials */}
                    <div className="flex flex-col items-center justify-center py-12 bg-gray-50">
                        <h2 className="text-2xl font-bold mb-4">What They Say About Us</h2>
                        <p className="max-w-lg text-center text-gray-600 mb-4">
                            I have been a client to Bharat Sir since my first session in late 2016. He has always made me feel safe and supported, and I have recommended him to many of my friends, relatives, and connections.
                        </p>
                        <p className="text-gray-500 italic">Anonymous</p>
                    </div>

                    <div className="flex flex-col items-center justify-center py-12 bg-gray-50">
                        <p className="max-w-lg text-center text-gray-600 mb-4">
                            I have given up on everything, I was depressed for 2 months and I tried an online therapy session with Dr. Pratima. She changed my life and gave me a ray of hope in my life. Now I am a manager of Marketing in a famous company.
                        </p>
                        <p className="text-gray-500 italic">Aapsara</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
