import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const images = [
  {
    id: 1,
    src: "https://s3-alpha.figma.com/hub/file/4323747573/a14783f4-fe49-4c87-ad29-bb97d9b612e6-cover.png",
    desc: "",
  },
  {
    id: 2,
    src: "https://s.tmimgcdn.com/scr/1200x627/383000/cuppa-coffee-shop-html5-website-template_383030-original.png",
    desc: "",
  },
  {
    id: 3,
    src: "https://pixel77.com/wp-content/uploads/2024/06/ecommerce-website-designs-1-1024x768.webp",
    desc: "",
  },
  {
    id: 4,
    src: "https://images-platform.99static.com//ui6uGfGy0G5Sba1teijGcWccRrs=/0x0:1440x1440/fit-in/590x590/99designs-contests-attachments/73/73759/attachment_73759345",
    desc: "",
  },
  {
    id: 5,
    src: "https://cdn.dribbble.com/userupload/14960770/file/original-7dce2b577e15ac3831fdcaf72cfe84c9.png?crop=0x0-1200x900&format=webp&resize=400x300&vertical=center",
    desc: "",
  },
  {
    id: 6,
    src: "https://cdn.dribbble.com/userupload/15352139/file/original-3ef59c5742160a03f850541775d1ba69.jpg?resize=752x&vertical=center",
    desc: "",
  },
];

export default function PostPage() {
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    setSelected((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelected((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setSelected(null);
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  return (
    <div className="min-h-full max-w-7xl mx-auto p-6 mt-18">
      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {images.map((img, index) => (
          <div
            key={img.id}
            className="relative overflow-hidden rounded shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 aspect-square"
            onClick={() => setSelected(index)}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end">
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selected !== null && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute cursor-pointer top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <FaTimes size={20} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <FaArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <FaArrowRight size={20} />
            </button>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center p-4 max-h-[70vh]">
              <img
                src={images[selected].src}
                alt={images[selected].title}
                className="rounded-lg max-w-full max-h-full object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="p-4">
              <div className="text-center">
                <p className="text-gray-600 mb-4 text-lg">{images[selected].desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}