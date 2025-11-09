// src/pages/TeamMember.jsx
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { teamData } from "../constant/teamData";
import { FaGithub, FaLinkedin, FaGlobe, FaFacebook, FaInstagram, FaXTwitter, FaDiscord, FaArrowLeft, FaEnvelope } from "react-icons/fa6";
import teamStore from "../store/teamStore";

const TeamMember = () => {
  const { members, getAllTeamMembers } = teamStore();
  const { name } = useParams();

  useEffect(() => {
    if (members.length === 0) getAllTeamMembers();
  }, []);

  const member = teamData.find((m) => m.urlName === name) || members.find((m) => m.urlName === name);
  const socials = member?.linkDetails?.socials || {}; 

  if (!member) return <div className="text-center px-10 py-32 text-black font-semibold text-4xl flex justify-center items-center italic">Member not found</div>;

  return (
    <div className="min-h-screen py-18 md:py-24 px-4 flex justify-center items-center">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Image */}
            <div className="lg:w-2/5 p-8 flex flex-col items-center lg:items-start">
              <div className="relative mb-6">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl object-cover shadow-md"
                />
                <div className="absolute inset-0 rounded-2xl border-2 border-white shadow-inner"></div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 text-xl mb-6">
                {socials.facebook && (
                  <a 
                    href={socials.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-100 text-blue-600  rounded-xl hover:bg-blue-200 transition-all duration-200 hover:scale-110"
                  >
                    <FaFacebook />
                  </a>
                )}
                {socials.instagram && (
                  <a 
                    href={socials.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-pink-100 text-pink-600 rounded-xl hover:bg-pink-200 transition-all duration-200 hover:scale-110"
                  >
                    <FaInstagram />
                  </a>
                )}
                {socials.x && (
                  <a 
                    href={socials.x} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 hover:scale-110"
                  >
                    <FaXTwitter />
                  </a>
                )}
                {socials.discord && (
                  <a 
                    href={socials.discord} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-all duration-200 hover:scale-110"
                  >
                    <FaDiscord />
                  </a>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 text-gray-600 p-2 rounded-xl justify-center">
                <FaEnvelope className="text-blue-500" />
                <span className="text-lg sujoy3 font-medium">{member.email}</span>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:w-3/5 px-8 lg:p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-5xl md:text-6xl xl:text-8xl sujoy font-bold text-gray-800 mb-3">
                  {member.name}
                </h1>
                <div className="inline-block sujoy bg-gradient-to-r from-blue-500 to-purple-600 text-black px-4 py-2 rounded text-xl font-semibold">
                  {member.role}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-600 sujoy3 text-lg leading-relaxed">
                  {member.description}
                </p>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-4 py-2 rounded text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-12">
                {member?.linkDetails?.links?.linkedin && (
                  <a
                    href={member?.linkDetails?.links?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <FaLinkedin className="text-lg" />
                    <span className="font-semibold">LinkedIn</span>
                  </a>
                )}
                {member?.linkDetails?.links?.github && (
                  <a
                    href={member?.linkDetails?.links?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <FaGithub className="text-lg" />
                    <span className="font-semibold">GitHub</span>
                  </a>
                )}
                {member?.linkDetails?.links?.portfolio && (
                  <a
                    href={member?.linkDetails?.links?.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <FaGlobe className="text-lg" />
                    <span className="font-semibold">Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;