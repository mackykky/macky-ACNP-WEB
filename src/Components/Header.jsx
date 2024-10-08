import React, { useEffect, useState } from "react";
import { fetchContactInfo } from "../Services/Api"; // Adjust the path as needed

const Header = () => {
  const [contactInfo, setContactInfo] = useState({
    contactNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getContactInfo = async () => {
      try {
        const data = await fetchContactInfo();
        // Assuming data is an array and we're interested in the first object
        if (data.length > 0) {
          const { contactNumber, email } = data[0]; // Destructure from the first object
          setContactInfo({ contactNumber, email });
        }
      } catch (err) {
        setError("Failed to fetch contact info");
      } finally {
        setLoading(false);
      }
    };

    getContactInfo();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <header className="bg-gray-400 text-white">
      <div className="container mx-auto flex justify-center items-center ">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300">
                Bien Unido, Bohol
              </a>
            </li>
            <li>
              <a href="/leaderboard" className="hover:text-gray-300">
                {contactInfo.contactNumber}
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-300">
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
