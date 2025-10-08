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
      text: "We are extremely happy with the frontend and UI development done by the team. The platform is clean, intuitive, and user-friendly, making it easy to create temporary chat rooms and communicate securely. The integration of Gemini features for summaries, translations, and smart replies works flawlessly. The final product perfectly captures our vision for a private, seamless chat experience.",
    },
    liveLink: "https://roomforcheat.vercel.app",
  },
];
