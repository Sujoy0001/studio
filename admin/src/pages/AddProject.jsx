import React, { useState } from 'react';
import {
    FaPlus, FaTimes, FaUpload, FaLink, FaUser, FaBuilding, FaStar,
    FaChevronDown, FaReact, FaPalette
} from 'react-icons/fa';
import { SiVite, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb } from 'react-icons/si';

// --- Reusable UI Components ---

const Section = ({ title, icon, children, isOpen, onToggle }) => (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300">
        <button
            type="button"
            onClick={onToggle}
            className="w-full flex items-center justify-between p-5 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-700/80 transition-colors"
        >
            <div className="flex items-center gap-4">
                <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2 rounded-lg text-white">
                    {icon}
                </div>
                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">{title}</h2>
            </div>
            <FaChevronDown className={`text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
            <div className="p-6 space-y-6 bg-white dark:bg-zinc-800">
                {children}
            </div>
        )}
    </div>
);

const ImageInput = ({ label, name, value, onChange, error }) => {
    const previewUrl = value ? URL.createObjectURL(value) : null;
    const handleRemove = (e) => {
        e.stopPropagation();
        onChange({ target: { name, files: [null] } });
    };

    return (
        <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{label}</label>
            <div className={`relative w-28 h-28 rounded-xl border-2 ${error ? 'border-red-500' : 'border-dashed border-zinc-300 dark:border-zinc-700'} flex items-center justify-center bg-zinc-100 dark:bg-zinc-900/50`}>
                <input
                    id={name}
                    name={name}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={onChange}
                />
                {previewUrl ? (
                    <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1.5 shadow-lg hover:bg-red-700 transition-transform hover:scale-110"
                        >
                            <FaTimes size={10} />
                        </button>
                    </>
                ) : (
                    <div className="text-center text-zinc-500 dark:text-zinc-400">
                        <FaUpload size={24} />
                        <span className="text-xs mt-1 block">Upload</span>
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

const TechTag = ({ children, onRemove }) => (
    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold pl-3 pr-2 py-1.5 rounded-full shadow-sm">
        {children}
        <button type="button" onClick={onRemove} className="hover:text-red-200 transition-colors">
            <FaTimes size={12} />
        </button>
    </span>
);

const InputField = ({ id, label, error, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{label}</label>
        <input
            id={id}
            {...props}
            className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} bg-zinc-100 dark:bg-zinc-900/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);


// --- Main Component ---

const PRESET_TECHS = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Vite', icon: <SiVite /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'Node.js', icon: <SiNodedotjs /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
];

export default function AddProjectV2() {
    const [openSection, setOpenSection] = useState('details');
    const [projectData, setProjectData] = useState({
        name: "",
        img: null,
        description: "",
        tech: [],
        review: { img: null, name: "", role: "", text: "" },
        liveLink: "",
        category: "",
    });
    const [currentTech, setCurrentTech] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!projectData.name) newErrors.name = "Project name is required.";
        if (!projectData.img) newErrors.img = "Project image is required.";
        if (projectData.tech.length === 0) newErrors.tech = "Add at least one technology.";
        if (!projectData.liveLink) newErrors.liveLink = "Live link is required.";
        else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(projectData.liveLink)) {
            newErrors.liveLink = "Please enter a valid URL.";
        }
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length > 0) {
            if (newErrors.name || newErrors.img || newErrors.liveLink) setOpenSection('details');
            else if (newErrors.tech) setOpenSection('tech');
        }
        
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("review.")) {
            const field = name.split(".")[1];
            setProjectData(p => ({ ...p, review: { ...p.review, [field]: value } }));
        } else {
            setProjectData(p => ({ ...p, [name]: value }));
        }
    };
    
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (!file) {
            const targetName = name.split('.')[0];
            if (targetName === 'review') {
                setProjectData(p => ({ ...p, review: { ...p.review, img: null }}));
            } else {
                 setProjectData(p => ({ ...p, [name]: null }));
            }
            return;
        }

        if (!file.type.startsWith('image/')) return;
        if (name === 'img') setProjectData(p => ({ ...p, img: file }));
        else if (name === 'review.img') setProjectData(p => ({ ...p, review: { ...p.review, img: file } }));
    };

    const handleTechAction = (tech) => {
        const techTrimmed = tech.trim();
        if (!techTrimmed || projectData.tech.includes(techTrimmed)) return;
        setProjectData(p => ({ ...p, tech: [...p.tech, techTrimmed] }));
        setCurrentTech("");
    };

    const handleRemoveTech = (techToRemove) => {
        setProjectData(p => ({ ...p, tech: p.tech.filter(t => t !== techToRemove) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        console.log("Submitting Project Data:", projectData);
        alert("Project added successfully! 🎉");
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-6xl font-bold sujoy">
                        Add New Project
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-3 sujoy3 text-lg">
                        Fill out the details to showcase your latest work.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* --- Project Details Section --- */}
                    <Section 
                        title="Project Details" 
                        icon={<FaPalette />}
                        isOpen={openSection === 'details'} 
                        onToggle={() => setOpenSection(openSection === 'details' ? null : 'details')}
                    >
                        <InputField id="name" name="name" label="Project Name" placeholder="e.g., Revox Portfolio" value={projectData.name} onChange={handleChange} error={errors.name} />
                        <ImageInput label="Project Thumbnail" name="img" value={projectData.img} onChange={handleFileChange} error={errors.img} />
                        <InputField id="liveLink" name="liveLink" label="Live Project Link" placeholder="https://..." value={projectData.liveLink} onChange={handleChange} error={errors.liveLink} />
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Description</label>
                            <textarea id="description" name="description" rows="4" placeholder="A short description of the project..." value={projectData.description} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/50 resize-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                    </Section>

                    {/* --- Technologies Section --- */}
                    <Section 
                        title="Technologies" 
                        icon={<FaReact />}
                        isOpen={openSection === 'tech'} 
                        onToggle={() => setOpenSection(openSection === 'tech' ? null : 'tech')}
                    >
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Choose from presets</label>
                            <div className="flex flex-wrap gap-2">
                                {PRESET_TECHS.map(tech => {
                                    const isSelected = projectData.tech.includes(tech.name);
                                    return (
                                        <button key={tech.name} type="button" disabled={isSelected} onClick={() => handleTechAction(tech.name)}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-zinc-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 disabled:border-blue-500 disabled:bg-blue-500/10"
                                        >
                                            {tech.icon} {tech.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                         <div>
                            <label htmlFor="tech-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Or add custom</label>
                            <div className="flex gap-2">
                                <input type="text" id="tech-input" value={currentTech} onChange={(e) => setCurrentTech(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTechAction(currentTech))} placeholder="e.g., GSAP" className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/50" />
                                <button type="button" onClick={() => handleTechAction(currentTech)} className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold">Add</button>
                            </div>
                         </div>
                         {errors.tech && <p className="text-red-500 text-sm">{errors.tech}</p>}

                        <div className="flex flex-wrap gap-2 pt-2">
                            {projectData.tech.map((tech) => (
                                <TechTag key={tech} onRemove={() => handleRemoveTech(tech)}>{tech}</TechTag>
                            ))}
                        </div>
                    </Section>

                    {/* --- Client Review Section --- */}
                     <Section 
                        title="Client Review (Optional)" 
                        icon={<FaStar />}
                        isOpen={openSection === 'review'} 
                        onToggle={() => setOpenSection(openSection === 'review' ? null : 'review')}
                    >
                        <ImageInput label="Client's Photo" name="review.img" value={projectData.review.img} onChange={handleFileChange} />
                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField id="review.name" name="review.name" label="Client Name" placeholder="John Doe" value={projectData.review.name} onChange={handleChange} />
                            <InputField id="review.role" name="review.role" label="Role & Company" placeholder="CEO at Innovate Inc." value={projectData.review.role} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="review.text" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Testimonial</label>
                            <textarea id="review.text" name="review.text" rows="4" placeholder="What did the client say?" value={projectData.review.text} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900/50 resize-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                    </Section>

                    {/* --- Submit Button --- */}
                    <div className="pt-6">
                        <button type="submit" disabled={isSubmitting} className="w-full py-4 px-6 bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 text-white font-bold rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3">
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Adding Project...</span>
                                </>
                            ) : (
                                <>
                                    <FaPlus />
                                    <span>Add Project to Portfolio</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}