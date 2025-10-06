// src/components/Workflow.jsx
import React, { useState, useEffect } from 'react';

// --- SVG Icon Components ---
const CodeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10 10-2 2 2 2" /><path d="m14 14 2-2-2-2" />
        <path d="M6 20h4"/><path d="M14 4h4"/>
        <path d="M6 4h.01L6 4.01"/><path d="M10 4h.01L10 4.01"/>
        <path d="M14 4h.01L14 4.01"/><path d="M18 4h.01L18 4.01"/>
        <path d="M6 20h.01L6 20.01"/><path d="M10 20h.01L10 20.01"/>
        <path d="M14 20h.01L14 20.01"/><path d="M18 20h.01L18 20.01"/>
    </svg>
);

const PenToolIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" /><path d="m11 11 1 1" />
    </svg>
);

const DatabaseZapIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5V8c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12v3c0 1.66 4 3 9 3s9-1.34 9-3v-3"/>
        <path d="M13 19.5V22l2.5-2.5"/><path d="M10.5 17 8 19.5"/>
    </svg>
);

const MonitorIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
);

// --- Workflow Data ---
const workflowNodes = [
    { icon: <CodeIcon className="w-12 h-12" />, title: "Requirements" },
    { icon: <PenToolIcon className="w-12 h-12" />, title: "Design" },
    { icon: <DatabaseZapIcon className="w-12 h-12" />, title: "Backend Logic" },
    { icon: <MonitorIcon className="w-12 h-12" />, title: "Website" },
];



const ProcessNode = ({ icon, title, isActive, isGlowing }) => (
    <div className={`flex flex-col items-center gap-4 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
        <div className="relative group">
            <div 
                className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur transition-opacity duration-500 ${isGlowing ? 'opacity-75 animate-pulse' : 'opacity-40'}`}
            ></div>
            <div className="relative w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 border border-gray-200 text-gray-500 group-hover:text-purple-600 transition">
                {icon}
            </div>
        </div>
        <h3 className="text-xl sujoy font-semibold text-gray-600">{title}</h3>
    </div>
);

const AnimatedConnector = ({ isActive }) => (
    <div className={`flex-1 h-1 bg-gray-200 mx-2 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
        <div 
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-700 ease-out" 
            style={{ width: isActive ? '100%' : '0%' }}
        ></div>
    </div>
);

// --- Main Workflow Section ---
export default function Workflow() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep(prev => (prev >= workflowNodes.length * 2 - 2 ? 0 : prev + 1));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-full w-full flex flex-col items-center justify-center p-4 overflow-hidden font-sans text-black mt-8 lg:mt-0">

            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center">
                <h1 className="text-6xl sujoy text-center font-bold text-gray-900 mb-2 animate-fade-in">
                    Our Agency Workflow
                </h1>
                <p className="text-lg sujoy2 text-gray-600 mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    From Idea to Launch
                </p>

                <div className="w-full flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-center">
                    {workflowNodes.map((node, index) => {
                        const nodeStepIndex = index * 2;
                        const connectorStepIndex = nodeStepIndex - 1;

                        return (
                            <React.Fragment key={node.title}>
                                {index > 0 && (
                                    <AnimatedConnector isActive={activeStep > connectorStepIndex} />
                                )}
                                <ProcessNode
                                    icon={node.icon}
                                    title={node.title}
                                    isActive={activeStep >= nodeStepIndex}
                                    isGlowing={activeStep === nodeStepIndex || activeStep === nodeStepIndex + 1}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
            `}</style>
        </section>
    );
}
