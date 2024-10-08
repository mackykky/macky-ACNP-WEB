import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../Services/Api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        console.log(data);
        setProjects(data); // Adjust based on your API response structure
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    

    getProjects();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="loader"></div></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6"></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 container mx-auto">
        {projects.map((project) => (
          <div
            key={project._id}
            className="overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={project.uri} // Adjust based on your API response
              alt={`Project ${project._id}`} // Use a descriptive alt attribute
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-lg">{project.title || "SM Window"}</h3>
              <p className="text-gray-600">{project.description || "Very Nice siya"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
