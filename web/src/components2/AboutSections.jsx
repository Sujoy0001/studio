import PixelBlast from '../animations/createTouchTexture';

const AboutSection = () => {
  return (
    <div className="relative bg-black m-8 rounded-4xl w-[95%] h-[600px] overflow-hidden flex flex-col items-center justify-center text-center p-6">
      
      {/* Pixel Animation */}
      <PixelBlast
        variant="circle"
        pixelSize={8}
        color="#ffffff"
        patternScale={3}
        patternDensity={1.2}
        pixelSizeJitter={0.5}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.6}
        edgeFade={0.25}
        transparent
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white z-10">
        <h1 className="text-4xl font-bold">Hello World</h1>
        <p className="max-w-xl text-center text-lg">
          We 
help 
fast 
moving 
digital 
startups 
launch 
sharper 
brands 
and 
websites 
— 
with 
clarity 
, 
speed, 
and 
no 
drama. </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button className="px-6 py-2 bg-orange-500 rounded-full hover:bg-orange-600 transition">Button 1</button>
          <button className="px-6 py-2 bg-orange-500 rounded-full hover:bg-orange-600 transition">Button 2</button>
          <button className="px-6 py-2 bg-orange-500 rounded-full hover:bg-orange-600 transition">Button 3</button>
          <button className="px-6 py-2 bg-orange-500 rounded-full hover:bg-orange-600 transition">Button 4</button>
          <button className="px-6 py-2 bg-orange-500 rounded-full hover:bg-orange-600 transition">Button 5</button>
          <button className="px-6 py-2 bg-orange-500 rounded-full hover:bg-orange-600 transition">Button 6</button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
