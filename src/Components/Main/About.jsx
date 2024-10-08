import React, { useEffect, useState } from "react";
import { fetchAboutDescription } from "../../Services/Api"; // Ensure this path is correct
import backgroundImage from '../../assets/bgimage.png'; // Path to your background image

function About() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDescription = async () => {
      try {
        const data = await fetchAboutDescription();
        if (data.length > 0) {
          setDescription(data[0].description);
        }
      } catch (err) {
        setError("Failed to fetch description");
      } finally {
        setLoading(false);
      }
    };

    getDescription();
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-end bg-cover bg-center" // Align to end
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        paddingTop: '10px',
        paddingBottom: '10px'
      }}
    >
      {/* Main Content Container */}
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-end text p-3"> {/* Align text to the right */}
        <h2 className="text-5xl font-bold text-white leading-tight mb-4">
          Your future is just way beyond your window.
        </h2>
        <p className="text-lg text-gray-200 leading-relaxed">
          {description}
        </p>
      </div>
    </div>

    
  );
  
}



export default About;
