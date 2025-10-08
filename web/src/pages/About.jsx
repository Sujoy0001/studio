import { useEffect } from "react";
import roomimg from "../assets/room.png"

export default function About() {

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, []);


  return (
    <section className="text-black py-6">
      <div className="mx-auto max-w-5xl mt-24">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl sujoy font-extrabold lg:text-8xl">
            About Our Agency
          </h2>
          <p className="mt-2 sujoy3 max-w-3xl mx-auto text-lg text-gray-600">
            We are a creative digital agency focused on building high-quality, user-friendly websites and applications. Our team combines expertise in frontend and backend development with a passion for clean design and seamless user experiences.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column: Agency Mission */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold sujoy">Our Mission</h3>
            <p className="text-gray-700 sujoy3">
              Our mission is to help businesses and individuals bring their digital ideas to life. We focus on creating solutions that are visually appealing, highly functional, and optimized for performance across all devices.
            </p>

            <h3 className="text-3xl font-bold sujoy">Our Approach</h3>
            <p className="text-gray-700 sujoy3">
              We believe in understanding our clients’ goals, brainstorming creative solutions, and executing with precision. From initial design concepts to full-stack development, we ensure every project meets high standards and exceeds expectations.
            </p>

            <h3 className="text-3xl font-bold sujoy">Our Expertise</h3>
            <p className="text-gray-700 sujoy3">
              Our team is skilled in React, Django, FastAPI, Tailwind CSS, and more. We handle both frontend and backend development, providing end-to-end solutions that deliver a seamless digital experience.
            </p>
          </div>

          {/* Right Column: Image / Illustration */}
          <div className="flex items-center justify-center">
            <img
              src={roomimg} // Replace with your agency image
              alt="Our Agency Team"
              className="rounded-2xl shadow-lg object-cover w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
