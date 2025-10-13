// src/pages/TeamList.jsx
import React from "react";
import { Link } from "react-router-dom";
import { teamData } from "../constant/teamData";
import { FaArrowRight, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa6";

const TeamList = () => {
  return (
    <div className="min-h-screen py-26 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-8xl sujoy font-bold text-black mb-4">Meet Our Team</h1>
          <p className="text-xl sujoy3 text-gray-600 max-w-2xl mx-auto">
            Talented professionals dedicated to creating amazing experiences
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Social Links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <FaLinkedin size={14} />
                    </a>
                  )}
                  {member.links.github && (
                    <a
                      href={member.links.github}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <FaGithub size={14} />
                    </a>
                  )}
                  {member.links.portfolio && (
                    <a
                      href={member.links.portfolio}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full text-green-600 hover:bg-green-50 transition-colors duration-200"
                    >
                      <FaGlobe size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-5xl md:text-6xl lg:text-6xl  sujoy font-bold text-gray-800 mb-1">{member.name}</h2>
                  <div className="inline-block sujoy3 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm font-semibold mb-3">
                    {member.role}
                  </div>
                  <p className="text-gray-600 sujoy3 text-sm leading-relaxed line-clamp-3">
                    {member.description}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-xs font-medium">
                        +{member.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* View Profile Button */}
                <Link
                  to={`/team/${member.urlName}`}
                  className="flex items-center justify-between w-full p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 group/btn"
                >
                  <span className="font-semibold text-sm">View Profile</span>
                  <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-200" size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamList;