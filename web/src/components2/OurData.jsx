import React, { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { reviews } from "../constant/review";

const countersData = [
  { label: "Finalized Projects", target: 26, suffix: "+" },
  { label: "Client satisfaction rate", target: 98, suffix: "%" },
  { label: "Team Member", target: 10, suffix: "+" },
];

export default function TestimonialSection() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const [currentReview, setCurrentReview] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCounting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Counter animation logic
  useEffect(() => {
    if (!isCounting) return;
    const duration = 2000;

    const intervals = countersData.map((counter, idx) => {
      let current = 0;
      const stepTime = Math.max(Math.floor(duration / counter.target), 20);

      const timer = setInterval(() => {
        current += 1;
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[idx] = current;
          return newCounts;
        });
        if (current === counter.target) clearInterval(timer);
      }, stepTime);

      return timer;
    });

    return () => intervals.forEach(clearInterval);
  }, [isCounting]);

  // Auto-slider
  useEffect(() => {
    const slider = setInterval(() => handleNextReview(), 5000);
    return () => clearInterval(slider);
  }, [currentReview]);

  const handlePrevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const review = reviews[currentReview];

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Counters */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 md:p-12 flex flex-row lg:flex-col justify-between lg:w-1/3 w-full h-auto lg:h-[500px] shadow-2xl">
          {countersData.map((item, idx) => (
            <div key={idx} className="text-center lg:text-left mb-4 lg:mb-0">
              <h2 className="text-5xl md:text-7xl sujoy font-bold">
                {counts[idx]}
                {item.suffix}
              </h2>
              <p className="text-gray-300 mt-2 sujoy3">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Slider */}
        <div className="relative w-full lg:w-2/3 h-[400px] sm:h-[450px] md:h-[500px] rounded-3xl shadow-2xl overflow-hidden">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                idx === currentReview ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={r.bgImg}
                alt="Testimonial bg"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          ))}

          {/* Content */}
          <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between text-white">
            <div>
              <span className="text-yellow-400 font-semibold text-sm sm:text-base tracking-widest opacity-80">
                0{currentReview + 1} / 0{reviews.length}
              </span>
              <blockquote className="mt-4 sm:mt-8 text-lg md:text-2xl italic font-semibold sujoy leading-snug">
                "{review.review}"
              </blockquote>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-2 border-yellow-400 overflow-hidden">
                <img
                  src={review.clientImg}
                  alt={review.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-lg sm:text-2xl sujoy3">{review.name}</p>
                <p className="text-sm sm:text-base opacity-80 sujoy3">{review.company}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-4 md:bottom-8 right-4 flex items-center gap-4">
            <button
              onClick={handlePrevReview}
              className="bg-white/10 backdrop-blur-sm p-2 md:p-3 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <FaChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextReview}
              className="bg-white/10 backdrop-blur-sm p-2 md:p-3 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
