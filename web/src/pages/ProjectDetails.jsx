import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fullstackProjects } from "../constant/fullstackProjects";
import { frontendDesigns } from "../constant/frontendDesigns";
import { HiArrowLeft, HiExternalLink, HiCode, HiCheckCircle } from "react-icons/hi";
import projectStore from "../store/projectStore.js";

export default function ProjectDetails() {
  const { id, type } = useParams();
  const { getProjectById, singleProject, isLoading, error } = projectStore();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get constant projects based on type
  const constantProjects = type === "frontend" ? frontendDesigns : fullstackProjects;
  
  // Find project in constants first (using numeric ID)
  const constantProject = constantProjects.find((p) => p.id === parseInt(id));

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      
      // First check if it's a MongoDB ObjectId (API project)
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      
      if (isObjectId) {
        // This is an API project ID
        try {
          await getProjectById(id);
        } catch (err) {
          console.error("Error fetching project from API:", err);
        }
      } else {
        // This is a constant project ID
        // Use the constant project we already found
        if (constantProject) {
          setProject(constantProject);
        }
      }
      setLoading(false);
    };

    fetchProject();
  }, [id, getProjectById, constantProject]);

  // Merge API project with constant project when both are available
  useEffect(() => {
    if (singleProject && singleProject._id === id) {
      // API project exists - check if we should merge with constant or use API only
      if (constantProject && hasValidData(singleProject)) {
        // Merge API data with constant data (API data takes priority)
        const mergedProject = mergeProjectData(constantProject, singleProject);
        setProject(mergedProject);
      } else if (hasValidData(singleProject)) {
        // Only API project exists with valid data
        const apiProject = formatApiProject(singleProject);
        setProject(apiProject);
      } else {
        // API project exists but has no valid data, use constant if available
        if (constantProject) {
          setProject(constantProject);
        } else {
          setProject(null);
        }
      }
    } else if (constantProject && !singleProject) {
      // Only constant project exists
      setProject(constantProject);
    }
  }, [singleProject, constantProject, id]);

  // Helper function to check if API project has valid data
  const hasValidData = (apiProject) => {
    return apiProject && 
           apiProject.name && 
           apiProject.img && 
           apiProject.description;
  };

  // Helper function to check if API has valid review data
  const hasValidReview = (apiProject) => {
    return apiProject.reviewData && 
           apiProject.reviewData.text && 
           apiProject.reviewData.name;
  };

  // Helper function to merge project data
  const mergeProjectData = (constantProject, apiProject) => {
    const mergedProject = {
      // Start with constant project as base
      ...constantProject,
      // Override with API data where available
      name: apiProject.name || constantProject.name,
      description: apiProject.description || constantProject.description,
      img: apiProject.img || constantProject.img,
      tech: apiProject.tech && apiProject.tech.length > 0 ? apiProject.tech : constantProject.tech,
      liveLink: apiProject.liveLink || constantProject.liveLink,
      githubLink: apiProject.githubLink || constantProject.githubLink,
      // Keep both IDs for reference
      id: constantProject.id, // Keep constant ID for routing consistency
      _id: apiProject._id // Store API ID
    };

    // Only add review if API has valid review data
    if (hasValidReview(apiProject)) {
      mergedProject.review = {
        img: apiProject.reviewData?.img || constantProject.review.img,
        name: apiProject.reviewData?.name || constantProject.review.name,
        role: apiProject.reviewData?.role || constantProject.review.role,
        text: apiProject.reviewData?.text || constantProject.review.text
      };
    } else {
      // Use constant review if API doesn't have valid review
      mergedProject.review = constantProject.review;
    }

    return mergedProject;
  };

  // Helper function to format API-only project
  const formatApiProject = (apiProject) => {
    const formattedProject = {
      id: apiProject._id, // Use _id as id for routing
      _id: apiProject._id,
      name: apiProject.name,
      description: apiProject.description,
      img: apiProject.img,
      tech: apiProject.tech || [],
      liveLink: apiProject.liveLink || "#",
      githubLink: apiProject.githubLink || "#"
    };

    // Only add review if API has valid review data
    if (hasValidReview(apiProject)) {
      formattedProject.review = {
        img: apiProject.reviewData?.img || "/default-avatar.png",
        name: apiProject.reviewData?.name || "Client",
        role: apiProject.reviewData?.role || "Customer",
        text: apiProject.reviewData?.text || "Great work on this project!"
      };
    }

    return formattedProject;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4 text-8xl">⏳</div>
          <h1 className="text-4xl font-bold text-gray-900">Loading Project...</h1>
          <p className="mt-2 text-lg text-gray-600">
            Please wait while we fetch the project details.
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !project) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4 text-8xl">❌</div>
          <h1 className="text-4xl font-bold text-gray-900">Error Loading Project</h1>
          <p className="mt-2 text-lg text-gray-600">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Project not found state
  if (!project) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4 text-8xl">😕</div>
          <h1 className="text-4xl font-bold text-gray-900">Project Not Found</h1>
          <p className="mt-2 text-lg text-gray-600">
            Oops! The project you are looking for does not exist.
          </p>
          <Link
            to="/project"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-600 transition"
          >
            <HiArrowLeft />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="p-0 text-black">
      <div className="mx-auto max-w-6xl mt-18 px-4 py-8">
        <Link
          to="/project"
          className="mb-12 inline-flex items-center gap-2 text-gray-600 hover:text-orange-400 transition"
        >
          <HiArrowLeft className="text-xl" />
          <span className="font-semibold">Back to Projects</span>
        </Link>

        {/* Project Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold sujoy lg:text-8xl">{project.name}</h1>
          <p className="mx-auto mt-2 max-w-3xl sujoy3 text-lg">{project.description}</p>
        </div>

        {/* Project Image */}
        <div className="mb-8 overflow-hidden rounded-2xl shadow">
          <img
            src={project.img}
            alt={`${project.name} screenshot`}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Tech Stack */}
            <div className="p-2">
              <h3 className="mb-4 text-4xl font-bold sujoy">Technologies Used 🛠️</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech && project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded bg-orange-500/80 px-4 py-2 text-sm sujoy3 font-bold text-black"
                  >
                    {tech}
                  </span>
                ))}
                {(!project.tech || project.tech.length === 0) && (
                  <p className="text-gray-500 sujoy3">No technologies listed</p>
                )}
              </div>
            </div>

            {/* Review Box - Only show if review exists and has text */}
            {project.review && project.review.text && (
              <div className="p-2">
                <div className="flex items-start gap-4">
                  <img
                    src={project.review.img}
                    alt={project.review.name}
                    className="h-14 w-14 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                  <blockquote className="flex-1">
                    <header className="sujoy text-3xl">
                      {project.review.name}
                    </header>
                    <p className="text-md italic leading-relaxed sujoy3">"{project.review.text}"</p>
                    <footer className="mt-4 sujoy text-xl font-semibold text-gray-700">
                      {project.review.role}
                    </footer>
                  </blockquote>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-4">
              <h3 className="mb-3 text-4xl font-bold sujoy">Project Links</h3>
              <div className="space-y-4">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center sujoy text-2xl justify-center gap-2 rounded bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition"
                >
                  <span>Live Preview</span>
                  <HiExternalLink className="h-5 w-5" />
                </a>
                {project.githubLink && project.githubLink !== "#" && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-100 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-200 transition"
                  >
                    <span>View Code</span>
                    <HiCode className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}