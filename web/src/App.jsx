import React from 'react';

/**
 * A simple card component with an inner curved bottom-right corner.
 * This effect is achieved by overlaying an SVG shape in the corner.
 * The SVG's fill color must match the background color of the page to create the illusion of a cutout.
 */
const CurvedCornerBox = () => {
  return (
    // The main box container. It must be positioned relatively
    // so the absolute-positioned SVG corner stays inside.
    // NOTE: Tailwind's largest standard radius is `rounded-3xl`.
    <div className="relative w-full max-w-md bg-gray-100 p-8 rounded-3xl shadow-lg overflow-hidden">
      
      {/* This div holds the content and keeps it above the corner SVG */}
      <div className="relative z-10">
        <h2 className="text-4xl sujoy font-bold text-gray-800">
          SUJOY GARAI
        </h2>
        <p className="mt-2 sujoy text-gray-600">
         Hi, I’m the SEO specialist and founder of this agency. If you’re looking for beautiful, clean, and high-quality work at an affordable price, feel free to contact us. We provide creative ideas and complete solutions that fit your budget — no hassle, just results.
        </p>
      </div>

      {/* This is the element that creates the inner curve effect.
        - It's positioned absolutely at the bottom-right.
        - The `text-white` class sets the color for the SVG's `fill="currentColor"`. 
          This should match the page's background color.
      */}
      <div className="absolute bottom-0 right-0 w-20 h-20 text-white">
        <svg 
          viewBox="0 0 80 80" 
          fill="currentColor" 
          className="w-full h-full"
        >
          {/*
            SVG Path Explanation:
            - M 80 0: Moves the "pen" to the top-right corner of the SVG canvas.
            - Q 0 0 0 80: Draws a quadratic Bézier curve.
              - The curve starts from the current point (80, 0).
              - The control point is at the top-left (0, 0), which pulls the curve inwards.
              - The curve ends at the bottom-left (0, 80).
            - L 80 80: Draws a straight line from the end of the curve to the bottom-right.
            - Z: Closes the path by drawing a line back to the starting point (80, 0).
            This creates a shape that fills the corner with a curved cutout.
          */}
          <path d="M 80 0 Q 0 0 0 80 L 80 80 Z" />
        </svg>
      </div>
    </div>
  );
};


// The main App component to display the box on a white background.
function App() {
  return (
    <main className="bg-white min-h-screen w-full flex items-center justify-center p-4">
      <CurvedCornerBox />
    </main>
  );
}

export default App;
