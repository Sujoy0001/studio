// src/data/frontendDesigns.js
import img1 from "../assets/images/chatroom.png"

import client1 from "../assets/clientimg/tarapada.jpg"

export const frontendDesigns = [
  {
    id: 1,
    name: "Cheatroom",
    img: img1,
    description:
      "We designed and developed the UI and frontend for a secure, account-free chat platform. Users can create temporary rooms, invite friends, and communicate with end-to-end encryption for messages and shared files. The interface is clean, intuitive, and user-friendly, with seamless integration of Gemini features for helpful summaries, quick translations, and smart replies — ensuring a smooth and private chat experience for every user.",
    tech: ["React", "TailwindCSS", "Vite"],
    review: {
      img: client1,
      name: "Tarapada Garai",
      role: "Creater of Cheatroom",
      text: "We are very pleased with the team's work on the front end and user interface.  The platform is clean, simple, and easy to use, which makes it simple to set up temporary chat rooms and talk safely.  The summaries, translations, and smart replies that come with Gemini work perfectly when they are combined.  The final product is a perfect representation of our idea for a private chat experience that works well.",
    },
    liveLink: "https://roomforcheat.vercel.app",
  },
];
