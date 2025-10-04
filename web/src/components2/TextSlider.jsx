import CurvedLoop from '../animations/CurvedLoop';

export default function TextSlider() {
  return (
    <div className="w-full overflow-hidden py-2 mb-4 md:mb-0">
      <CurvedLoop 
        marqueeText="Be ✦ Creative ✦ With ✦ Your ✦ Business ✦"
        speed={2}
        curveAmount={0}
        direction="right"
        interactive={true}
        className="text-[150px] md:text-7xl font-bold text-orange-400 tracking-wide whitespace-nowrap"
      />
    </div>
  );
}
