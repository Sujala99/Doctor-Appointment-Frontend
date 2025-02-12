import React from "react";
import NavBar from "../../components/navbar"; // Corrected path
import Footer from "../../components/footer"; // Corrected path
import Carousel from "../../components/carousel"; // Corrected path
import background from "../../assets/images/background.png";

function Home() {
    return (
        <div>
            <NavBar />
            <main className="min-h-screen p-8">
                <h1 className="text-3xl font-bold underline text-center">
                <Carousel />

                    Hello in Home page!
                </h1>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
