import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import postStore from "../store/postStore.js";

// Default posts (your hardcoded images)
const defaultPosts = [
  {
    _id: "default-1",
    img: "https://s3-alpha.figma.com/hub/file/4323747573/a14783f4-fe49-4c87-ad29-bb97d9b612e6-cover.png",
    discription: "",
  },
  {
    _id: "default-2",
    img: "https://s.tmimgcdn.com/scr/1200x627/383000/cuppa-coffee-shop-html5-website-template_383030-original.png",
    discription: "",
  },
  {
    _id: "default-3",
    img: "https://pixel77.com/wp-content/uploads/2024/06/ecommerce-website-designs-1-1024x768.webp",
    discription: "",
  },
  {
    _id: "default-4",
    img: "https://images-platform.99static.com//ui6uGfGy0G5Sba1teijGcWccRrs=/0x0:1440x1440/fit-in/590x590/99designs-contests-attachments/73/73759/attachment_73759345",
    discription: "",
  },
  {
    _id: "default-5",
    img: "https://cdn.dribbble.com/userupload/14960770/file/original-7dce2b577e15ac3831fdcaf72cfe84c9.png?crop=0x0-1200x900&format=webp&resize=400x300&vertical=center",
    discription: "",
  },
  {
    _id: "default-6",
    img: "https://cdn.dribbble.com/userupload/15352139/file/original-3ef59c5742160a03f850541775d1ba69.jpg?resize=752x&vertical=center",
    discription: "",
  },
];

export default function PostPage() {
  const [selected, setSelected] = useState(null);
  const [combinedPosts, setCombinedPosts] = useState(defaultPosts);
  const { posts, getAllPosts, isLoading, error } = postStore();

  // Combine default posts with server posts when posts are fetched
  useEffect(() => {
    if (posts && posts.length > 0) {
      // Combine default posts with server posts
      // You can change the order here - currently server posts come after default posts
      const allPosts = [...defaultPosts, ...posts];
      setCombinedPosts(allPosts);
    } else {
      // If no server posts, just show default posts
      setCombinedPosts(defaultPosts);
    }
  }, [posts]);

  // Fetch posts when component mounts
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleNext = () => {
    setSelected((prev) => (prev + 1) % combinedPosts.length);
  };

  const handlePrev = () => {
    setSelected((prev) => (prev - 1 + combinedPosts.length) % combinedPosts.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setSelected(null);
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  // Show loading state (only for server posts, default posts are already shown)
  if (isLoading) {
    return (
      <div className="min-h-full max-w-7xl mx-auto p-6 mt-18">
        {/* Show default posts while loading */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {combinedPosts.map((post, index) => (
            <div
              key={post._id}
              className="relative overflow-hidden rounded shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 aspect-square"
              onClick={() => setSelected(index)}
            >
              <img
                src={post.img}
                alt={post.discription}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-end">
              </div>
            </div>
          ))}
        </div>
        
        {/* Loading indicator */}
        <div className="text-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading more posts...</p>
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
              <button
                onClick={() => setSelected(null)}
                className="absolute cursor-pointer top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <FaTimes size={20} />
              </button>

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

              <div className="flex-1 flex items-center justify-center p-4 max-h-[70vh]">
                <img
                  src={combinedPosts[selected].img}
                  alt={combinedPosts[selected].discription}
                  className="rounded-lg max-w-full max-h-full object-contain"
                />
              </div>

              <div className="p-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-4 text-lg">
                    {combinedPosts[selected].discription}
                    {combinedPosts[selected].isDefault && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show error state (still show default posts even if server fails)
  if (error) {
    return (
      <div className="min-h-full max-w-7xl mx-auto p-6 mt-18">
        {/* Error message */}
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Error loading server posts: {error}</p>
          <button 
            onClick={getAllPosts}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Try Again
          </button>
        </div>

        {/* Show combined posts (default + any server posts that loaded) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {combinedPosts.map((post, index) => (
            <div
              key={post._id}
              className="relative overflow-hidden rounded shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 aspect-square"
              onClick={() => setSelected(index)}
            >
              <img
                src={post.img}
                alt={post.discription}
                className="w-full h-full object-cover"
              />
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
              <button
                onClick={() => setSelected(null)}
                className="absolute cursor-pointer top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <FaTimes size={20} />
              </button>

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

              <div className="flex-1 flex items-center justify-center p-4 max-h-[70vh]">
                <img
                  src={combinedPosts[selected].img}
                  alt={combinedPosts[selected].discription}
                  className="rounded-lg max-w-full max-h-full object-contain"
                />
              </div>

              <div className="p-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-4 text-lg">
                    {combinedPosts[selected].discription}
                    {combinedPosts[selected].isDefault && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-full max-w-7xl mx-auto p-6 mt-18">
      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {combinedPosts.map((post, index) => (
          <div
            key={post._id}
            className="relative overflow-hidden rounded shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 aspect-square"
            onClick={() => setSelected(index)}
          >
            <img
              src={post.img}
              alt={post.discription}
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
                src={combinedPosts[selected].img}
                alt={combinedPosts[selected].discription}
                className="rounded-lg max-w-full max-h-full object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="p-4">
              <div className="text-center">
                <p className="text-gray-600 mb-4 text-lg">
                  {combinedPosts[selected].discription}
                  {combinedPosts[selected].isDefault && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}