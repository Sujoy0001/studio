// src/data/fullstackProjects.js
import img1 from "../assets/images/unq.png"
import img2 from "../assets/images/krishti.png"
import img3 from "../assets/images/tcas.png"


import client1 from "../assets/clientimg/animaji.jpg"
import client2 from "../assets/clientimg/Animesh.jpg"
import client3 from "../assets/clientimg/sujoy.jpg"

export const fullstackProjects = [
  {
    id: 1,
    name: "Dokhra E-commerce Website",
    img: img1,
    description:
        "A beautifully crafted e-commerce platform showcasing traditional Dokhra handcrafted art pieces. The website allows users to explore, purchase, and learn about the artisan process behind each creation, connecting local artisans to global customers.",
    tech: ["Node.js", "React", "MongoDB", "TailwindCSS"],
    review: {
        img: client1,
        name: "Animesh maji",
        role: "Founder of Uniquedokhraworkshop",
        text: "The Dokra website is an absolute masterpiece! The design beautifully showcases the intricate metal art, and the product pages are clean, visually appealing, and easy to navigate. The site truly captures the essence of traditional craftsmanship while maintaining a modern, user-friendly interface. Highly recommended for art lovers! Highly recommend their work!",
    },
    liveLink: "https://www.uniquedokraworkshop.com",
    },
  {
    id: 2,
    name: "Krishti Personal Portfolio",
    img: img2,
    description:
      "Krishti’s Personal Portfolio showcases a curated collection of innovative projects, creative designs, and professional achievements. It highlights skills in web and software development, offering visitors a clear insight into expertise, problem-solving capabilities, and technical creativity. The portfolio is designed to provide an engaging and intuitive experience, reflecting both professional growth and personal style.",
    tech: ["React", "Node JS","Tailwind CSS", "MongoDB"],
    review: {
      img: client2,
      name: "Animesh Dey",
      role: "Founder of Krishti",
      text: "I’m absolutely thrilled with my personal portfolio! The design is sleek and modern, making it easy for visitors to navigate and explore my work. Every project and skill is showcased clearly, reflecting my creativity, expertise, and professional growth. The portfolio not only highlights my accomplishments but also gives a true sense of my vision and style. I feel confident sharing it with potential clients, employers, and collaborators.",
    },
    liveLink: "https://www.animeshdey.in",
  },
  {
    id: 3,
    name: "Teacher Course Allotments System",
    img: img3,
    description:
      "The Teacher Course Allotments System is a streamlined platform designed to simplify the process of assigning courses to teachers. It allows administrators to manage course allocations efficiently, track teacher schedules, and ensure balanced workload distribution. The system features an intuitive UI and smooth navigation, making it easy to add, update, or reassign courses, while maintaining transparency and accuracy across the institution.",
    tech: ["React", "Python", "Fast API","Tailwind CSS", "MongoDB"],
    review: {
      img: client3,
      name: "Animesh Dey",
      role: "Creater of TCA System",
      text: "We are thrilled with the Teacher Course Allotments System! The platform is intuitive, easy to navigate, and has significantly simplified the process of assigning courses to teachers. It efficiently manages schedules and workloads, reducing errors and saving valuable time. The UI is clean and user-friendly, perfectly aligning with our vision for a smooth administrative experience.",
    },
    liveLink: "https://tcasystem.vercel.app/",
  },
];
