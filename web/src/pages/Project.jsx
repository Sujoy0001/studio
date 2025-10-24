import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { fullstackProjects } from "../constant/fullstackProjects";
import { frontendDesigns } from "../constant/frontendDesigns";
import { FaArrowRight } from "react-icons/fa";
import projectStore from "../store/projectStore.js"

export default function Project() {
  const [selected, setSelected] = useState("fullstack");
  const [mergedProjects, setMergedProjects] = useState([]);
  const navigate = useNavigate();
  const { getProjectById, singleProject, getAllProjects, projects: apiProjects, isLoading, error } = projectStore();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, []);

  // Fetch projects from API when component mounts
  useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);

  // Merge API projects with constant projects based on selection
  useEffect(() => {
    if (selected === "fullstack") {
      // Merge API fullstack projects with constant fullstack projects
      const apiFullstackProjects = apiProjects.filter(project => 
        project.category === "fullstack" || !project.category
      );
      const merged = mergeProjects(apiFullstackProjects, fullstackProjects);
      setMergedProjects(merged);
    } else {
      // Merge API frontend projects with constant frontend designs
      const apiFrontendProjects = apiProjects.filter(project => 
        project.category === "frontend"
      );
      const merged = mergeProjects(apiFrontendProjects, frontendDesigns);
      setMergedProjects(merged);
    }
  }, [selected, apiProjects]);

  // Helper function to merge API projects with constant projects
  const mergeProjects = (apiProjects, constantProjects) => {
    // Create a map of constant projects by name for easy lookup
    const constantProjectsMap = new Map();
    constantProjects.forEach(project => {
      constantProjectsMap.set(project.name.toLowerCase(), project);
    });

    // Merge API projects with constant projects
    const merged = apiProjects.map(apiProject => {
      const constantProject = constantProjectsMap.get(apiProject.name.toLowerCase());
      
      if (constantProject) {
        // If found in constants, merge them with API data taking priority
        return {
          ...constantProject, // Start with constant values
          ...apiProject, // Override with API values
          // Ensure we keep the constant ID for routing
          id: constantProject.id,
          // Merge review data - prefer API review if available
          review: apiProject.review && apiProject.review.text ? 
            apiProject.review : constantProject.review
        };
      }
      
      // If not found in constants, use API project with generated ID
      return {
        ...apiProject,
        id: apiProject._id || apiProject.id, // Use _id from API or existing id
        // Ensure review has the expected structure
        review: apiProject.review && apiProject.review.text ? apiProject.review : {
          img: "",
          name: "Client",
          text: apiProject.description || "No review available"
        }
      };
    });

    // Add any constant projects that weren't in the API response
    constantProjects.forEach(constantProject => {
      const existsInApi = merged.some(project => 
        project.name.toLowerCase() === constantProject.name.toLowerCase()
      );
      if (!existsInApi) {
        merged.push(constantProject);
      }
    });

    return merged;
  };

  const handleViewDetails = (project) => {
    const type = selected === "fullstack" ? "fullstack" : "frontend";
    
    // Use the appropriate ID based on source
    const projectId = project._id || project.id;
    
    if (project._id) {
      // This is from API, navigate to API-based detail page
      navigate(`/project/${type}/${projectId}`);
    } else {
      // This is from constants, navigate to constant-based detail page
      navigate(`/project/${type}/${projectId}`);
    }
  };

  // Loading state
  if (isLoading && mergedProjects.length === 0) {
    return (
      <section className="max-w-7xl mx-auto md:px-6 py-20">
        <div className="text-center mt-8 mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-black sujoy">
            Our's Projects
          </h1>
          <p className="md:text-lg max-w-4xl px-6 mx-auto text-zinc-700 mt-3 sujoy3">
            Loading projects...
          </p>
        </div>
      </section>
    );
  }

  // Error state
  if (error && mergedProjects.length === 0) {
    return (
      <section className="max-w-7xl mx-auto md:px-6 py-20">
        <div className="text-center mt-8 mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-black sujoy">
            Our's Projects
          </h1>
          <p className="md:text-lg max-w-4xl px-6 mx-auto text-red-600 mt-3 sujoy3">
            Error loading projects: {error}
          </p>
          <button 
            onClick={() => getAllProjects()}
            className="mt-4 px-6 py-2 bg-orange-500 text-black rounded sujoy text-xl font-semibold"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

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
          creativity, and attention to detail behind every project I've crafted.
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

      {/* Loading indicator when switching categories */}
      {isLoading && (
        <div className="text-center py-4">
          <p className="text-zinc-600 sujoy3">Loading projects...</p>
        </div>
      )}

      {/* Project Cards */}
      <div className="grid lg:grid-cols-2 gap-12">
        {mergedProjects.map((project) => (
          <div
            key={project._id || project.id}
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
              {project.review && (
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
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {mergedProjects.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-zinc-600 sujoy3 text-xl">No projects found for this category.</p>
        </div>
      )}
    </section>
  );
}