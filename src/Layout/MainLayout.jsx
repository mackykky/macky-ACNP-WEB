import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner"; // Import the loading spinner

function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading delay for demonstration
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (or your loading condition)
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div>
      <Navbar />

      {loading ? (
        <LoadingSpinner /> // Show loading spinner while loading
      ) : (
        <Outlet /> // Render child routes once loading is complete
      )}

      <Footer />
    </div>
  );
}

export default MainLayout;