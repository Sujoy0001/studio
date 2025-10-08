import React from "react";
import { useParams, Link } from "react-router-dom";
import { fullstackProjects } from "../constant/fullstackProjects";
import { frontendDesigns } from "../constant/frontendDesigns";
import { HiArrowLeft, HiExternalLink, HiCode, HiCheckCircle } from "react-icons/hi";

export default function ProjectDetails() {
  const { id, type } = useParams();

  const projectList = type === "frontend" ? frontendDesigns : fullstackProjects;
  const project = projectList.find((p) => p.id === parseInt(id));

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
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
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
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded bg-orange-500/80 px-4 py-2 text-sm sujoy3 font-bold text-black"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Review Box */}
            <div className="p-2">
              <div className="flex items-start gap-4">
                <img
                  src={project.review.img}
                  alt={project.review.name}
                  className="h-14 w-14 rounded-full object-cover"
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
                {project.githubLink && (
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
