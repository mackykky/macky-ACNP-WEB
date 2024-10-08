import React from "react";
import { HashLink } from "react-router-hash-link";
import logo2 from "../assets/logo2.png";

// Function to adjust scroll offset with conditional logic for 'About' section
const scrollWithOffset = (el) => {
  const yOffset = el.id === "about" ? 0 : -80; // No offset for 'About', 80px offset for others
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
};

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <HashLink to="/">
            <img src={logo2} alt="Logo" className="h-20" />
          </HashLink>
          <ul className="flex space-x-6 ml-6">
            <li>
              <HashLink smooth to="/#about" scroll={el => scrollWithOffset(el)} className="text-blue hover:text-blue-300">
                About
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#services" scroll={el => scrollWithOffset(el)} className="text-blue hover:text-blue-300">
                Services
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#products" scroll={el => scrollWithOffset(el)} className="text-blue hover:text-blue-300">
                Samples
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#projects" scroll={el => scrollWithOffset(el)} className="text-blue hover:text-blue-300">
                Projects
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#contact" scroll={el => scrollWithOffset(el)} className="text-blue hover:text-blue-300">
                Contact
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#contactform" scroll={el => scrollWithOffset(el)} className="text-black hover:text-blue-300">
                Appointment Booking
              </HashLink>
            </li>
          </ul>
        </div>
        <div className="mr-10">
          <HashLink 
            to="/book-appointment"
            className="bg-blue-500 text-white px-6 py-4 rounded hover:bg-blue-600"
          >
            Book Now
          </HashLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
