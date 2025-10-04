import React from 'react'
import Hero from '../components2/Hero'
import TextSlider from '../components2/TextSlider'
import HeroSection from '../components2/HeroSection'
import Logoloop from '../components2/Logoloop'
import MovingTextSection from '../components2/MovingTextSection'
import OurData from '../components2/OurData'
import WhatWeDo from '../components2/WhatWeDo'
import PrimePlusCard from '../components2/PrimePlusCard'
import FAQSection from '../components2/FAQSection'
import ContactSection from '../components2/ContactSection'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, []);

  return (
    <div>
      <Hero />
      <TextSlider />
      <HeroSection />
      <MovingTextSection />
      <OurData />
      <Logoloop />
      <WhatWeDo />
      <PrimePlusCard />
      <FAQSection />
      <ContactSection />
    </div>
  )
}


