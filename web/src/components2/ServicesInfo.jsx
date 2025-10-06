// src/components/ServicesIntro.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Website Design & Development",
    description:
      "Create modern, responsive, and user-friendly websites for startups, businesses, and personal brands. We specialize in HTML, CSS, JavaScript, Tailwind, React, and Django.",
    icon: "💻",
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Build online stores with integrated payment gateways, inventory management, and smooth shopping experiences that increase sales and improve customer retention.",
    icon: "🛒",
  },
  {
    title: "Custom Web Applications",
    description:
      "Develop tailor-made applications like ticket booking systems and dashboards to streamline business processes with scalable, secure, and high-performing solutions.",
    icon: "⚡",
  },
  {
    title: "Digital Strategy & Branding",
    description:
      "Help startups launch sharper brands and websites with brand identity, UI/UX design, and marketing strategies that drive traffic and grow your business.",
    icon: "🎯",
  },
];

// Service Card Component - Size is now constant
const ServiceCard = ({ service, isActive, isDimmed, onClick }) => {
  const cardVariants = {
    // All "scale" properties are removed to keep size the same
    initial: { opacity: 1, rotateY: 0 },
    hover: { rotateY: 5, zIndex: 10, transition: { duration: 0.3, ease: "easeOut" } },
    active: { zIndex: 20, rotateY: 0 },
    dimmed: { opacity: 0.5 },
  };

  return (
    <motion.div
      onClick={onClick}
      variants={cardVariants}
      initial="initial"
      animate={isActive ? "active" : isDimmed ? "dimmed" : "initial"}
      whileHover="hover"
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      // The `layout` prop is removed as it's no longer needed
      className="flex-none w-[28rem] h-[18rem] rounded-3xl p-8 cursor-pointer bg-white border border-gray-200/80 shadow-xl"
    >
      <div className="text-5xl mb-4">{service.icon}</div>
      <h3 className="text-4xl sujoy font-bold text-gray-800 mb-3">{service.title}</h3>
      <p className="text-gray-600 font-semibold italic leading-relaxed">{service.description}</p>
    </motion.div>
  );
};

export default function ServicesIntro() {
  const [activeIndex, setActiveIndex] = useState(null);
  const repeatedServices = [...services, ...services];

  const styles = `
    @keyframes scroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .animate-scroll {
      animation: scroll 40s linear infinite;
    }
  `;

  return (
    <section className="relative py-12 text-black w-full overflow-hidden font-sans">
      <style>{styles}</style>
      
      {/* Title */}
      <div className="relative z-10 text-center mb-8 px-4">
        <h2 className="text-6xl sujoy font-bold mb-4 text-black">
          Our Services
        </h2>
        <p className="text-lg sujoy3 text-gray-600 max-w-3xl mx-auto">
          From concept to launch, we offer end-to-end solutions that elevate your brand.
        </p>
      </div>

      {/* 3D Perspective Container */}
      <div style={{ perspective: '1200px' }} className="group relative w-full flex items-center min-h-[22rem]">
        {/* Gradient Fades for Light Theme */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div
          // Simplified logic: scrolling now ONLY stops on hover
          className={`flex gap-8 w-max animate-scroll group-hover:[animation-play-state:paused]`}
        >
          {repeatedServices.map((service, index) => {
            const originalIndex = index % services.length;
            const isActive = activeIndex === originalIndex;
            const isDimmed = activeIndex !== null && !isActive;

            return (
              <ServiceCard
                key={index}
                service={service}
                isActive={isActive}
                isDimmed={isDimmed}
                onClick={() =>
                  setActiveIndex(isActive ? null : originalIndex)
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}