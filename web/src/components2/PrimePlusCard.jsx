import { Link } from 'react-router-dom';
import React from 'react';
import { BsCheck2, BsArrowRight, BsLayoutWtf, BsLayers } from 'react-icons/bs';

// --- Data for the pricing plans ---
const pricingPlans = [
  {
    isPremium: false,
    icon: <BsLayoutWtf />,
    title: 'Standard Plan',
    price: '10,000',
    priceSuffix: '',
    description: 'Ideal for lean teams or startups needing clean, fast design delivery for websites or branding assets.',
    features: [
      'You provide the wireframe',
      'Visual design using Figma & Framer',
      'Focused on website or branding only',
      'Weekday turnaround (Mon-Fri)',
    ],
    deliveryTime: '1-2 weeks',
  },
  {
    isPremium: true,
    icon: <BsLayers />,
    title: 'Premium Plan',
    pricePrefix: 'Starting at',
    price: '15,000',
    description: 'A complete design experience — tailored strategy, polished visuals, and flexible collaboration throughout the process.',
    features: [
      'Help shaping your wireframe or brief',
      'Custom design for website, brand, or logo',
      'High-fidelity mockups using Figma & Framer',
      'Dedicated weekday focus & deeper involvement',
    ],
    deliveryTime: '2-3 weeks',
  },
];

export default function PricingSection() {
  return (
    <section className="w-full px-4 sm:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        <div className="flex text-center flex-col">
          <p className='text-orange-500 italic font-semibold'>(Pricing Plan)</p>
          <h1 className='sujoy text-6xl mt-2'>Explore Pricing</h1>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* --- Map through the plans to create a card for each --- */}
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`
              w-full rounded-md md:rounded-3xl p-8 transition-all sujoy3 font-medium duration-300
              ${plan.isPremium 
                ? 'bg-gradient-to-br from-zinc-900 to-orange-900 font-medium  text-white shadow-2xl' 
                : 'bg-white text-zinc-800 shadow-lg'
              }
            `}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* --- Left Side: Plan Details --- */}
              <div className="flex flex-col justify-between h-full gap-6">
                <div>
                  <div className={`
                    w-12 h-12 flex items-center justify-center rounded-lg mb-4
                    ${plan.isPremium ? 'bg-white/10 text-white' : 'bg-zinc-800 text-white'}
                  `}>
                    {React.cloneElement(plan.icon, { size: 24 })}
                  </div>
                  <h3 className="text-2xl font-semibold">{plan.title}</h3>
                  <p className={`mt-2 font-semibold  ${plan.isPremium ? 'text-zinc-200' : 'text-zinc-600'}`}>
                    {plan.description}
                  </p>
                </div>
                {plan.deliveryTime && (
                  <div className="pt-4 border-t ${plan.isPremium ? 'border-white/10' : 'border-zinc-200'}">
                    <p className="text-sm text-zinc-500">Delivery Time</p>
                    <p className={`font-medium ${plan.isPremium ? 'text-zinc-300' : 'text-zinc-800'}`}>
                      {plan.deliveryTime}
                    </p>
                  </div>
                )}
              </div>

              {/* --- Right Side: Price & Features --- */}
              <div className="flex flex-col gap-6">
                <div className="text-left md:text-right">
                  {plan.pricePrefix && (
                    <p className="text-zinc-400">{plan.pricePrefix}</p>
                  )}
                  <p className="text-5xl font-bold">
                    <span className={`${plan.isPremium ? 'text-orange-400' : 'text-zinc-900'}`}>
                      ₹{plan.price}
                    </span>
                    {plan.priceSuffix && (
                      <span className="text-base font-normal text-zinc-500 ml-1">
                        {plan.priceSuffix}
                      </span>
                    )}
                  </p>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <BsCheck2 className="text-green-500 flex-shrink-0" size={20} />
                      <span className={`${plan.isPremium ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className='flex items-center justify-end'>
                <button className={`
                  w-full md:w-auto md:self-end cursor-pointer flex items-center justify-center gap-2 mt-4 px-6 py-3 rounded-lg font-semibold transition-transform
                  ${plan.isPremium 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }
                  active:scale-95
                `}>
                  Get Started <BsArrowRight />
                </button></Link>
              </div>

            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}