import LogoLoop from '../animations/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import img1 from "../assets/logo/next.png"
import img2 from "../assets/logo/node.png"
import img3 from "../assets/logo/React.png"
import img4 from "../assets/logo/tailwind.png"
import img5 from "../assets/logo/Vercel.png"

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: img1, alt: "Next JS", href: "#" },
  { src: img2, alt: "Node JS", href: "#" },
  { src: img3, alt: "React JS", href: "#" },
  { src: img4, alt: "Tailwind CSS", href: "#" },
  { src: img5, alt: "Vercel", href: "#" },
];

export default function Logoloop() {
  return (
    <div style={{ height: '60px', position: 'relative', overflow: 'hidden'}} >
      <LogoLoop
        logos={imageLogos}
        speed={50}
        direction="left"
        logoHeight={52}
        gap={60}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
  );
}