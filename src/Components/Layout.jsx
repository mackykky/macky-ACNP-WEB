import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white p-4">
                <nav className="flex justify-around">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/about" className="hover:underline">About</Link>
                    <Link to="/services" className="hover:underline">Services</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                    <Link to="/booking" className="hover:underline">Booking</Link> {/* Add the booking link */}
                </nav>
            </header>
            <main className="flex-grow p-6">
                {children}
            </main>
        </div>
    );
};

export default Layout;
