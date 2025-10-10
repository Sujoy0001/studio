import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why choose Revox Studio instead of hiring a full-time developer or designer?",
      answer: "Revox Studio gives you flexible, project-based solutions without the high costs of a full-time hire. You get access to a skilled team specializing in design and development, tailored to your needs, at a fraction of the cost."
    },
    {
      question: "How do I request a project with Revox Studio?",
      answer: "Just reach out through our website or email. We'll schedule a quick consultation to understand your goals, then share a proposal, pricing, and timeline for your project."
    },
    {
      question: "How fast can you deliver my website or design?",
      answer: "Most websites and design projects are delivered within 1-2 weeks, depending on complexity. We keep you updated every step of the way with regular progress reports."
    },
    {
      question: "What if I’m not happy with the work?",
      answer: "We offer multiple revision rounds to make sure the final result matches your vision. Our process includes regular feedback checkpoints, so you’ll never feel out of the loop."
    },
    {
      question: "What’s the Revox Studio workflow like?",
      answer: "Our process includes discovery & strategy, wireframing, UI/UX design, development, and final delivery. We work closely with you at every stage to ensure your project is both functional and visually stunning."
    },
    {
      question: "Do you offer refunds?",
      answer: "We stand by our work and aim for complete satisfaction. If the initial concepts don’t meet your expectations, we’ll revise them. Refund policies depend on the scope and stage of the project."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split into 2 columns
  const leftColumn = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightColumn = faqs.slice(Math.ceil(faqs.length / 2));

  return (
    <section className="w-full mt-6 py-8 px-4 sujoy3">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl sujoy font-bold text-zinc-900 mb-6">
            Your Questions, Answered
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Helping you understand our process and offerings at Revox Studio.
          </p>
        </div>

        {/* FAQ Items in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColumn.map((faq, i) => {
              const index = i; // keep correct index for left side
              return (
                <div 
                  key={index}
                  className="border border-zinc-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full cursor-pointer flex items-center justify-between p-6 text-left bg-white hover:bg-zinc-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-zinc-900 pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 transition-transform duration-300">
                      {openIndex === index ? (
                        <BsChevronUp className="text-zinc-600 text-xl rotate-180" />
                      ) : (
                        <BsChevronDown className="text-zinc-600 text-xl" />
                      )}
                    </div>
                  </button>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-zinc-100 pt-4">
                        <p className="text-zinc-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColumn.map((faq, i) => {
              const index = i + leftColumn.length; // shift index so both sides are unique
              return (
                <div 
                  key={index}
                  className="border border-zinc-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full cursor-pointer flex items-center justify-between p-6 text-left bg-white hover:bg-zinc-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-zinc-900 pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 transition-transform duration-300">
                      {openIndex === index ? (
                        <BsChevronUp className="text-zinc-600 text-xl rotate-180" />
                      ) : (
                        <BsChevronDown className="text-zinc-600 text-xl" />
                      )}
                    </div>
                  </button>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-zinc-100 pt-4">
                        <p className="text-zinc-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
