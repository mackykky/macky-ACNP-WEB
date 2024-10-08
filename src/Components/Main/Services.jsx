import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { fetchServices } from "../../Services/Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Services.css'; // Custom styles for Services component

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null); // Create a ref for the slider

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data); // Adjust based on your API response structure
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);
  const Services = ({ services }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service._id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    );
  };
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3, // Show multiple services in large screens
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: '50px', // Adjust padding for centering effect
    initialSlide: Math.floor(services.length / 2), // Start in the middle of the carousel
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px',
        },
      },
    ],
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="services-carousel relative py-10 px-4 lg:px-0">
      {/* Left Arrow Button */}
      <button
        className="arrow-btn left-0 transform -translate-y-1/2 absolute top-1/2 bg-blue-600 rounded-full p-3 shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={() => sliderRef.current.slickPrev()}
        aria-label="Previous Service"
      >
        <span className="arrow-icon text-white text-lg">&lt;</span>
      </button>

      {/* Slider */}
      <Slider ref={sliderRef} {...sliderSettings}>
        {services.map((service) => (
          <div key={service.id} className="p-4">
            <div className="service-card bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
              {/* Service Image */}
              <div
                className="service-image h-48 bg-cover bg-center rounded-t-lg"
                style={{
                  backgroundImage: service.image
                    ? `url(${service.image})`
                    : `url(path_to_placeholder_image)`, // Replace with actual placeholder image
                }}
              />
              
              {/* Service Details */}
              <div className="service-details text-center p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <button className="go-btn bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Right Arrow Button */}
      <button
        className="arrow-btn right-0 transform -translate-y-1/2 absolute top-1/2 bg-blue-600 rounded-full p-3 shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={() => sliderRef.current.slickNext()}
        aria-label="Next Service"
      >
        <span className="arrow-icon text-white text-lg">&gt;</span>
      </button>
    </div>
  );
}

export default Services;
