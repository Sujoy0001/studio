// src/review.js
import client1Img from '../assets/clientimg/animaji.jpg';
import client2Img from '../assets/clientimg/Animesh.jpg';
import client3Img from '../assets/images/3.jpg';
import siteImg1 from '../assets/images/web1.jpg';
import siteImg2 from '../assets/images/web2.jpg';
import siteImg3 from '../assets/images/web3.jpg';

export const reviews = [
  {
    id: 1,
    clientImg: client1Img,
    name: "Animesh Maji",
    company: "Founder, GI BENGAL DOKRA",
    date: "2025-08-01",
    review: "The Dokra website is an absolute masterpiece! The design beautifully showcases the intricate metal art, and the product pages are clean, visually appealing, and easy to navigate. The site truly captures the essence of traditional craftsmanship while maintaining a modern, user-friendly interface. Highly recommended for art lovers!",
    bgImg: siteImg1,
  },
  {
    id: 2,
    clientImg: client2Img,
    name: "Animesh Dey",
    company: "Founder, KRISHTI",
    date: "2025-07-15",
    review: "This website is fantastic! It effectively highlights traditional agriculture and folk creations, making it easy for users to explore the rich cultural heritage. The layout is intuitive, responsive, and the visuals are vibrant. It’s a perfect blend of education, culture, and e-commerce functionality.",
    bgImg: siteImg2,
  },
  {
    id: 3,
    clientImg: client3Img,
    name: "Rakesh Kumar",
    company: "Art & craft",
    date: "2025-06-30",
    review: "The Terracotta site is elegant and engaging. It presents clay-based crafts in a way that’s both informative and visually captivating. The smooth navigation, high-quality images, and detailed descriptions make browsing a pleasure. It’s an excellent platform for artisans and craft enthusiasts alike!",
    bgImg: siteImg3,
  },
];
