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
        text: "That Dokhra website is truly amazing!   The material art is beautifully displayed on the product pages, which are clear, attractive, and easy to use.   Traditional craftsmanship is perfectly captured in the website's modern, easy-to-use interface.   Fans of art should definitely see this!   Their work comes highly recommended!",
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
      text: "I am so happy with my personal portfolio!  The sleek and modern design makes it easy for people to find their way around and look at my work.  Each project and skill is shown off clearly, showing how creative, skilled, and professional I have become.  The portfolio shows off my achievements and really shows what I want to do and how I like to do it.  I'm comfortable showing it to possible clients, employers, and coworkers.'",
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
      name: "Sujoy Garai",
      role: "Creater of TCA System",
      text: "We are amazed at how well the Teacher Course Allotments System works!  It is easy to use and navigate the platform, and it has made it a lot easier to give courses to teachers.  It manages schedules and tasks well, cutting down on mistakes and saving time.  The UI is clean and easy to use, which is exactly what we wanted for a smooth administrative experience.",
    },
    liveLink: "https://tcasystem.vercel.app/",
  },
];
