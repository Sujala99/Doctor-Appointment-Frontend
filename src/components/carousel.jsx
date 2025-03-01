import React, { useState, useEffect } from "react";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";

const images = [image1, image2, image3];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  return (
    <div className="carousel w-full">
      <div className="carousel-item relative w-full">
        <img
          src={images[currentSlide]}
          alt={`slide-${currentSlide}`}
          className="w-full h-90 object-cover"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#"
            onClick={() => setCurrentSlide((currentSlide - 1 + images.length) % images.length)}
            className="btn btn-circle"
          >
            ❮
          </a>
          <a
            href="#"
            onClick={() => setCurrentSlide((currentSlide + 1) % images.length)}
            className="btn btn-circle"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
