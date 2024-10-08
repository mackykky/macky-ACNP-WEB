import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import About from "../Components/Main/About";
import Services from "../Components/Main/Services";
import Projects from "../Components/Main/Projects";
import Contact from "../Components/Main/Contact";
import Slider from "react-slick"; // For carousel
import { fetchProductsByType } from "../Services/Api"; // Import fetch function
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import contactImage from "../assets/bintana.png";
import Spinner from "../Components/Spinner"; // Import the Spinner component

// Custom Arrow Components for the Slider
const NextArrow = ({ onClick }) => (
  <button className="arrow-btn absolute right-0 z-10 bg-blue-600 rounded-full p-2 shadow-lg" onClick={onClick}>
    <FontAwesomeIcon icon={faChevronRight} size="2x" color="white" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="arrow-btn absolute left-0 z-10 bg-blue-600 rounded-full p-2 shadow-lg" onClick={onClick}>
    <FontAwesomeIcon icon={faChevronLeft} size="2x" color="white" />
  </button>
);

const MainPage = () => {
  const [category, setCategory] = useState("frame"); // Default category is 'glass'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the page
  const [error, setError] = useState(null);
  const [pageLoading, setPageLoading] = useState(true); // Loading state for page content
  const sliderRef = useRef(null);

  // Simulate loading delay for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000); // Set a timeout to simulate loading
    return () => clearTimeout(timer); // Cleanup
  }, []);

  // Fetch products based on selected category
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductsByType(category); // Fetch by category
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(`Failed to fetch products for ${category}.`);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category]);

  // Slider settings for product carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "10px",
        },
      },
    ],
  };

  // Render the product category buttons
  const renderCategoryButtons = () => {
    const categories = ["glass", "frame", "completeunit"];
    return (
      <div className="flex justify-center space-x-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`py-2 px-6 text-lg font-semibold rounded-lg transition-colors duration-300 ${
              category === cat ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    );
  };

  if (pageLoading) {
    return <Spinner />; // Display loading spinner while page is loading
  }

  return (
    <div>
      <main className="container mx-auto px-4">
        <section id="about" className="py-20">
          <About />
        </section>

        <section id="services" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-8">Services Offered</h2>
          <Services />
        </section>

        <section id="projects" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-8">Projects</h2>
          <Projects />
        </section>

        {/* Product Carousel Section */}
<section id="products" className="py-12 bg-gray-100"> {/* Reduced padding to py-12 */}
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold text-center mb-8">Our Samples</h2> {/* Adjusted margin bottom */}
    
    {/* Category Buttons */}
    {renderCategoryButtons()}

    {/* Product Carousel */}
    {loading ? (
      <div className="text-center">Loading...</div>
    ) : error ? (
      <div className="text-center text-red-500">{error}</div>
    ) : (
      <div className="w-full max-w-6xl mx-auto relative">
        <Slider ref={sliderRef} {...sliderSettings}>
          {products.map((product) => (
            <div key={product._id} className="p-4">
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"> {/* Adjusted padding to p-4 */}
                <div className="w-full h-48 flex items-center justify-center mb-4"> {/* Reduced height */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2"> {/* Adjusted font size */}
                  {product.name}
                </h3>
                <p className="text-gray-700 text-center">{product.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    )}
  </div>
</section>

        <section id="contactform" className="py-6 bg-blue-500 flex items-center justify-center relative">
          <div className="flex items-center max-w-2xl w-full">
            <div className="flex-1 p-1 max-w-sm">
              <h2 className="text-1xl text-white font-bold mb-1">
                Elevate your space with "Aparace Cuts n Pieces" glass service - we're ready when you are!
              </h2>
              <NavLink
                className="bg-white text-black py-2 px-4 rounded hover:bg-white-600 transition duration-300 ease-in-out"
                to="book-appointment"
              >
                Book Now!
              </NavLink>
            </div>
            <img
              src={contactImage}
              alt="Contact Us"
              className="w-1/4 h-auto absolute right-16 transform translate-x-1/4 top-15"
            />
          </div>
        </section>

        <section id="contact" className="py-20">
          <h2 className="text-3xl font-bold text-center">Contacts</h2>
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default MainPage;
