import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { fullstackProjects } from "../constant/fullstackProjects";
import { frontendDesigns } from "../constant/frontendDesigns";
import { FaArrowRight } from "react-icons/fa";

export default function Project() {
  const [selected, setSelected] = useState("fullstack");
  const navigate = useNavigate();

  const projects =
    selected === "fullstack" ? fullstackProjects : frontendDesigns;

  const handleViewDetails = (project) => {
    const type = selected === "fullstack" ? "fullstack" : "frontend";
    navigate(`/project/${type}/${project.id}`);
  };

  return (
    <section className="max-w-7xl mx-auto md:px-6 py-20">
      {/* Title Section */}
      <div className="text-center mt-8 mb-12">
        <h1 className="text-6xl md:text-8xl font-bold text-black sujoy">
          Our's Projects
        </h1>
        <p className="md:text-lg max-w-4xl px-6 mx-auto text-zinc-700 mt-3 sujoy3">
          Explore a curated collection of my full-stack web applications and frontend design projects. 
          Each project demonstrates my skills in building responsive, user-friendly, and visually appealing interfaces, 
          integrating modern technologies, and solving real-world problems. Dive in to see the functionality, 
          creativity, and attention to detail behind every project I’ve crafted.
        </p>
      </div>

      {/* Nav Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => setSelected("fullstack")}
          className={`px-6 py-2  cursor-pointer sujoy rounded text-center text-2xl font-semibold transition-all duration-300 ${
            selected === "fullstack"
              ? "bg-orange-500 text-black border-orange-500 border-2"
              : "bg-white text-black border-orange-400 border-2 hover:bg-orange-400"
          }`}
        >
          Full Stack Webapp
        </button>
        <button
          onClick={() => setSelected("frontend")}
          className={`px-6 py-2 cursor-pointer sujoy rounded text-center text-2xl font-semibold transition-all duration-300 ${
            selected === "frontend"
              ? "bg-orange-500 text-black border-orange-500 border-2"
              : "bg-white text-black border-orange-400 border-2 hover:bg-orange-400"
          }`}
        >
          Frontend Design
        </button>
      </div>

      {/* Project Cards */}
      <div className="grid lg:grid-cols-2 gap-12">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-4xl overflow-hidden"
          >
            {/* Project Image */}
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-96 object-cover border-16 rounded-4xl border-gray-200/20"
            />

            {/* Project Info */}
            <div className="p-4 space-y-3">
              <h2 className="text-4xl md:text-4xl font-bold text-black sujoy">
                {project.name}
              </h2>
              <p className="text-zinc-700 text-end sujoy3">{project.description}</p>
               <div className="flex justify-end">
                <button
                  onClick={() => handleViewDetails(project)}
                  className="text-black cursor-pointer underline hover:text-orange-500 font-semibold sujoy text-2xl inline-flex items-center group"
                >
                  View Details <FaArrowRight className="h-4" />
                </button>
              </div>

              {/* Review Box */}
              <div className="flex flex-col items-start md:flex-row md:items-center gap-4 border-t border-zinc-300 pt-4 mt-2">
                <img
                  src={project.review.img}
                  alt={project.review.name}
                  className="w-12 h-12 rounded-full border-2 border-zinc-300 flex-shrink-0"
                />
                <p className="text-sm font-semibold italic text-zinc-700">
                  "{project.review.text}"
                </p>
              </div>

              {/* View Details Link */}
             
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
