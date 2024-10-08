import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { SiAppstore, SiGoogleplay } from "react-icons/si"; // Icons for App Store and Google Play

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-8">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        <div className="text-xl font-semibold">ACnP</div>
        

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="/terms" className="footer-link">
            Terms of Service
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-400">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-400">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-400">
            <FaInstagram size={20} />
          </a>
        </div>

        {/* App Download Links */}
        <div className="flex space-x-4">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noreferrer"
            className="download-link"
          >
            <SiAppstore size={20} />
            <span>App Store</span>
          </a>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noreferrer"
            className="download-link"
          >
            <SiGoogleplay size={20} />
            <span>Google Play</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} ACnP. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
