import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick"; // Import Slider for the carousel
import { fetchProductsByType } from "../../Services/Api"; // Adjust the import according to your structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductsByType.css'; // For custom styles

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <button
      className="arrow-btn right-0"
      onClick={onClick}
      aria-label="Next Slide"
    >
      <FontAwesomeIcon icon={faChevronRight} size="2x" color="white" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="arrow-btn left-0"
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <FontAwesomeIcon icon={faChevronLeft} size="2x" color="white" />
    </button>
  );
};

const ProductsByType = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchProductsByType(category); // Fetch by category
            setProducts(data);
            console.log(data); // Log the fetched products
        } catch (err) {
            console.error(err);
            setError(`Failed to fetch products for ${category}.`);
        } finally {
            setLoading(false);
        }
    };

    getProducts();
}, [category]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error}</div>;

  // Slider settings for product display
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px', // Adjust padding for centering effect
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '20px',
        },
      },
    ],
  };

  return (
    <div className="h-full min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-center">
        {type.charAt(0).toUpperCase() + type.slice(1)} Products
      </h2>
      <div className="w-full max-w-3xl relative">
        <Slider ref={sliderRef} {...sliderSettings}>
          {products.map((product) => (
            <div key={product._id} className="flex justify-center p-4">
              <div className="product-card bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <div className="product-image w-full h-48 flex items-center justify-center mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{product.name}</h3>
                <p className="text-center">{product.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductsByType;
